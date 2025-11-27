import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../layout/components/spinner/Spinner";
import { getProduct } from "../../../../redux/products/product.slice";
import { addToCart } from "../../../../redux/orders/order.slice";
import type { RootState, AppDispatch } from "../../../../redux/store";

type URLParamsType = {
  productId?: string;
};

const ProductDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { productId } = useParams<URLParamsType>();
  const [qty, setQty] = useState<string>("");

  // get the product data from Redux Store
  const { loading, product, errorMessage } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (productId) dispatch(getProduct(productId));
  }, [productId, dispatch]);

  const updateQtyInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQty(event.target.value);
  };

  const submitAddToCart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!product) return;
    dispatch(addToCart({ product, qty: Number(qty) }));
    // Optionally navigate somewhere after adding to cart
    navigate("/orders/cart");
  };

  if (loading) return <Spinner />;

  if (errorMessage) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{errorMessage}</div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <section className="bg-brown text-dark p-2">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 font-weight-bold">Selected Product</p>
            </div>
          </div>
        </div>
      </section>
      {product && (
        <section>
          <div className="container mt-3">
            <div className="row align-items-center">
              <div className="col-md-5 text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="img-fluid"
                />
              </div>
              <div className="col-md-7 text-left">
                <p className="h3">
                  NAME : <b>{product.name}</b>
                </p>
                <p className="h3">
                  Brand : <b>{product.brand}</b>
                </p>
                <p className="h5">
                  Price :{" "}
                  <b className="text-danger">
                    &#8377; {product.price.toFixed(2)}
                  </b>
                </p>
                <form onSubmit={submitAddToCart}>
                  <div className="form-group">
                    <select
                      required
                      value={qty}
                      onChange={updateQtyInput}
                      className="form-control"
                    >
                      <option value="">Select Qty</option>
                      {[1, 2, 3, 4, 5].map((x) => (
                        <option value={x} key={x}>
                          {x}
                        </option>
                      ))}
                    </select>
                    <input
                      type="submit"
                      className="btn btn-brown btn-sm text-dark"
                      value="add to Cart"
                    />
                  </div>
                </form>
                <p>{product.usage}</p>
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
};

export default ProductDetails;
