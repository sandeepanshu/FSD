import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadProduct } from "../../../../redux/products/product.slice";
import { type AppDispatch, type RootState } from "../../../../redux/store";
import { type IProduct } from "../../models/IProduct";
import "./UploadProduct.css";

const UploadProduct: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [productState, setProductState] = useState<IProduct>({
    name: "",
    brand: "",
    image: "",
    price: 0,
    qty: 0,
    category: "",
    description: "",
    usage: "",
  } as IProduct);

  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const { user } = useSelector((state: RootState) => state.users);

  const updateInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setProductState({
      ...productState,
      [event.target.name]: event.target.value,
    });
  };

  const updateImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const imageFile: File = files[0];

    // Validate file size (max 5MB)
    if (imageFile.size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5MB");
      return;
    }

    // Validate file type
    if (!imageFile.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    try {
      const base64Image = await convertBase64String(imageFile);
      setProductState({
        ...productState,
        image: base64Image.toString(),
      });
      setImagePreview(base64Image.toString());
    } catch (error) {
      console.error("Error converting image:", error);
      alert("Failed to process image");
    }
  };

  const convertBase64String = (imageFile: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(imageFile);
      fileReader.addEventListener("load", () => {
        if (fileReader.result) {
          resolve(fileReader.result as string);
        } else {
          reject("Error occurred while reading file");
        }
      });
      fileReader.addEventListener("error", () => {
        reject("Error occurred while reading file");
      });
    });
  };

  const submitUploadProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsUploading(true);

    try {
      await dispatch(uploadProduct(productState)).unwrap();
      // Reset form
      setProductState({
        name: "",
        brand: "",
        image: "",
        price: 0,
        qty: 0,
        category: "",
        description: "",
        usage: "",
      } as IProduct);
      setImagePreview("");
      navigate("/");
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {/* Header Section */}
      <section
        className="text-white py-4 mb-4"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h2 className="fw-bold mb-0">
                <i className="fas fa-cloud-upload-alt me-3"></i>
                Upload Products
              </h2>
              <p className="mb-0 text-white-50 mt-2">
                Add new products to your store inventory
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="container">
          {user && user.isAdmin ? (
            <>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white border-0 py-3">
                      <div className="d-flex align-items-center">
                        <div className="upload-icon">
                          <i className="fas fa-box"></i>
                        </div>
                        <div>
                          <h5 className="mb-0 fw-bold">Product Information</h5>
                          <p className="mb-0 text-muted small">
                            Fill in the details below to add a new product
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-4">
                      <form
                        onSubmit={submitUploadProduct}
                        className="upload-form"
                      >
                        <div className="row g-3">
                          {/* Product Name */}
                          <div className="col-md-6">
                            <label className="form-label fw-semibold">
                              <i className="fas fa-tag me-2 text-primary"></i>
                              Product Name
                            </label>
                            <input
                              required
                              name="name"
                              value={productState.name}
                              onChange={updateInput}
                              type="text"
                              className="form-control modern-input"
                              placeholder="Enter product name"
                            />
                          </div>

                          {/* Brand */}
                          <div className="col-md-6">
                            <label className="form-label fw-semibold">
                              <i className="fas fa-copyright me-2 text-primary"></i>
                              Brand
                            </label>
                            <input
                              required
                              name="brand"
                              value={productState.brand}
                              onChange={updateInput}
                              type="text"
                              className="form-control modern-input"
                              placeholder="Enter brand name"
                            />
                          </div>

                          {/* Price */}
                          <div className="col-md-4">
                            <label className="form-label fw-semibold">
                              <i className="fas fa-rupee-sign me-2 text-primary"></i>
                              Price
                            </label>
                            <input
                              required
                              name="price"
                              value={productState.price || ""}
                              onChange={updateInput}
                              type="number"
                              min="0"
                              step="0.01"
                              className="form-control modern-input"
                              placeholder="0.00"
                            />
                          </div>

                          {/* Quantity */}
                          <div className="col-md-4">
                            <label className="form-label fw-semibold">
                              <i className="fas fa-cubes me-2 text-primary"></i>
                              Quantity
                            </label>
                            <input
                              required
                              name="qty"
                              value={productState.qty || ""}
                              onChange={updateInput}
                              type="number"
                              min="0"
                              className="form-control modern-input"
                              placeholder="0"
                            />
                          </div>

                          {/* Category */}
                          <div className="col-md-4">
                            <label className="form-label fw-semibold">
                              <i className="fas fa-list me-2 text-primary"></i>
                              Category
                            </label>
                            <select
                              required
                              name="category"
                              value={productState.category}
                              onChange={updateInput}
                              className="form-select modern-input"
                            >
                              <option value="">Select Category</option>
                              <option value="MEN">Men's Collection</option>
                              <option value="WOMEN">Women's Collection</option>
                              <option value="KIDS">Kids's Collection</option>
                            </select>
                          </div>

                          {/* Image Upload */}
                          <div className="col-12">
                            <label className="form-label fw-semibold">
                              <i className="fas fa-image me-2 text-primary"></i>
                              Product Image
                            </label>
                            <div className="image-upload-wrapper">
                              <input
                                required={!imagePreview}
                                name="image"
                                onChange={updateImage}
                                className="form-control modern-input"
                                type="file"
                                accept="image/*"
                                id="productImage"
                              />
                              <small className="text-muted d-block mt-1">
                                <i className="fas fa-info-circle me-1"></i>
                                Maximum file size: 5MB. Accepted formats: JPG,
                                PNG, WebP
                              </small>
                            </div>
                            {imagePreview && (
                              <div className="image-preview mt-3">
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="preview-image"
                                />
                                <button
                                  type="button"
                                  className="remove-image-btn"
                                  onClick={() => {
                                    setImagePreview("");
                                    setProductState({
                                      ...productState,
                                      image: "",
                                    });
                                  }}
                                >
                                  <i className="fas fa-times"></i>
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Description */}
                          <div className="col-12">
                            <label className="form-label fw-semibold">
                              <i className="fas fa-align-left me-2 text-primary"></i>
                              Description
                            </label>
                            <textarea
                              required
                              name="description"
                              value={productState.description}
                              onChange={updateInput}
                              rows={3}
                              className="form-control modern-input"
                              placeholder="Enter product description"
                            />
                          </div>

                          {/* Usage */}
                          <div className="col-12">
                            <label className="form-label fw-semibold">
                              <i className="fas fa-info-circle me-2 text-primary"></i>
                              Usage Instructions
                            </label>
                            <textarea
                              required
                              name="usage"
                              value={productState.usage}
                              onChange={updateInput}
                              rows={3}
                              className="form-control modern-input"
                              placeholder="Enter usage instructions"
                            />
                          </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-actions mt-4">
                          <button
                            type="submit"
                            className="btn-upload"
                            disabled={isUploading}
                          >
                            {isUploading ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Uploading...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-cloud-upload-alt me-2"></i>
                                Upload Product
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            className="btn-cancel-upload"
                            onClick={() => navigate("/")}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="unauthorized-access">
              <div className="unauthorized-icon">
                <i className="fas fa-lock"></i>
              </div>

              <h3 className="unauthorized-title">Access Restricted</h3>

              <p className="unauthorized-message">
                 
                Hey <strong>{user?.name ?? "User"}</strong>! You are not
                authorized to upload products.
              </p>

              <div className="unauthorized-note">
                <i className="fas fa-info-circle me-2"></i>
                <span>
                  If you need access to upload products, please contact the
                  administrator.
                </span>
              </div>

              <button onClick={() => navigate("/")} className="btn-back-home">
                <i className="fas fa-home me-2"></i>
                Back to Home
              </button>
            </div>
          )}
        </div>
      </section>
      <div style={{ marginBottom: "100px" }} />
    </>
  );
};

export default UploadProduct;
