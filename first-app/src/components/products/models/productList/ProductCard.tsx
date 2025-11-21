import React from "react";
import type { IProduct } from "../IProduct";

interface Props {
  product: IProduct;
  index: number;
}

const ProductCard: React.FC<Props> = ({ product, index }) => {
  return (
    <div
      className="col-lg-3 col-md-4 col-sm-6 fadeInUp"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="card h-100 shadow-sm border-0 product-card">
        <div className="card-header bg-white border-0 text-center p-3">
          <div className="product-img-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
            />
          </div>
        </div>

        <div className="card-body">
          <h5 className="fw-semibold text-truncate">{product.name}</h5>

          <div className="d-flex justify-content-between mt-2">
            <span className="text-muted">
              <i className="fas fa-tag text-success me-1" />
              Price
            </span>
            <strong className="text-success">
              ₹{product.price.toFixed(2)}
            </strong>
          </div>

          <div className="d-flex justify-content-between mt-2">
            <span className="text-muted">
              <i className="fas fa-weight text-info me-1" />
              Qty
            </span>
            <span className="badge bg-info">{product.qty} Kg</span>
          </div>
        </div>

        <div className="card-footer bg-white border-0 pb-3">
          <button className="btn btn-success w-100 btn-sm">
            <i className="fas fa-cart-plus me-1" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
