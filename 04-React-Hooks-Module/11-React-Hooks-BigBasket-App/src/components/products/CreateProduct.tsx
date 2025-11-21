import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { IProduct } from "./models/IProduct";

interface IState {
  product: IProduct;
  isSubmitting: boolean;
}

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();

  const [productState, setProductState] = useState<IState>({
    product: {
      name: "",
      image: "",
      price: 0,
      qty: 0,
      info: "",
    },
    isSubmitting: false,
  });

  const { product, isSubmitting } = productState;

  const updateInput = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setProductState({
      ...productState,
      product: {
        ...product,
        [event.target.name]: event.target.value,
      },
    });
  };

  /** Convert image to base64 */
  const updateImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const imageFile = event.target.files[0];
    const base64Image = await convertBase64String(imageFile);

    setProductState({
      ...productState,
      product: {
        ...product,
        image: base64Image.toString(),
      },
    });
  };

  const convertBase64String = (file: Blob): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = () => reject("Error converting file");
    });
  };

  /** Submit form */
  const submitCreateProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setProductState({ ...productState, isSubmitting: true });

    const dataURL = "http://127.0.0.1:5000/api/products";

    axios
      .post(dataURL, product)
      .then(() => {
        navigate("/products/admin");
      })
      .catch((error) => {
        console.error(error);
        setProductState({ ...productState, isSubmitting: false });
      });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-light py-4 mb-4">
        <div className="container">
          <div className="row">
            <div className="col">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-3">
                  <li className="breadcrumb-item">
                    <a href="/products/admin" className="text-decoration-none">
                      <i className="fas fa-home me-1"></i>Admin
                    </a>
                  </li>
                  <li className="breadcrumb-item active">Create Product</li>
                </ol>
              </nav>
              <h2 className="h3 text-success fw-bold mb-2">
                <i className="fas fa-plus-circle me-2"></i>Create New Product
              </h2>
              <p className="text-muted mb-0">
                Add a new product to your inventory with complete details and pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card shadow-lg border-0">
                <div className="card-header bg-gradient text-white py-3">
                  <h5 className="mb-0">
                    <i className="fas fa-clipboard-list me-2"></i>
                    Product Information
                  </h5>
                </div>

                <div className="card-body p-4">
                  <form onSubmit={submitCreateProduct}>
                    {/* Product Name */}
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label fw-semibold">
                        <i className="fas fa-tag text-success me-2"></i>
                        Product Name <span className="text-danger">*</span>
                      </label>
                      <input
                        id="name"
                        required
                        name="name"
                        value={product.name}
                        onChange={updateInput}
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter product name (e.g., Fresh Organic Apples)"
                      />
                      <small className="form-text text-muted">
                        Choose a clear, descriptive name for your product
                      </small>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                      <label htmlFor="image" className="form-label fw-semibold">
                        <i className="fas fa-image text-success me-2"></i>
                        Product Image <span className="text-danger">*</span>
                      </label>
                      <input
                        id="image"
                        required
                        name="image"
                        onChange={updateImage}
                        type="file"
                        accept="image/*"
                        className="form-control"
                      />
                      <small className="form-text text-muted">
                        Upload a high-quality image (JPG, PNG, or WebP format)
                      </small>

                      {/* Image Preview */}
                      {product.image && (
                        <div className="mt-3 text-center">
                          <p className="text-muted small mb-2">
                            <i className="fas fa-eye me-1"></i>Preview:
                          </p>
                          <div className="border rounded p-3 d-inline-block bg-light">
                            <img
                              src={product.image}
                              alt="Product Preview"
                              className="rounded shadow-sm"
                              style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price and Quantity Row */}
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="price" className="form-label fw-semibold">
                            <i className="fas fa-rupee-sign text-success me-2"></i>
                            Price (₹) <span className="text-danger">*</span>
                          </label>
                          <input
                            id="price"
                            required
                            name="price"
                            value={product.price}
                            onChange={updateInput}
                            type="number"
                            step="0.01"
                            min="0"
                            className="form-control form-control-lg"
                            placeholder="0.00"
                          />
                          <small className="form-text text-muted">
                            Enter price per unit
                          </small>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="qty" className="form-label fw-semibold">
                            <i className="fas fa-weight text-info me-2"></i>
                            Quantity (Kgs) <span className="text-danger">*</span>
                          </label>
                          <input
                            id="qty"
                            required
                            name="qty"
                            value={product.qty}
                            onChange={updateInput}
                            type="number"
                            step="0.01"
                            min="0"
                            className="form-control form-control-lg"
                            placeholder="0"
                          />
                          <small className="form-text text-muted">
                            Available stock in Kgs
                          </small>
                        </div>
                      </div>
                    </div>

                    {/* Product Description */}
                    <div className="mb-4">
                      <label htmlFor="info" className="form-label fw-semibold">
                        <i className="fas fa-info-circle text-success me-2"></i>
                        Product Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        id="info"
                        required
                        name="info"
                        value={product.info}
                        onChange={updateInput}
                        rows={5}
                        className="form-control"
                        placeholder="Describe your product in detail - include features, benefits, origin, quality, and any other relevant information that helps customers understand what makes this product special..."
                      />
                      <small className="form-text text-muted">
                        {product.info?.length || 0} characters • Provide detailed information to help customers
                      </small>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-grid gap-2">
                      <button
                        type="submit"
                        className="btn btn-success btn-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Creating Product...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-check-circle me-2"></i>
                            Create Product
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate("/products/admin")}
                        className="btn btn-outline-secondary"
                        disabled={isSubmitting}
                      >
                        <i className="fas fa-times me-2"></i>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

                {/* Info Footer */}
                <div className="card-footer bg-light text-muted small">
                  <i className="fas fa-info-circle me-1"></i>
                  All fields marked with <span className="text-danger">*</span> are required
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .bg-gradient {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        }

        .form-control:focus {
          border-color: #28a745;
          box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
        }

        .btn-success {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          border: none;
          transition: all 0.3s ease;
        }

        .btn-success:hover:not(:disabled) {
          background: linear-gradient(135deg, #20c997 0%, #28a745 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
        }

        .btn-success:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .card {
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .form-label {
          margin-bottom: 0.5rem;
        }

        .form-text {
          margin-top: 0.25rem;
          display: block;
        }
      `}</style>

      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </>
  );
};

export default CreateProduct;