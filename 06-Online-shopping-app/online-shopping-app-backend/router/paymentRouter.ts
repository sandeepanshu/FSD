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

interface UPIPaymentBody {
  upiId: string;
  amount: number;
  email: string;
  userName: string;
}

interface NetBankingPaymentBody {
  bankCode: string;
  amount: number;
  email: string;
  userName: string;
}

interface WalletPaymentBody {
  walletType: string;
  amount: number;
  email: string;
  userName: string;
}

interface CODPaymentBody {
  amount: number;
  email: string;
  userName: string;
  items: any[];
  tax: number;
  total: number;
}

// ========================================
// STRIPE CARD PAYMENT (EXISTING)
// ========================================
paymentRouter.post(
  "/checkout",
  verifyToken,
  cors(),
  async (request, response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2023-10-16",
    });

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

        response.status(200).json({
          msg: "payment is success",
          chargeId: charge.id,
          status: charge.status,
        });
      } else {
        response.status(400).json({
          errors: [
            {
              msg: `Invalid Stripe token type: ${paymentBody.stripeTokenType}`,
            },
          ],
        });
      }
    } catch (error: any) {
      console.error("Stripe error:", error);
      response.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

// ========================================
// CREATE PAYMENT INTENT (for modern card flow)
// ========================================
paymentRouter.post(
  "/create-intent",
  verifyToken,
  cors(),
  async (request, response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2023-10-16",
    });

    try {
      const { amount } = request.body;

      if (!amount || amount <= 0) {
        return response.status(400).json({
          error: "Invalid amount",
        });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount),
        currency: "inr",
        payment_method_types: ["card"],
        metadata: { orderId: v4() },
      });

      response.status(200).json({
        clientSecret: paymentIntent.client_secret,
        success: true,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error: any) {
      console.error("Payment intent error:", error);
      response.status(500).json({
        error: error.message || "Failed to create payment intent",
      });
    }
  }
);

// ========================================
// UPI PAYMENT
// ========================================
paymentRouter.post("/upi", verifyToken, cors(), async (request, response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
  });

  try {
    const { upiId, amount, email, userName }: UPIPaymentBody = request.body;

    if (!upiId || !amount) {
      return response.status(400).json({
        success: false,
        message: "UPI ID and amount are required",
      });
    }

    // Validate UPI format
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;
    if (!upiRegex.test(upiId)) {
      return response.status(400).json({
        success: false,
        message: "Invalid UPI ID format",
      });
    }

    // Create customer
    const customer = await stripe.customers.create({
      name: userName,
      email: email,
      description: `UPI Payment - ${upiId}`,
    });

    // Create payment intent with UPI
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "inr",
      payment_method_types: ["upi"],
      customer: customer.id,
      metadata: {
        paymentMethod: "upi",
        upiId: upiId,
        orderId: v4(),
      },
    });

    response.status(200).json({
      success: true,
      message: "UPI payment initiated",
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      upiId: upiId,
    });
  } catch (error: any) {
    console.error("UPI payment error:", error);
    response.status(500).json({
      success: false,
      message: error.message || "UPI payment failed",
    });
  }
});

// ========================================
// NET BANKING PAYMENT
// ========================================
paymentRouter.post(
  "/netbanking",
  verifyToken,
  cors(),
  async (request, response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2023-10-16",
    });

    try {
      const { bankCode, amount, email, userName }: NetBankingPaymentBody =
        request.body;

      if (!bankCode || !amount) {
        return response.status(400).json({
          success: false,
          message: "Bank code and amount are required",
        });
      }

      const validBanks = [
        "HDFC",
        "ICIC",
        "SBI",
        "AXIS",
        "KUVS",
        "INDB",
        "UTIB",
        "UBIN",
      ];
      if (!validBanks.includes(bankCode)) {
        return response.status(400).json({
          success: false,
          message: "Invalid bank code",
        });
      }

      // Create customer
      const customer = await stripe.customers.create({
        name: userName,
        email: email,
        description: `Net Banking - ${bankCode}`,
      });

      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount),
        currency: "inr",
        payment_method_types: ["ideal"],
        customer: customer.id,
        metadata: {
          paymentMethod: "netbanking",
          bankCode: bankCode,
          orderId: v4(),
        },
      });

      response.status(200).json({
        success: true,
        message: "Net Banking payment initiated",
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        bankCode: bankCode,
      });
    } catch (error: any) {
      console.error("Net banking error:", error);
      response.status(500).json({
        success: false,
        message: error.message || "Net banking payment failed",
      });
    }
  }
);

// ========================================
// WALLET PAYMENT
// ========================================
paymentRouter.post(
  "/wallet",
  verifyToken,
  cors(),
  async (request, response) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2023-10-16",
    });

    try {
      const { walletType, amount, email, userName }: WalletPaymentBody =
        request.body;

      if (!walletType || !amount) {
        return response.status(400).json({
          success: false,
          message: "Wallet type and amount are required",
        });
      }

      const validWallets = ["PAYTM", "GOOGLEPAY", "PHONEPE", "AMAZONPAY"];
      if (!validWallets.includes(walletType)) {
        return response.status(400).json({
          success: false,
          message: "Invalid wallet type",
        });
      }

      // Create customer
      const customer = await stripe.customers.create({
        name: userName,
        email: email,
        description: `Wallet - ${walletType}`,
      });

      // Create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount),
        currency: "inr",
        payment_method_types: ["card_present"],
        customer: customer.id,
        metadata: {
          paymentMethod: "wallet",
          walletType: walletType,
          orderId: v4(),
        },
      });

      response.status(200).json({
        success: true,
        message: `${walletType} payment initiated`,
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        walletType: walletType,
      });
    } catch (error: any) {
      console.error("Wallet payment error:", error);
      response.status(500).json({
        success: false,
        message: error.message || "Wallet payment failed",
      });
    }
  }
);

// ========================================
// CASH ON DELIVERY (COD)
// ========================================
paymentRouter.post("/cod", verifyToken, cors(), async (request, response) => {
  try {
    const { amount, email, userName, items, tax, total }: CODPaymentBody =
      request.body;

    if (!amount || !email) {
      return response.status(400).json({
        success: false,
        message: "Amount and email are required",
      });
    }

    // For COD, just acknowledge the order
    // Payment will be collected at delivery
    const orderId = v4();

    response.status(200).json({
      success: true,
      message: "COD order created successfully",
      paymentMethod: "cod",
      paymentStatus: "pending",
      amount: amount,
      orderId: orderId,
      items: items,
      tax: tax,
      total: total,
      customerEmail: email,
      customerName: userName,
    });
  } catch (error: any) {
    console.error("COD order error:", error);
    response.status(500).json({
      success: false,
      message: error.message || "COD order creation failed",
    });
  }
});

// ========================================
// VERIFY PAYMENT
// ========================================
paymentRouter.post("/verify-payment", verifyToken, cors(), async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });

    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: "Payment Intent ID is required",
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return res.status(200).json({
      success: paymentIntent.status === "succeeded",
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      paymentIntentId: paymentIntent.id,
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
});

export default paymentRouter;
