import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import GoogleImg from "../../Assets/images/google.png";
import { auth } from "../../Firebase";
import { useSignupMutation } from "../../Redux/API/userAPI";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../../Redux/Reducer/userReducer";
import { getUser } from "../../Redux/API/userAPI";

// icon importing
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Button } from "@mui/material";

function Login() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();

  // done
  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo|icloud|aol)\.com$/;
      return emailRegex.test(String(email).toLowerCase());
    };

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    try {
      // login with normal account
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      // get user user data from backend
      const userDetails = await getUser(user.uid);
      dispatch(userExist(userDetails));

      // Store user data in local storage
      localStorage.setItem("userData", JSON.stringify(userDetails));
    } catch (error) {
      dispatch(userNotExist());
      toast.error("Login Failed");
      setError("Invalid email or password. Please try again.");
    }
  };

  // done
  const loginWithGoogleHandler = async () => {
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
      toast.error("Sign in Failed");
      console.log("Sign in Failed", error);
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
          Sign In
        </div>

        <div className="loginWrapper">
          <div className="card shadow">
            <h3>Sign In</h3>
            <form className="loginForm" onSubmit={loginHandler}>
              <div className="form-group brdinp">
                <input id="email" type="email" placeholder="Email" name="email" label="Email" className="w-100" required />
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
                    required
                  />
                  <Button className="icon" onClick={() => setShowPassword(!showPassword)}>
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
                <Button type="submit">Sign In</Button>
              </div>

              <div className="form-group">
                <p className="text-center">OR</p>
                <Button variant="outlined" onClick={loginWithGoogleHandler}>
                  <img src={GoogleImg} alt="googleAuth" />
                  Sign In with Google
                </Button>
              </div>

              <p className="textCenter">
                Not have an account
                <b>
                  {" "}
                  <Link to="/signup">Sign Up</Link>
                </b>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
