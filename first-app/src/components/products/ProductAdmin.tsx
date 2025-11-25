import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  deleteProduct,
  fetchAllProducts,
} from "../../redux/bigbasket/big-basket.slice";

const ProductAdmin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading } = useSelector(
    (state: RootState) => state.bigBasket
  );

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <section className="mt-3">
        <div className="container">
          <h3 className="text-success">Product Admin</h3>
          <Link to="/products/create" className="btn btn-success btn-sm">
            Create Product
          </Link>
        </div>
      </section>

      <section>
        <div className="container">
          <table className="table table-hover table-striped text-center">
            <thead className="bg-dark text-success">
              <tr>
                <th>SNO</th>
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td>{p._id?.slice(-5)}</td>
                  <td>
                    <img src={p.image} alt="" width="50" height="50" />
                  </td>
                  <td>{p.name}</td>
                  <td>₹ {p.price.toFixed(2)}</td>
                  <td>{p.qty}</td>

                  <td>
                    <Link
                      to={`/products/${p._id}`}
                      className="btn btn-secondary btn-sm me-1"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => dispatch(deleteProduct(p._id!))}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-success">
                    NO Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ProductAdmin;
