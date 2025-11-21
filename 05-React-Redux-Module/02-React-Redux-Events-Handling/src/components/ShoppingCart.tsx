import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrProductQty, decrProductQty } from "../redux/shopping-cart/shopping-cart.slice";
import type { RootState } from "../redux/store";

const ShoppingCart: React.FC = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.cart);

  return (
    <>
      {/* Header Section */}
      <section className="py-4 bg-light border-bottom">
        <div className="container text-center">
          <h2 className="fw-bold text-success">🛒 Shopping Cart</h2>
          <p className="text-muted">
            Manage your cart items and adjust quantities as needed.
          </p>
        </div>
      </section>

      {/* Cart Table */}
      <section className="py-4">
        <div className="container">
          <div className="card shadow-lg rounded-4 border-0">
            <div className="card-body p-0">
              <table className="table table-hover text-center align-middle table-striped mb-0">
                <thead className="bg-dark text-primary text-uppercase">
                  <tr>
                    <th style={{ width: "80px" }}>SNO</th>
                    <th style={{ width: "100px" }}>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th style={{ width: "180px" }}>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product.sno}>
                      {/* SNO */}
                      <td className="fw-bold">#{product.sno}</td>

                      {/* Image */}
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          width="55"
                          height="55"
                          className="rounded shadow-sm border"
                        />
                      </td>

                      {/* Product Name */}
                      <td className="fw-semibold">{product.name}</td>

                      {/* Price */}
                      <td className="fw-bold text-success">
                        ₹ {product.price.toLocaleString()}
                      </td>

                      {/* Quantity Control */}
                      <td>
                        <div className="d-flex justify-content-center align-items-center gap-3">

                          <button
                            className="btn btn-outline-danger btn-sm rounded-circle shadow-sm"
                            onClick={() => dispatch(decrProductQty(product.sno))}
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <span className="fw-bold fs-5">{product.qty}</span>

                          <button
                            className="btn btn-outline-success btn-sm rounded-circle shadow-sm"
                            onClick={() => dispatch(incrProductQty(product.sno))}
                          >
                            <i className="fas fa-plus"></i>
                          </button>

                        </div>
                      </td>

                      {/* Total Price */}
                      <td className="fw-bold text-primary">
                        ₹ {(product.price * product.qty).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
