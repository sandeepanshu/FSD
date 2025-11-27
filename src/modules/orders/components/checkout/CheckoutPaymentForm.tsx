/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { CartUtil } from "../../../../util/CartUtil";
import { makeStripePayment } from "../../../../redux/orders/order.slice";
import type { AppDispatch, RootState } from "../../../../redux/store";
import "./CheckoutPaymentForm.css";

interface Props {
  cartItems: any[];
  totalAmount: number;
  navigate: any;
  dispatch: AppDispatch;
}

const CheckoutPaymentForm: React.FC<Props> = ({
  cartItems,
  totalAmount,
  navigate,
  dispatch,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSelector((state: RootState) => state.users);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      setLoading(true);

      const token = localStorage.getItem(import.meta.env.VITE_AUTH_TOKEN_KEY);
      if (!token) throw new Error("Authentication token not found. Please login again.");

      // 1️⃣ Create PaymentIntent
      const res = await fetch("http://localhost:5000/api/payments/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ amount: totalAmount }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to initiate payment");
      }

      const data = await res.json();

      // 2️⃣ Confirm payment on Stripe
      const confirm = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card },
      });

      if (confirm.error) throw new Error(confirm.error.message);

      // 3️⃣ On success → verify payment on backend + place order
      if (confirm.paymentIntent?.status === "succeeded") {
        const items = cartItems.map((c) => ({
          name: c.name,
          brand: c.brand,
          price: c.price,
          qty: c.qty,
        }));

        const order = {
          items,
          tax: CartUtil.calcTax(cartItems),
          total: CartUtil.calcTotal(cartItems),
          paymentMethod: "card",
          paymentStatus: "completed",
        };

        dispatch(
          makeStripePayment({
            paymentIntentId: confirm.paymentIntent.id,
            order,
          })
        ).then(() => {
          navigate("/orders/success");
        });
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Payment failed");
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <label className="form-label">Card Details</label>

      <div className="card-element-box">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#333",
                "::placeholder": { color: "#999" },
              },
              invalid: { color: "#e63946" },
            },
          }}
        />
      </div>

      {errorMsg && <p className="error-text">{errorMsg}</p>}

      <button type="submit" className="pay-btn" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay ₹${totalAmount / 100}`}
      </button>
    </form>
  );
};

export default CheckoutPaymentForm;
