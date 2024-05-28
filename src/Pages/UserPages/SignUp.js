import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import GoogleImg from "../../Assets/images/google.png";
import { auth } from "../../Firebase";
import { useSignupMutation } from "../../Redux/API/userAPI";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../../Redux/Reducer/userReducer";

// icon importing
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button } from "@mui/material";

function SignUp() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  // done
  const signUpWithGoogleHandler = async () => {
    try {
      // create google auth provider
      const provider = new GoogleAuthProvider();
      // create new user using provider
      const { user } = await signInWithPopup(auth, provider);

      // send user data to the MongoDB
      const res = await signup({
        _id: user.uid,
        name: user.displayName ? user.displayName : "user",
        avatar: user.photoURL ? user.photoURL : "https://cdn3.iconfinder.com/data/icons/avatar-165/536/NORMAL_HAIR-512.png",
        email: user.email,
        phone: user.phoneNumber ? user.phoneNumber : undefined,
      });

      // check for error
      if ("data" in res) {
        // store data to local storeage
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        dispatch(userExist(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      } else {
        dispatch(userNotExist());
        const error = res.error;
        const errorMessage = error.data.message;
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Sign Up Failed");
      console.log("sign up failed", error);
    }
  };

  // done
  const signUpHandler = async (e) => {
    e.preventDefault();
    setError("");

    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo|icloud|aol)\.com$/;
      return emailRegex.test(String(email).toLowerCase());
    };

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      const res = await signup({
        _id: user.uid,
        name: "user",
        avatar: "https://cdn3.iconfinder.com/data/icons/avatar-165/536/NORMAL_HAIR-512.png",
        email: user.email,
      });

      if ("data" in res) {
        // Store user data in local storage
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        dispatch(userExist(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      } else {
        dispatch(userNotExist());
        const error = res.error;
        const errorMessage = error.data.message;
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Sign Up Failed");
    }
  };

  return (
    <>
      <section className="signIn">
        <div className="pageNavigation">
          <HomeRoundedIcon style={{ fontSize: "2.2rem", cursor: "pointer", color: "#3bb77e" }} onClick={() => navigate("/")} />
          <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Home
          </span>
          <ChevronRightRoundedIcon style={{ fontSize: "2.6rem" }} />
          Sign Up
        </div>

        <div className="loginWrapper">
          <div className="card shadow">
            <h3>Sign Up</h3>
            <form className="loginForm" onSubmit={signUpHandler}>
              <div className="form-group brdinp">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  label="Email"
                  className="w-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group ">
                <div className="pwd brdinp">
                  <input
                    id="password"
                    type={showPassword === false ? "password" : "text"}
                    placeholder="Password"
                    name="password"
                    label="Password"
                    className="w-100"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button className="icon" onClick={() => setShowPassword(!showPassword)} type="button">
                    {showPassword === false ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </Button>
                </div>
              </div>
              {error && (
                <div className="errorBox">
                  <p>{error}</p>
                </div>
              )}

              <div className="signinbtn">
                <Button type="submit">Sign Up</Button>
              </div>

              <div className="form-group">
                <p className="text-center">OR</p>
                <Button variant="outlined" onClick={signUpWithGoogleHandler}>
                  <img src={GoogleImg} alt="googleAuth" />
                  Sign Up with Google
                </Button>
              </div>

              <p className="textCenter">
                Already have an account
                <b>
                  {" "}
                  <Link to="/login">Sign In</Link>
                </b>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignUp;
