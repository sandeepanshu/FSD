import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchAllProducts } from "../../redux/bigbasket/big-basket.slice";

const ProductList: React.FC = () => {
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
          <h3 className="text-success">Product List</h3>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            {products.map((product) => (
              <div className="col-md-3" key={product._id}>
                <div className="card shadow-sm mb-3">
                  <img
                    src={product.image}
                    alt=""
                    className="card-img-top p-3"
                    height="150"
                  />
                  <div className="card-body">
                    <p className="fw-bold">{product.name}</p>
                    <p>₹ {product.price.toFixed(2)}</p>
                    <p>{product.qty} Kgs</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {products.length === 0 && (
            <p className="text-center text-success fw-bold">
              No Products Found
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default ProductList;
