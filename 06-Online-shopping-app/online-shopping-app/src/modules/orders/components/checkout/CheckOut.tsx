import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPaymentForm from "./CheckoutPaymentForm";

import { CartUtil } from "../../../../util/CartUtil";
import type { RootState } from "../../../../redux/store";
import "./CheckOut.css";
import UPIPaymentForm from "./UPIPaymentForm";
import NetBankingPaymentForm from "./NetBankingPaymentForm";
import WalletPaymentForm from "./WalletPaymentForm";
import CODPaymentForm from "./CODPaymentForm";

const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(stripeKey);

type PaymentMethod = "card" | "upi" | "netbanking" | "wallet" | "cod";

const CheckOut: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("card");

  const { user } = useSelector((state: RootState) => state.users);
  const { cartItems } = useSelector((state: RootState) => state.orders);

  const totalAmount = CartUtil.calcGrandTotal(cartItems) * 100;

  if (!stripeKey && selectedPayment === "card") {
    return (
      <div className="alert alert-danger text-center">
        Stripe API key missing in .env file
      </div>
    );
  }

  const paymentOptions: { value: PaymentMethod; label: string; icon: string }[] = [
    { value: "card", label: "Credit/Debit Card", icon: "💳" },
    { value: "upi", label: "UPI", icon: "📱" },
    { value: "netbanking", label: "Net Banking", icon: "🏦" },
    { value: "wallet", label: "Digital Wallet", icon: "👛" },
    { value: "cod", label: "Cash on Delivery", icon: "💵" }
  ];

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
          <h4>Payment Method</h4>

          {/* Payment Options */}
          <div className="payment-options mb-3">
            {paymentOptions.map((option) => (
              <label key={option.value} className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value={option.value}
                  checked={selectedPayment === option.value}
                  onChange={(e) => setSelectedPayment(e.target.value as PaymentMethod)}
                />
                <span className="payment-label">
                  {option.icon} {option.label}
                </span>
              </label>
            ))}
          </div>

          {/* Conditional Payment Forms */}
          {selectedPayment === "card" && (
            <Elements stripe={stripePromise}>
              <CheckoutPaymentForm
                cartItems={cartItems}
                totalAmount={totalAmount}
                navigate={navigate}
                dispatch={dispatch}
              />
            </Elements>
          )}

          {selectedPayment === "upi" && (
            <UPIPaymentForm
              cartItems={cartItems}
              totalAmount={totalAmount}
              navigate={navigate}
              dispatch={dispatch}
            />
          )}

          {selectedPayment === "netbanking" && (
            <NetBankingPaymentForm
              cartItems={cartItems}
              totalAmount={totalAmount}
              navigate={navigate}
              dispatch={dispatch}
            />
          )}

          {selectedPayment === "wallet" && (
            <WalletPaymentForm
              cartItems={cartItems}
              totalAmount={totalAmount}
              navigate={navigate}
              dispatch={dispatch}
            />
          )}

          {selectedPayment === "cod" && (
            <CODPaymentForm
              cartItems={cartItems}
              totalAmount={totalAmount}
              navigate={navigate}
              dispatch={dispatch}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckOut;