import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // @ts-ignore
  apiVersion: null, // As per blueprint: "Leave the API version argument empty"
  typescript: true,
});
