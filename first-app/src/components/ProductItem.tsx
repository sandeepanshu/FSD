import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrProductQty,
  decrProductQty,
} from "../redux/product-item/product-item.slice";
import type { RootState } from "../redux/store";

const ProductItem: React.FC = () => {
  const dispatch = useDispatch();
  const { product } = useSelector((state: RootState) => state.prod);

  return (
    <>
      {/* Header Section */}
      <section className="py-4 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold text-primary">Product Item</h2>
          <p className="text-muted">
            Manage your product with a clean and responsive table UI.
          </p>
        </div>
      </section>

      {/* Table Section */}
      <section className="py-4">
        <div className="container">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body">
              <table className="table table-hover text-center align-middle table-striped mb-0">
                <thead className="bg-dark text-white">
                  <tr>
                    <th style={{ width: "80px" }}>SNO</th>
                    <th style={{ width: "100px" }}>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th style={{ width: "180px" }}>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className="fw-bold">#{product.sno}</td>

                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="rounded shadow-sm"
                        width="55"
                        height="55"
                        style={{ objectFit: "cover" }}
                      />
                    </td>

                    <td className="fw-semibold">{product.name}</td>

                    <td className="fw-bold text-success">
                      ₹ {product.price.toLocaleString()}
                    </td>

                    <td>
                      <div className="d-flex align-items-center justify-content-center gap-3">
                        <button
                          className="btn btn-outline-danger btn-sm rounded-circle"
                          onClick={() => dispatch(decrProductQty())}
                        >
                          <i className="fas fa-minus"></i>
                        </button>

                        <span className="fw-bold fs-5">{product.qty}</span>

                        <button
                          className="btn btn-outline-success btn-sm rounded-circle"
                          onClick={() => dispatch(incrProductQty())}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>

                    <td className="fw-bold text-primary">
                      ₹ {(product.price * product.qty).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductItem;
