import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../layout/components/spinner/Spinner";
import { getAllOrders } from "../../../../redux/orders/order.slice";
import { type RootState, type AppDispatch } from "../../../../redux/store";

const OrderList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, orderList } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <React.Fragment>
      <section className="p-3 bg-brown">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 fw-bold">
                <i className="fa fa-list me-2" />
                Orders List
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {orderList && orderList.length > 0 ? (
            <div className="container-fluid mt-3">
              <div className="row">
                <div className="col">
                  <table className="table table-hover table-striped bg-brains text-center">
                    <thead className="bg-dark text-white">
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
                          <td>{order._id?.slice(-5)}</td>
                          <td>{order.name}</td>
                          <td>{order.email}</td>
                          <td>{order.mobile}</td>
                          <td>
                            <ul className="list-group text-start">
                              {order.items.map((item, idx) => (
                                <li
                                  key={item._id || idx}
                                  className="list-group-item"
                                >
                                  Name: {item.name} <br />
                                  Qty: {item.qty} <br />
                                  Price: ₹{item.price}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td>
                            ₹
                            {(Number(order.total) + Number(order.tax)).toFixed(
                              2
                            )}
                          </td>
                          <td>
                            {new Date(
                              order.createdAt || ""
                            ).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center mt-5">
              <p className="h3 text-muted">
                ------------ No Orders Found ----------
              </p>
            </div>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default OrderList;
