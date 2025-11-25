import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../../redux/store";
import {
  fetchProduct,
  updateProduct,
  updateProductForm,
} from "../../redux/bigbasket/big-basket.slice";
import type { IProduct } from "./models/IProduct";

const UpdateProduct: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { productId } = useParams<{ productId: string }>();

  const { selectedProduct, loading } = useSelector(
    (state: RootState) => state.bigBasket
  );

  useEffect(() => {
    if (productId) dispatch(fetchProduct(productId));
  }, [dispatch, productId]);

  const updateInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      updateProductForm({
        key: e.target.name as keyof IProduct,
        value: e.target.value,
      })
    );
  };

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () =>
      dispatch(
        updateProductForm({
          key: "image" as keyof IProduct,
          value: reader.result as string,
        })
      );

    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (productId) {
      dispatch(
        updateProduct({ product: selectedProduct, productId, navigate })
      );
    }
  };

  if (loading || !selectedProduct._id) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted fw-semibold">
              Loading product details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-4 container">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7">
          {/* Header Card */}
          <div
            className="card border-0 shadow-sm mb-4"
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              borderRadius: "14px",
            }}
          >
            <div className="card-body py-4">
              <div className="d-flex align-items-center">
                <div className="bg-white bg-opacity-25 rounded-circle p-3 me-3 d-flex align-items-center justify-content-center">
                  <i className="fas fa-edit fa-2x text-white"></i>
                </div>

                <div>
                  <h3 className="mb-1 fw-bold text-white">Update Product</h3>
                  <p className="mb-0" style={{ opacity: 0.85, color: "white" }}>
                    Modify existing product details
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
                    <i className="fas fa-box me-2 text-danger"></i>
                    Product Name
                  </label>
                  <input
                    name="name"
                    value={selectedProduct.name ?? ""}
                    onChange={updateInput}
                    className="form-control form-control-lg border-2 rounded-3"
                    placeholder="Enter product name"
                    style={{ borderColor: "#ffe0e0" }}
                  />
                </div>

                {/* Product Image */}
                <div className="mb-4">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="fas fa-image me-2 text-danger"></i>
                    Product Image
                  </label>
                  <input
                    type="file"
                    onChange={updateImage}
                    className="form-control form-control-lg border-2 rounded-3"
                    style={{ borderColor: "#ffe0e0" }}
                  />
                  {selectedProduct.image && (
                    <div className="text-center mt-3">
                      <img
                        src={selectedProduct.image}
                        alt="Product"
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
                      value={selectedProduct.price ?? 0}
                      onChange={updateInput}
                      className="form-control form-control-lg border-2 rounded-3"
                      placeholder="0.00"
                      style={{ borderColor: "#ffe0e0" }}
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
                      value={selectedProduct.qty ?? 0}
                      onChange={updateInput}
                      className="form-control form-control-lg border-2 rounded-3"
                      placeholder="0"
                      style={{ borderColor: "#ffe0e0" }}
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
                    value={selectedProduct.info ?? ""}
                    onChange={updateInput}
                    className="form-control form-control-lg border-2 rounded-3"
                    placeholder="Enter product details..."
                    rows={4}
                    style={{ borderColor: "#ffe0e0", resize: "none" }}
                  />
                </div>

                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-lg text-white fw-bold rounded-3 shadow-sm"
                    style={{
                      background:
                        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      border: "none",
                      padding: "14px",
                    }}
                  >
                    <i className="fas fa-save me-2"></i>
                    Update Product
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="btn btn-lg btn-outline-secondary fw-semibold rounded-3"
                    style={{ padding: "14px" }}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Product ID Badge */}
          <div className="text-center mt-3">
            <span className="badge bg-light text-dark border px-3 py-2">
              <i className="fas fa-fingerprint me-2"></i>
              Product ID: {selectedProduct._id}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateProduct;
