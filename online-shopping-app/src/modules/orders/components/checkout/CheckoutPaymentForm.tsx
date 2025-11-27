/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { CartUtil } from "../../../../util/CartUtil";
import { makeStripePayment } from "../../../../redux/orders/order.slice";
import type { AppDispatch } from "../../../../redux/store";

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
  dispatch
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // Step 1: Create PaymentIntent from backend
    const response = await fetch("http://localhost:5000/payment/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalAmount })
    });

    const { clientSecret } = await response.json();

    // Step 2: Confirm card payment
    const confirm = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card }
    });

    if (confirm.paymentIntent?.status === "succeeded") {
      const items = cartItems.map(c => ({
        name: c.name,
        brand: c.brand,
        price: c.price,
        qty: c.qty
      }));

      const order = {
        items,
        tax: CartUtil.calcTax(cartItems),
        total: CartUtil.calcTotal(cartItems)
      };

      dispatch(makeStripePayment({ order, navigate }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="form-control p-3" />
      <button type="submit" className="btn btn-dark mt-3" disabled={!stripe}>
        Pay ₹{totalAmount / 100}
      </button>
    </form>
  );
};

export default CheckoutPaymentForm;
