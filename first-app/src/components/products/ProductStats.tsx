import React from "react";
import type { IProduct } from "./models/IProduct";

interface Props {
  products: IProduct[];
}

const ProductStats: React.FC<Props> = ({ products }) => {
  return (
    <section className="mb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body text-center">
                <i className="fas fa-boxes fa-2x text-success mb-2"></i>
                <h4>{products.length}</h4>
                <small className="text-muted">Total Products</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductStats;
