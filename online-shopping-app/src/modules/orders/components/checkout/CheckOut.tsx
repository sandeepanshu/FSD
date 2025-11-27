import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPaymentForm from "./CheckoutPaymentForm";
import { CartUtil } from "../../../../util/CartUtil";
import type { RootState } from "../../../../redux/store";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(stripeKey);

const CheckOut: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.users);
  const { cartItems } = useSelector((state: RootState) => state.orders);

  const totalAmount = CartUtil.calcGrandTotal(cartItems) * 100;

  if (!stripeKey) {
    return (
      <div className="alert alert-danger text-center">
        Stripe API key missing in .env file
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Checkout</h2>

      <div className="row">
        {/* Billing Section */}
        <div className="col-md-8">
          <h4>Billing Details</h4>
          {user?.address && (
            <ul className="list-group">
              {Object.entries(user.address).map(([key, val]) => (
                <li key={key} className="list-group-item bg-brown">
                  <small>{key} : {val}</small>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Payment Section */}
        <div className="col-md-4">
          <h4>Pay with Card</h4>
          <Elements stripe={stripePromise}>
            <CheckoutPaymentForm
              cartItems={cartItems}
              totalAmount={totalAmount}
              navigate={navigate}
              dispatch={dispatch}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
