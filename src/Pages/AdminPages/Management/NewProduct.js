import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAddNewProductMutation } from "../../../Redux/API/productAPI";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { app } from "../../../Firebase";

import CameraEnhanceRoundedIcon from "@mui/icons-material/CameraEnhanceRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Button } from "@mui/material";

function NewProduct() {
  const navigate = useNavigate();
  const [addNewProduct] = useAddNewProductMutation();
  const { userData } = useSelector((state) => state.userReducer);
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);

  const [categories, setCategories] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [brandName, setBrandName] = useState("");
  const [sku, setSku] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [bulletPoints, setBulletPoints] = useState("");
  const [price, setPrice] = useState();
  const [mrp, setMrp] = useState();
  const [size, setSize] = useState("");
  const [stock, setStock] = useState();
  const [manufacturer, setManufacturer] = useState("");
  const [madeIn, setMadeIn] = useState("");
  const [modelNo, setModelNo] = useState("");
  const [warranty, setWarranty] = useState("");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");

  const [mainImageSelected, setMainImageSelected] = useState(false);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // done image handler
  const changeImageHandler = (index, e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);

      const updatedPreviewImages = [...previewImages];
      updatedPreviewImages[index] = reader.result;
      setPreviewImages(updatedPreviewImages);

      if (index === 0 && file) {
        setMainImageSelected(true);
      }
    };
  };

  // done other input of category
  const [showOtherInput, setShowOtherInput] = useState(false);
  const handleCategoryChange = (value) => {
    setCategories(value);
    if (value === "other") {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  };

  // done image change
  const handleImageChange = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);

    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages[index] = null;
    setPreviewImages(updatedPreviewImages);
  };

  // done final submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categories || (categories === "other" && !otherCategory)) {
      toast.error("Category selection is required.");
      return;
    }

    if (!mainImageSelected) {
      toast.error("Please upload main image");
      return;
    }

    if (
      !productName ||
      !price ||
      !stock ||
      !categories ||
      !brandName ||
      !sku ||
      !description ||
      !bulletPoints ||
      !mrp ||
      !size ||
      !manufacturer ||
      !madeIn ||
      !modelNo
    ) {
      return toast.error("Please fill all required fields");
    }

    try {
      const otherImages = [];
      const storage = getStorage(app);
      const storageRef = ref(storage);

      setFormSubmitLoading(true);

      // Upload main image
      const mainImageFileName = `${uuidv4()}.${images[0].name.split(".").pop()}`;
      const mainImageRef = ref(storageRef, mainImageFileName);
      await uploadBytes(mainImageRef, images[0]);
      const mainImageUrl = await getDownloadURL(mainImageRef);

      // Upload other images
      await Promise.all(
        images.slice(1).map(async (image) => {
          if (image) {
            const fileName = `${uuidv4()}.${image.name.split(".").pop()}`;
            const imageRef = ref(storageRef, fileName);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);
            otherImages.push(imageUrl);
          }
        })
      );

      const productData = {
        brandName,
        sku,
        productName,
        description,
        bulletPoints,
        price,
        mrp,
        size,
        stock,
        manufacturer,
        madeIn,
        modelNo,
        warranty,
        material,
        color,
        mainImage: mainImageUrl,
        otherImages,
      };

      if (categories === "other") {
        productData["categories"] = otherCategory;
      } else {
        productData["categories"] = categories;
      }

      // Send imageUrls array along with other product data to backend
      const res = await addNewProduct({ id: userData?._id, productData });

      if ("data" in res) {
        toast.success(res.data.message);
        setFormSubmitLoading(false);
        navigate("/admin/products");
      } else {
        const error = res.error;
        const errorMessage = error.data.message;
        toast.error(errorMessage);
        setFormSubmitLoading(false);
      }
    } catch (error) {
      console.error("Error uploading images to Firebase Storage:", error);
      toast.error("Some error occurs, Please try again later.");
      setFormSubmitLoading(false);
    }
  };

  return (
    <div className="article">
      <h1 className="mainlogo">MD MART</h1>
      <h4>Add New Product</h4>
      <form onSubmit={handleSubmit} className="productForm">
        <div className="textInput">
          <div className="box categoryBox">
            <label htmlFor="category" title="Select the category for this product (e.g., 'Electronics', 'Clothing', 'Home & Kitchen').">
              Category*:
            </label>
            <select className="category" name="category" onChange={(e) => handleCategoryChange(e.target.value)} required>
              <option value="select-category">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Apparel and Fashion">Apparel and Fashion</option>
              <option value="Home and Kitchen Appliances">Home and Kitchen Appliances</option>
              <option value="Books and Stationery">Books and Stationery</option>
              <option value="Health and Personal Care">Health and Personal Care</option>
              <option value="Toys and Games">Toys and Games</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Cloths and Wearable">Clothing & Apparel</option>
              <option value="Furniture">Furniture</option>
              <option value="Automotive">Automotive</option>
              <option value="Sports and Fitness Equipment">Sports and Fitness Equipment</option>
              <option value="Groceries and Gourmet Foods">Groceries and Gourmet Foods</option>
              <option value="Baby Care">Baby Care</option>
              <option value="Watches">Watches</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Tools and Home Improvement">Tools and Home Improvement</option>
              <option value="Pet Supplies">Pet Supplies</option>
              <option value="Office Products">Office Products</option>
              <option value="Musical Instruments">Musical Instruments</option>
              <option value="Bags, Wallets, and Luggage">Bags, Wallets, and Luggage</option>
              <option value="Cameras and Photography Equipment">Cameras and Photography Equipment</option>
              <option value="Video Games">Video Games</option>
              <option value="Movies and TV Shows">Movies and TV Shows</option>
              <option value="Software">Software</option>
              <option value="Garden and Outdoors">Garden and Outdoors</option>
              <option value="Industrial and Scientific Supplies">Industrial and Scientific Supplies</option>
              <option value="Arts, Crafts, and Sewing">Arts, Crafts, and Sewing</option>
              <option value="Mobile Accessories">Mobile Accessories</option>
              <option value="Kitchen and Dining">Kitchen and Dining</option>
              <option value="Exercise and Fitness Equipment">Exercise and Fitness Equipment</option>
              <option value="Bedding and Linens">Bedding and Linens</option>
              <option value="Party Supplies">Party Supplies</option>
              <option value="Shoes">Shoes</option>
              <option value="Handbags and Clutches">Handbags and Clutches</option>
              <option value="Air Conditioners and Coolers">Air Conditioners and Coolers</option>
              <option value="Televisions">Televisions</option>
              <option value="Power Banks and Chargers">Power Banks and Chargers</option>
              <option value="Sunglasses">Sunglasses</option>
              <option value="Home Storage and Organization">Home Storage and Organization</option>
              <option value="Water Purifiers and Filters">Water Purifiers and Filters</option>
              <option value="Fans">Fans</option>
              <option value="Smart Home Devices">Smart Home Devices</option>
              <option value="Headphones and Headsets">Headphones and Headsets</option>
              <option value="Monitors">Monitors</option>
              <option value="Printers and Ink">Printers and Ink</option>
              <option value="Projectors">Projectors</option>
              <option value="Air Purifiers">Air Purifiers</option>
              <option value="Watches">Watches</option>
              <option value="Data Storage">Data Storage</option>
              <option value="School Supplies">School Supplies</option>
              <option value="Kitchen Appliances">Kitchen Appliances</option>
              <option value="other">Other</option>
            </select>
          </div>

          {showOtherInput && (
            <div className="box otherCategoryBox">
              <label htmlFor="otherCategory" title="Enter the category if selected 'Other'">
                Other Category*:
              </label>
              <input type="text" id="otherCategory" name="otherCategory" onChange={(e) => setOtherCategory(e.target.value)} required />
            </div>
          )}

          <div className="box brandNameBox">
            <label htmlFor="brandName" title="Enter the brand name of the product.">
              Brand Name*:
            </label>
            <input type="text" id="brandName" name="brandName" onChange={(e) => setBrandName(e.target.value)} required />
          </div>

          <div className="box skuBox">
            <label htmlFor="sku" title="Enter a unique Stock Keeping Unit (SKU) for the product.">
              SKU*:
            </label>
            <input type="text" id="sku" name="sku" onChange={(e) => setSku(e.target.value)} required />
          </div>

          <div className="box productName">
            <label htmlFor="productName" title="Enter the name of the product.">
              Product Name*:
            </label>
            <input type="text" id="productName" name="productName" maxlength="90" onChange={(e) => setProductName(e.target.value)} required />
          </div>

          <div className="box descriptionBox">
            <label htmlFor="description" title="Provide a brief description of the product.">
              Description*:
            </label>
            <textarea id="description" name="description" onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div className="box bpBox">
            <label htmlFor="bulletPoints" title="Enter key features or bullet points about the product.">
              Bullet Points*:
            </label>
            <textarea id="bulletPoints" name="bulletPoints" onChange={(e) => setBulletPoints(e.target.value)} required />
          </div>

          <div className="box modelBox">
            <label htmlFor="modelNo" title="Enter the model number of the product.">
              Model No*:
            </label>
            <input type="text" id="modelNo" name="modelNo" onChange={(e) => setModelNo(e.target.value)} required />
          </div>

          <div className="box priceBox">
            <label htmlFor="price" title="Enter the selling price of the product.">
              Price*:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              onInput={(e) => {
                e.target.value = Math.abs(e.target.value);
              }}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="box mrpBox">
            <label htmlFor="mrp" title="Enter the Manufacturer's Recommended Price of the product.">
              MRP*:
            </label>
            <input
              type="number"
              id="mrp"
              name="mrp"
              step="0.01"
              min="0"
              onInput={(e) => {
                e.target.value = Math.abs(e.target.value);
              }}
              onChange={(e) => setMrp(e.target.value)}
              required
            />
          </div>

          <div className="box sizeBox">
            <label htmlFor="sizes" title="Enter available sizes for the product (e.g., 'Small', 'Medium', 'Large', 'Standard').">
              Sizes*:
            </label>
            <select className="sizes" name="sizes" onChange={(e) => setSize(e.target.value)} required>
              <option value="">Select a size</option>
              <option value="large">Large</option>
              <option value="medium">Medium</option>
              <option value="small">Small</option>
              <option value="standard">Standard</option>
            </select>
          </div>

          <div className="box stockBox">
            <label htmlFor="stock" title="Enter the available stock quantity for the product.">
              Stock*:
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              onInput={(e) => {
                e.target.value = Math.abs(e.target.value);
              }}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div className="box colorBox">
            <label htmlFor="color" title="Enter the color options available for the product (if applicable).">
              Color:
            </label>
            <input type="text" id="color" name="color" onChange={(e) => setColor(e.target.value)} />
          </div>

          <div className="box materialBox">
            <label htmlFor="material" title="Enter the material(s) used in the product (if applicable).">
              Material:
            </label>
            <input type="text" id="material" name="material" onChange={(e) => setMaterial(e.target.value)} />
          </div>

          <div className="box manufacBox">
            <label htmlFor="manufacturer" title="Enter the name of the manufacturer of the product.">
              Manufacturer*:
            </label>
            <input type="text" id="manufacturer" name="manufacturer" onChange={(e) => setManufacturer(e.target.value)} required />
          </div>

          <div className="box warrBox">
            <label htmlFor="warranty" title="Enter warranty details (e.g., '1 Month', '1 Year', '90 Days').">
              Warranty:
            </label>
            <input type="text" id="warranty" name="warranty" onChange={(e) => setWarranty(e.target.value)} />
          </div>

          <div className="box madeinBox">
            <label htmlFor="madeIn" title="Enter the country of manufacture for the product.">
              Made in*:
            </label>
            <input type="text" id="madeIn" name="madeIn" onChange={(e) => setMadeIn(e.target.value)} required />
          </div>
        </div>

        <div className="imgInput">
          {[...Array(6)].map((_, index) => (
            <div className={`img img${index + 1}`} key={index} title="image ratio should be 1:1">
              {previewImages[index] ? (
                <EditRoundedIcon
                  onClick={(e) => handleImageChange(index, e)}
                  style={{
                    position: "absolute",
                    bottom: "5px",
                    right: "7px",
                    zIndex: "1",
                    color: "#212529",
                    fontSize: "3.5rem",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <label htmlFor={`image${index + 1}`} title={`Upload ${index === 0 ? "Main Image" : `Image ${index + 1}`}`}>
                  <CameraEnhanceRoundedIcon
                    style={{
                      fontSize: "4rem",
                      color: "#343a40",
                    }}
                  />
                  {index === 0 ? "Main Image*" : `Image ${index + 1}`}
                </label>
              )}

              <input type="file" id={`image${index + 1}`} name="image[]" accept="image/*" onChange={(e) => changeImageHandler(index, e)} />

              {previewImages[index] && (
                <div id={`imagePreview${index}`} className="imagePreview">
                  <img src={previewImages[index]} alt={`productImage${index + 1}`} height={270} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="formBtns">
          <div className="formBtn1">
            <Link to={"/admin/products"}>
              <Button>Cancel</Button>
            </Link>
          </div>
          <div className="formBtn2">{formSubmitLoading ? <div class="spinner"></div> : <Button type="submit">Submit</Button>}</div>
        </div>
      </form>
    </div>
  );
}

export default NewProduct;
