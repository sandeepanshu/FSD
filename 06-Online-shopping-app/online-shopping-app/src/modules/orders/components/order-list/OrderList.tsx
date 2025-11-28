import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../layout/components/spinner/Spinner";
import { getAllOrders } from "../../../../redux/orders/order.slice";
import { type RootState, type AppDispatch } from "../../../../redux/store";
import "./OrderList.css";

const OrderList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, orderList } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <>
      {/* Premium Gradient Header */}
      <section className="orders-header">
        <div className="header-content">
          <h1 className="orders-title">
            <i className="fas fa-list-ul"></i> Orders List
          </h1>
          <p className="orders-subtitle">
            Track all customer orders in one place
          </p>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {orderList && orderList.length > 0 ? (
            <div className="orders-container">
              <div className="table-wrapper">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orderList.map((order) => (
                      <tr key={order._id}>
                        <td>#{order._id?.slice(-6)}</td>
                        <td>{order.name}</td>
                        <td>{order.email}</td>
                        <td>{order.mobile}</td>

                        <td>
                          <ul className="item-list">
                            {order.items.map((item, idx) => (
                              <li key={item._id || idx}>
                                <strong>{item.name}</strong>  
                                <span>Qty: {item.qty}</span>
                                <span>Price: ₹{item.price}</span>
                              </li>
                            ))}
                          </ul>
                        </td>

                        <td>
                          ₹{(Number(order.total) + Number(order.tax)).toFixed(2)}
                        </td>

                        <td>
                          {new Date(order.createdAt || "").toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <i className="fas fa-box-open"></i>
              <h3>No Orders Found</h3>
              <p>Orders will appear here once customers start placing them.</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OrderList;
