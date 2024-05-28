import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUpdateProductMutation, useGetSingleProductQuery, useDeleteProductMutation } from "../../../Redux/API/productAPI";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Loading from "../../../Components/Loading/Loading";
import { deleteObject, getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../Firebase";
import { v4 as uuidv4 } from "uuid";

import CameraEnhanceRoundedIcon from "@mui/icons-material/CameraEnhanceRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Button } from "@mui/material";

function ManageProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const [updataProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const { userData } = useSelector((state) => state.userReducer);
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);

  const [categories, setCategories] = useState("");
  const [otherCategory, setOtherCategory] = useState("");
  const [brandName, setBrandName] = useState("");
  const [sku, setSku] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [bulletPoints, setBulletPoints] = useState("");
  const [price, setPrice] = useState(0);
  const [mrp, setMrp] = useState(0);
  const [size, setSize] = useState("");
  const [stock, setStock] = useState(0);
  const [manufacturer, setManufacturer] = useState("");
  const [madeIn, setMadeIn] = useState("");
  const [modelNo, setModelNo] = useState("");
  const [warranty, setWarranty] = useState("");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");

  const { data, isLoading } = useGetSingleProductQuery(params.id);
  const productData = data?.singleProduct;
  // const { mainImage, otherImages } = productData;

  // done setting default value
  useEffect(() => {
    window.scrollTo(0, 0);

    if (productData) {
      setCategories(productData.categories);
      setBrandName(productData.brandName);
      setProductName(productData.productName);
      setSku(productData.sku);
      setDescription(productData.description);
      setBulletPoints(productData.bulletPoints);
      setPrice(productData.price);
      setMrp(productData.mrp);
      setStock(productData.stock);
      setSize(productData.size);
      setManufacturer(productData.manufacturer);
      setMadeIn(productData.madeIn);
      setWarranty(productData.warranty);
      setMaterial(productData.material);
      setModelNo(productData.modelNo);
      setColor(productData.color);

      const { mainImage, otherImages } = productData;
      const updatedPreviewImages = [];
      if (mainImage) {
        updatedPreviewImages.push(mainImage);
      }

      if (otherImages && otherImages.length > 0) {
        otherImages.forEach((imagePath) => {
          updatedPreviewImages.push(imagePath);
        });
      }

      setPreviewImages(updatedPreviewImages);
    }
  }, [productData]);

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // done for get actual image name from url
  function getImageNameFromUrl(imageUrl) {
    const urlParts = imageUrl.split("/");
    const imageNameWithQuery = urlParts[urlParts.length - 1];
    const imageName = imageNameWithQuery.split("?")[0];

    return imageName;
  }

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
    };
  };

  // done other input category
  const [showOtherInput, setShowOtherInput] = useState(false);
  const handleCategoryChange = (value) => {
    setCategories(value);
    if (value === "other") {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
    }
  };

  // done delete popup
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const handleDeleteProduct = () => {
    setShowDeletePopup(true);
  };

  // done cancel delete
  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  // done final delete
  const [deleteLoading, setDeleteLoading] = useState(false);
  const finalDelete = async () => {
    try {
      // delete image from firebase
      const storage = getStorage(app);
      setDeleteLoading(true);

      // Delete main image
      const mainImageRef = ref(storage, getImageNameFromUrl(previewImages[0]));
      await deleteObject(mainImageRef);

      // Delete other images
      await Promise.all(
        previewImages.slice(1).map(async (imageUrl) => {
          const imageRef = ref(storage, getImageNameFromUrl(imageUrl));
          await deleteObject(imageRef);
        })
      );

      const res = await deleteProduct({
        userId: userData?._id,
        productId: params.id,
      });

      if ("data" in res) {
        toast.success(res.data.message);
        setDeleteLoading(false);
        navigate("/admin/products");
      } else {
        const error = res.error;
        const errorMessage = error.data.message;
        toast.error(errorMessage);
        setDeleteLoading(false);
      }
    } catch (error) {
      setDeleteLoading(false);
      console.log(error);
      toast.error("Some error occurs while deleting Product");
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

    // Check for required fields
    if (
      !categories ||
      (categories === "other" && !otherCategory) ||
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
      const storage = getStorage(app);
      const storageRef = ref(storage);

      setFormSubmitLoading(true);

      const { mainImage, otherImages } = productData;

      // Update main image
      let mainImageUrl = mainImage;
      if (images[0]) {
        // delete old main image
        let mainImageRef = ref(storage, getImageNameFromUrl(mainImageUrl));
        await deleteObject(mainImageRef);

        // upload new image
        const mainImageFileName = `${uuidv4()}.${images[0].name.split(".").pop()}`;
        mainImageRef = ref(storageRef, mainImageFileName);
        await uploadBytes(mainImageRef, images[0]);
        mainImageUrl = await getDownloadURL(mainImageRef);
      }

      const newOtherImages = [...otherImages];

      // Update other images
      await Promise.all(
        images.slice(1).map(async (image, index) => {
          if (image) {
            // Delete old image
            let imageRef = ref(storage, getImageNameFromUrl(otherImages[index]));
            await deleteObject(imageRef);

            // Upload new image
            const fileName = `${uuidv4()}.${image.name.split(".").pop()}`;
            imageRef = ref(storageRef, fileName);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);
            newOtherImages[index] = imageUrl;
          }
        })
      );

      // Update the product data
      const updatedProductData = {
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
        otherImages: newOtherImages,
      };

      if (categories === "other") {
        updatedProductData["categories"] = otherCategory;
      } else {
        updatedProductData["categories"] = categories;
      }

      // update the product
      const res = await updataProduct({ updatedProductData, productId: params.id, userId: userData?._id });

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
      toast.error("Some error occurs, Please try again");
      setFormSubmitLoading(false);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="article">
      <h1 className="mainlogo">MD MART</h1>
      <h4>Add New Product</h4>
      <form onSubmit={handleSubmit} className="productForm">
        <div className="textInput">
          <div className="box categoryBox">
            <label htmlFor="category" title="Select the category for this product (e.g., 'Electronics', 'Clothing', 'Home & Kitchen').">
              Category*:
            </label>
            <select className="category" name="category" value={categories} onChange={(e) => handleCategoryChange(e.target.value)}>
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
              <input type="text" id="otherCategory" name="otherCategory" onChange={(e) => setOtherCategory(e.target.value)} />
            </div>
          )}

          <div className="box brandNameBox">
            <label htmlFor="brandName" title="Enter the brand name of the product.">
              Brand Name*:
            </label>
            <input type="text" id="brandName" name="brandName" value={brandName} onChange={(e) => setBrandName(e.target.value)} />
          </div>

          <div className="box skuBox">
            <label htmlFor="sku" title="Enter a unique Stock Keeping Unit (SKU) for the product.">
              SKU*:
            </label>
            <input type="text" id="sku" name="sku" value={sku} onChange={(e) => setSku(e.target.value)} />
          </div>

          <div className="box productName">
            <label htmlFor="productName" title="Enter the name of the product.">
              Product Name*:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              maxlength="90"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className="box descriptionBox">
            <label htmlFor="description" title="Provide a brief description of the product.">
              Description*:
            </label>
            <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>

          <div className="box bpBox">
            <label htmlFor="bulletPoints" title="Enter key features or bullet points about the product.">
              Bullet Points*:
            </label>
            <textarea id="bulletPoints" name="bulletPoints" value={bulletPoints} onChange={(e) => setBulletPoints(e.target.value)}></textarea>
          </div>

          <div className="box modelBox">
            <label htmlFor="modelNo" title="Enter the model number of the product.">
              Model No*:
            </label>
            <input type="text" id="modelNo" name="modelNo" value={modelNo} onChange={(e) => setModelNo(e.target.value)} />
          </div>

          <div className="box priceBox">
            <label htmlFor="price" title="Enter the selling price of the product.">
              Price*:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              value={price}
              onInput={(e) => {
                e.target.value = Math.abs(e.target.value);
              }}
              onChange={(e) => setPrice(e.target.value)}
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
              min="0"
              value={mrp}
              onInput={(e) => {
                e.target.value = Math.abs(e.target.value);
              }}
              onChange={(e) => setMrp(e.target.value)}
            />
          </div>

          <div className="box sizeBox">
            <label htmlFor="sizes" title="Enter available sizes for the product (e.g., 'Small', 'Medium', 'Large', 'Standard').">
              Sizes*:
            </label>
            <select className="sizes" name="sizes" value={size} onChange={(e) => setSize(e.target.value)}>
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
              value={stock}
              onInput={(e) => {
                e.target.value = Math.abs(e.target.value);
              }}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div className="box colorBox">
            <label htmlFor="color" title="Enter the color options available for the product (if applicable).">
              Color:
            </label>
            <input type="text" id="color" name="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>

          <div className="box materialBox">
            <label htmlFor="material" title="Enter the material(s) used in the product (if applicable).">
              Material:
            </label>
            <input type="text" id="material" name="material" value={material} onChange={(e) => setMaterial(e.target.value)} />
          </div>

          <div className="box manufacBox">
            <label htmlFor="manufacturer" title="Enter the name of the manufacturer of the product.">
              Manufacturer*:
            </label>
            <input type="text" id="manufacturer" name="manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
          </div>

          <div className="box warrBox">
            <label htmlFor="warranty" title="Enter warranty details (e.g., '1 Month', '1 Year', '90 Days').">
              Warranty:
            </label>
            <input type="text" id="warranty" name="warranty" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
          </div>

          <div className="box madeinBox">
            <label htmlFor="madeIn" title="Enter the country of manufacture for the product.">
              Made in*:
            </label>
            <input type="text" id="madeIn" name="madeIn" value={madeIn} onChange={(e) => setMadeIn(e.target.value)} />
          </div>
        </div>

        <div className={`deletePopup ${showDeletePopup ? "show" : ""}`}>
          <p className="pNameP">
            <span>Product Name: </span>
            {productName}
          </p>
          <p className="skuP">
            <span>SKU: </span>
            {sku}
          </p>
          <p className="msgP">
            Are you sure?
            <br /> Product will Delete permanently?
          </p>
          <div className="deleteP">
            <Button className="cancelP" onClick={handleCancelDelete}>
              Cancel
            </Button>

            {deleteLoading ? (
              <div class="spinner"></div>
            ) : (
              <Button className="deleteBP" onClick={finalDelete}>
                Delete
              </Button>
            )}
          </div>
        </div>

        <div className="imgInput">
          <div className="dltProduct">
            <Button onClick={handleDeleteProduct}>
              Delete Product
              <DeleteRoundedIcon
                style={{
                  fontSize: "2rem",
                  cursor: "pointer",
                }}
              />
            </Button>
          </div>
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
          <div className="formBtn2">{formSubmitLoading ? <div class="spinner"></div> : <Button type="submit">Update</Button>}</div>
        </div>
      </form>
    </div>
  );
}

export default ManageProduct;
