import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  incrProductQty,
  decrProductQty,
  deleteCartProduct,
} from "../../../../redux/orders/order.slice";
import { type RootState, type AppDispatch } from "../../../../redux/store";
import { CartUtil } from "../../../../util/CartUtil";
import "./Cart.css";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { cartItems } = useSelector((state: RootState) => state.orders);

  const clickIncrQty = (productId: string) => {
    dispatch(incrProductQty(productId));
  };

  const clickDecrQty = (productId: string) => {
    dispatch(decrProductQty(productId));
  };

  const clickDeleteProduct = (productId: string) => {
    dispatch(deleteCartProduct(productId));
  };

  return (
    <React.Fragment>
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
                <i className="fas fa-shopping-cart me-3"></i>
                Your Shopping Cart
              </h2>
              <p className="mb-0 text-white-50 mt-2">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                in your cart
              </p>
            </div>
          </div>
        </div>
      </section>

      {cartItems.length > 0 ? (
        <section className="py-4">
          <div className="container">
            <div className="row g-4">
              {/* Cart Items */}
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white border-0 py-3">
                    <h5 className="mb-0 fw-bold">
                      <i className="fas fa-box me-2 text-primary"></i>
                      Cart Items
                    </h5>
                  </div>
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table cart-table mb-0">
                        <thead>
                          <tr>
                            <th style={{ width: "60px" }}>SNO</th>
                            <th style={{ width: "100px" }}>Image</th>
                            <th>Product</th>
                            <th style={{ width: "120px" }}>Price</th>
                            <th style={{ width: "150px" }}>Quantity</th>
                            <th style={{ width: "120px" }}>Subtotal</th>
                            <th style={{ width: "100px" }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cartItem, index) => (
                            <tr key={cartItem._id}>
                              <td className="align-middle">
                                <span className="item-number">{index + 1}</span>
                              </td>
                              <td className="align-middle">
                                <div className="cart-item-image">
                                  <img
                                    src={cartItem.image}
                                    alt={cartItem.name}
                                  />
                                </div>
                              </td>
                              <td className="align-middle">
                                <div className="product-info">
                                  <h6 className="product-name">
                                    {cartItem.name}
                                  </h6>
                                  <span className="product-brand">
                                    {cartItem.brand}
                                  </span>
                                </div>
                              </td>
                              <td className="align-middle">
                                <span className="product-price">
                                  ₹{cartItem.price.toFixed(2)}
                                </span>
                              </td>
                              <td className="align-middle">
                                <div className="quantity-controls">
                                  <button
                                    className="qty-btn"
                                    onClick={() =>
                                      clickDecrQty(cartItem?._id ?? "")
                                    }
                                    disabled={cartItem.qty <= 1}
                                  >
                                    <i className="fas fa-minus"></i>
                                  </button>
                                  <input
                                    type="text"
                                    className="qty-input"
                                    value={cartItem.qty}
                                    readOnly
                                  />
                                  <button
                                    className="qty-btn"
                                    onClick={() =>
                                      clickIncrQty(cartItem?._id || "")
                                    }
                                    disabled={cartItem.qty >= 10}
                                  >
                                    <i className="fas fa-plus"></i>
                                  </button>
                                </div>
                              </td>
                              <td className="align-middle">
                                <span className="subtotal-price">
                                  ₹{(cartItem.price * cartItem.qty).toFixed(2)}
                                </span>
                              </td>
                              <td className="align-middle">
                                <button
                                  className="btn-delete"
                                  onClick={() =>
                                    clickDeleteProduct(cartItem?._id || "")
                                  }
                                  title="Remove item"
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-3">
                  <Link to="/" className="btn-continue-shopping">
                    <i className="fas fa-arrow-left me-2"></i>
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Cart Summary */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm sticky-summary">
                  <div className="card-header bg-white border-0 py-3">
                    <h5 className="mb-0 fw-bold">
                      <i className="fas fa-receipt me-2 text-primary"></i>
                      Order Summary
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="summary-item">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="summary-value">
                        ₹{CartUtil.calcTotal(cartItems).toFixed(2)}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span>Tax (18% GST)</span>
                      <span className="summary-value">
                        ₹{CartUtil.calcTax(cartItems).toFixed(2)}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span>Shipping</span>
                      <span className="summary-value text-success">FREE</span>
                    </div>
                    <hr />
                    <div className="summary-item total">
                      <span>Total Amount</span>
                      <span className="summary-value">
                        ₹{CartUtil.calcGrandTotal(cartItems).toFixed(2)}
                      </span>
                    </div>

                    <div className="savings-badge">
                      <i className="fas fa-tag me-2"></i>
                      You're saving ₹0.00 on this order
                    </div>

                    <div className="d-grid gap-2 mt-4">
                      <Link to="/orders/checkout" className="btn-checkout">
                        <i className="fas fa-lock me-2"></i>
                        Proceed to Checkout
                      </Link>
                    </div>

                    {/* Trust Badges */}
                    <div className="trust-badges mt-4">
                      <div className="trust-item">
                        <i className="fas fa-shield-alt"></i>
                        <span>Secure Payment</span>
                      </div>
                      <div className="trust-item">
                        <i className="fas fa-undo"></i>
                        <span>Easy Returns</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "100px" }} />
        </section>
      ) : (
        <section className="empty-cart-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="empty-cart-box">
                  <div className="empty-cart-icon">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                  <h3 className="empty-cart-title">Your Cart is Empty</h3>
                  <p className="empty-cart-text">
                    Looks like you haven't added any items to your cart yet.
                    Start shopping to fill it up!
                  </p>
                  <Link to="/" className="btn-start-shopping">
                    <i className="fas fa-shopping-bag me-2"></i>
                    Start Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default Cart;
