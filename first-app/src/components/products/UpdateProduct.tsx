import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import type { IProduct } from "./models/IProduct";

const defaultProduct: IProduct = {
  name: "",
  image: "",
  price: 0,
  qty: 0,
  info: "",
};

const UpdateProduct: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<IProduct>(defaultProduct);
  const [loading, setLoading] = useState(true);

  /** Fetch product by ID */
  useEffect(() => {
    if (!productId) return;

    axios
      .get(`http://127.0.0.1:5000/api/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [productId]);

  /** Input change handler */
  const updateField = (e: React.ChangeEvent<any>) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  /** Convert image to Base64 */
  const updateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () =>
      setProduct((p) => ({ ...p, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  /** Submit update */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .put(`http://127.0.0.1:5000/api/products/${productId}`, product)
      .then(() => navigate("/products/admin"))
      .catch(console.error);
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-light py-4 mb-4">
        <div className="container">
          <nav>
            <ol className="breadcrumb mb-3">
              <li className="breadcrumb-item">
                <a href="/products/admin" className="text-decoration-none">
                  <i className="fas fa-home me-1"></i>Admin
                </a>
              </li>
              <li className="breadcrumb-item active">Update Product</li>
            </ol>
          </nav>

          <h2 className="h3 text-secondary fw-bold">
            <i className="fas fa-edit me-2"></i>Update Product
          </h2>
          <p className="text-muted">Modify product details and save changes.</p>
        </div>
      </section>

      {/* Loading */}
      {loading && (
        <div className="container text-center py-5">
          <div className="spinner-border text-secondary"></div>
          <p className="mt-3 text-muted">Loading product details...</p>
        </div>
      )}

      {/* Form */}
      {!loading && (
        <section className="pb-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 col-lg-6">
                <div className="card shadow-lg border-0">
                  <div className="card-header bg-gradient text-white py-3">
                    <h5>
                      <i className="fas fa-clipboard-list me-2"></i>
                      Edit Product Details
                    </h5>
                  </div>

                  <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                      {/* Name */}
                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-tag me-2 text-secondary"></i>
                          Product Name
                        </label>

                        <input
                          name="name"
                          value={product.name}
                          onChange={updateField}
                          required
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Enter product name"
                        />
                      </div>

                      {/* Image */}
                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-image me-2 text-secondary"></i>
                          Product Image
                        </label>

                        <input
                          type="file"
                          accept="image/*"
                          onChange={updateImage}
                          className="form-control"
                        />

                        {product.image && (
                          <div className="mt-3 text-center">
                            <p className="text-muted small">Current Image:</p>
                            <img
                              src={product.image}
                              alt=""
                              className="rounded border"
                              style={{
                                width: 120,
                                height: 120,
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Price + Qty */}
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label className="form-label fw-semibold">
                            <i className="fas fa-rupee-sign text-success me-2"></i>
                            Price (₹)
                          </label>

                          <input
                            name="price"
                            value={product.price}
                            onChange={updateField}
                            required
                            type="number"
                            step="0.01"
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div className="col-md-6 mb-4">
                          <label className="form-label fw-semibold">
                            <i className="fas fa-weight text-info me-2"></i>
                            Quantity (Kgs)
                          </label>

                          <input
                            name="qty"
                            value={product.qty}
                            onChange={updateField}
                            required
                            type="number"
                            step="0.01"
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="mb-4">
                        <label className="form-label fw-semibold">
                          <i className="fas fa-info-circle me-2 text-secondary"></i>
                          Product Description
                        </label>

                        <textarea
                          name="info"
                          value={product.info}
                          onChange={updateField}
                          rows={4}
                          className="form-control"
                        ></textarea>
                      </div>

                      {/* Buttons */}
                      <div className="d-grid gap-2">
                        <button className="btn btn-secondary btn-lg">
                          <i className="fas fa-save me-2"></i>Update Product
                        </button>

                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => navigate("/products/admin")}
                        >
                          <i className="fas fa-times me-2"></i>Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Styling */}
      <style jsx>{`
        .bg-gradient {
          background: linear-gradient(135deg, #6c757d, #495057);
        }
        .btn-secondary {
          background: linear-gradient(135deg, #6c757d, #495057);
          border: none;
        }
        .btn-secondary:hover {
          transform: translateY(-2px);
        }
        .card {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default UpdateProduct;
