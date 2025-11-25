import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import type { IProduct } from "./models/IProduct";
import { createProduct } from "../../redux/bigbasket/big-basket.slice";
import { useNavigate } from "react-router-dom";

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<IProduct>({
    name: "",
    image: "",
    price: 0,
    qty: 0,
    info: "",
  });

  const updateInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () =>
      setProduct({ ...product, image: reader.result as string });

    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createProduct({ product, navigate }));
  };

  return (
    <section className="mt-4 container">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          {/* Header Card */}
          <div
            className="card border-0 shadow-sm mb-4"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "14px",
            }}
          >
            <div className="card-body py-4">
              <div className="d-flex align-items-center">
                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3 d-flex align-items-center justify-content-center">
                  <i className="fas fa-plus-circle fa-2x text-white"></i>
                </div>

                <div>
                  <h3 className="mb-1 fw-bold text-white">
                    Create New Product
                  </h3>
                  <p className="mb-0" style={{ opacity: 0.85, color: "white" }}>
                    Add a new item to your inventory
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="card border-0 shadow-lg">
            <div className="card-body p-4">
              <form onSubmit={submit}>
                {/* Product Name */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fas fa-box me-2 text-primary"></i>
                    Product Name
                  </label>
                  <input
                    name="name"
                    value={product.name}
                    onChange={updateInput}
                    className="form-control form-control-lg border-2 rounded-3"
                    placeholder="Enter product name"
                    required
                    style={{ borderColor: "#e0e7ff" }}
                  />
                </div>

                {/* Product Image */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fas fa-image me-2 text-primary"></i>
                    Product Image
                  </label>
                  <input
                    type="file"
                    onChange={updateImage}
                    className="form-control form-control-lg border-2 rounded-3"
                    required
                    style={{ borderColor: "#e0e7ff" }}
                  />
                  {product.image && (
                    <div className="text-center mt-3">
                      <img
                        src={product.image}
                        alt="Preview"
                        className="rounded-4 shadow-sm border border-3 border-light"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Price and Quantity Row */}
                <div className="row mb-4">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label className="form-label fw-semibold text-secondary">
                      <i className="fas fa-dollar-sign me-2 text-success"></i>
                      Price
                    </label>
                    <input
                      name="price"
                      type="number"
                      value={product.price}
                      onChange={updateInput}
                      className="form-control form-control-lg border-2 rounded-3"
                      placeholder="0.00"
                      required
                      style={{ borderColor: "#e0e7ff" }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold text-secondary">
                      <i className="fas fa-hashtag me-2 text-info"></i>
                      Quantity
                    </label>
                    <input
                      name="qty"
                      type="number"
                      value={product.qty}
                      onChange={updateInput}
                      className="form-control form-control-lg border-2 rounded-3"
                      placeholder="0"
                      required
                      style={{ borderColor: "#e0e7ff" }}
                    />
                  </div>
                </div>

                {/* Product Information */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fas fa-info-circle me-2 text-warning"></i>
                    Product Information
                  </label>
                  <textarea
                    name="info"
                    value={product.info}
                    onChange={updateInput}
                    className="form-control form-control-lg border-2 rounded-3"
                    placeholder="Enter product details..."
                    rows={4}
                    required
                    style={{ borderColor: "#e0e7ff", resize: "none" }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-lg w-100 text-white fw-bold rounded-3 shadow-sm"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    padding: "14px",
                  }}
                >
                  <i className="fas fa-plus-circle me-2"></i>
                  Create Product
                </button>
              </form>
            </div>
          </div>

          {/* Helper Text */}
          <div className="text-center mt-3">
            <small className="text-muted">
              <i className="fas fa-shield-alt me-1"></i>
              All fields are required to create a product
            </small>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;
