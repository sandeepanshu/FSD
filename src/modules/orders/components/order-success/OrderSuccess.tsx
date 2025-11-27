import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../../layout/components/spinner/Spinner";
import { clearCart } from "../../../../redux/orders/order.slice";
import { type RootState, type AppDispatch } from "../../../../redux/store";
import "./OrderSuccess.css";

const OrderSuccess: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { order, loading } = useSelector((state: RootState) => state.orders);

  const takePrint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    return window.print();
  };

  const clickDone = () => {
    dispatch(clearCart());
  };

  return (
    <>
      {/* Header Section */}
      <section
        className="text-white py-4 mb-4"
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col text-center">
              <div className="success-icon mb-3">
                <i className="fas fa-check-circle"></i>
              </div>
              <h2 className="fw-bold mb-2">Order Placed Successfully!</h2>
              <p className="mb-0 text-white-50">
                Thank you for your purchase. Your order has been confirmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {order && Object.keys(order).length > 0 ? (
            <section className="py-4">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    {/* Order Summary Card */}
                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-header bg-white border-0 py-3">
                        <h5 className="mb-0 fw-bold">
                          <i className="fas fa-receipt me-2 text-primary"></i>
                          Order Summary
                        </h5>
                      </div>
                      <div className="card-body p-4">
                        {/* Order Details */}
                        <div className="order-info-grid mb-4">
                          <div className="info-item">
                            <label>Order ID</label>
                            <p className="order-id">
                              #{order._id?.slice(-8).toUpperCase()}
                            </p>
                          </div>
                          <div className="info-item">
                            <label>Customer Name</label>
                            <p>{order.name}</p>
                          </div>
                          <div className="info-item">
                            <label>Email</label>
                            <p>{order.email}</p>
                          </div>
                          <div className="info-item">
                            <label>Mobile</label>
                            <p>{order.mobile}</p>
                          </div>
                          <div className="info-item">
                            <label>Order Date</label>
                            <p>
                              {new Date(
                                order.createdAt || ""
                              ).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="info-item">
                            <label>Payment Status</label>
                            <span className="badge bg-success">Paid</span>
                          </div>
                        </div>

                        {/* Order Items Table */}
                        <h6 className="mb-3 fw-bold">
                          <i className="fas fa-box me-2"></i>
                          Order Items
                        </h6>
                        <div className="table-responsive">
                          <table className="table order-items-table">
                            <thead>
                              <tr>
                                <th style={{ width: "60px" }}>SNO</th>
                                <th>Item Name</th>
                                <th>Brand</th>
                                <th
                                  style={{ width: "100px" }}
                                  className="text-center"
                                >
                                  Qty
                                </th>
                                <th
                                  style={{ width: "120px" }}
                                  className="text-end"
                                >
                                  Price
                                </th>
                                <th
                                  style={{ width: "120px" }}
                                  className="text-end"
                                >
                                  Subtotal
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.items?.map((item, index) => (
                                <tr key={item._id || index}>
                                  <td>{index + 1}</td>
                                  <td className="item-name">{item.name}</td>
                                  <td>{item.brand}</td>
                                  <td className="text-center">
                                    <span className="qty-badge">
                                      {item.qty}
                                    </span>
                                  </td>
                                  <td className="text-end">
                                    ₹{Number(item.price).toFixed(2)}
                                  </td>
                                  <td className="text-end fw-bold">
                                    ₹{(item.price * item.qty).toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr className="subtotal-row">
                                <td colSpan={5} className="text-end">
                                  Subtotal:
                                </td>
                                <td className="text-end fw-bold">
                                  ₹{Number(order.total).toFixed(2)}
                                </td>
                              </tr>
                              <tr className="tax-row">
                                <td colSpan={5} className="text-end">
                                  Tax (GST 18%):
                                </td>
                                <td className="text-end fw-bold">
                                  ₹{Number(order.tax).toFixed(2)}
                                </td>
                              </tr>
                              <tr className="total-row">
                                <td colSpan={5} className="text-end">
                                  <strong>Grand Total:</strong>
                                </td>
                                <td className="text-end">
                                  <strong className="total-amount">
                                    ₹
                                    {(
                                      Number(order.tax) + Number(order.total)
                                    ).toFixed(2)}
                                  </strong>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>

                        {/* Delivery Notice */}
                        <div className="delivery-notice">
                          <i className="fas fa-shipping-fast me-2"></i>
                          <div>
                            <strong>Estimated Delivery:</strong>
                            <p className="mb-0">
                              Your order will be delivered within 3-5 business
                              days
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                          <button onClick={takePrint} className="btn-print">
                            <i className="fas fa-print me-2"></i>
                            Print Receipt
                          </button>
                          <Link
                            to="/"
                            onClick={clickDone}
                            className="btn-continue"
                          >
                            <i className="fas fa-shopping-bag me-2"></i>
                            Continue Shopping
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Thank You Message */}
                    <div className="thank-you-card">
                      <i className="fas fa-heart text-danger me-2"></i>
                      Thank you for shopping with us! We appreciate your
                      business.
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "100px" }} />
            </section>
          ) : (
            <section className="empty-order-section">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    <div className="empty-order-box">
                      <div className="empty-order-icon">
                        <i className="fas fa-receipt"></i>
                      </div>
                      <h3 className="empty-order-title">No Order Found</h3>
                      <p className="empty-order-text">
                        It looks like you haven't placed an order yet.
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
        </>
      )}
    </>
  );
};

export default OrderSuccess;
