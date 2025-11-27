import express from "express";
import verifyToken from "../middlewares/TokenVerifier.ts";
import cors from "cors";
import { v4 } from "uuid";
import Stripe from "stripe";

const paymentRouter = express.Router();

interface PaymentBody {
  product: {
    name: string;
    amount: number;
    currency: string;
  };
  customer: {
    name: string;
    address: {
      line1: string;
      postal_code: string;
      city: string;
      state: string;
      country: string;
    };
  };
  description: string;
  email: string;
  source: string;
  stripeTokenType: string;
}

// --------------------------------------------
// PAYMENT ROUTE
// --------------------------------------------
paymentRouter.post(
  "/checkout",
  verifyToken,
  cors(),
  async (request, response) => {
    console.log("---- Checkout Route ----");

    // 🔥 Stripe MUST be initialized inside the route AFTER dotenv loads
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2023-10-16",
    });

    console.log("Stripe Key inside route =", process.env.STRIPE_SECRET_KEY);

    try {
      const paymentBody: PaymentBody = request.body;

      const customer = await stripe.customers.create({
        name: paymentBody.customer.name,
        address: paymentBody.customer.address,
        description: paymentBody.description,
        email: paymentBody.email,
        source: paymentBody.source,
      });

      if (paymentBody.stripeTokenType === "card") {
        const idempotencyKey = v4();

        const charge = await stripe.charges.create(
          {
            amount: paymentBody.product.amount,
            currency: paymentBody.product.currency,
            customer: customer.id,
            description: paymentBody.description,
          },
          { idempotencyKey }
        );

        console.log(charge);
      } else {
        console.error(
          `Invalid Stripe token type: ${paymentBody.stripeTokenType}`
        );
      }

      response.status(200).json({ msg: "payment is success" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ errors: [{ msg: error }] });
    }
  }
);

export default paymentRouter;
