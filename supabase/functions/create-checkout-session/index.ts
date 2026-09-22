// supabase/functions/create-checkout-session/index.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12";

// Initialize Supabase client with service role (server‑side) credentials
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false },
});

// Initialize Stripe with secret key
const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY") ?? "";
const stripe = new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { "Content-Type": "application/json" } });
  }

  const { cartItems, form } = await req.json();
  if (!Array.isArray(cartItems) || !form) {
    return new Response(JSON.stringify({ error: "Invalid payload" }), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  // Fetch authoritative prices for the products in the cart
  const productIds = cartItems.map((i: any) => i.id);
  const { data: products, error: prodError } = await supabase
    .from("products")
    .select("id,price,name")
    .in("id", productIds);

  if (prodError) {
    console.error("Supabase product fetch error:", prodError);
    return new Response(JSON.stringify({ error: "Failed to fetch product data" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }

  // Build Stripe line items (price in cents)
  const lineItems = cartItems.map((item: any) => {
    const product = (products as any[])?.find((p) => p.id === item.id);
    if (!product) {
      throw new Error(`Product ${item.id} not found`);
    }
    return {
      price_data: {
        currency: "usd",
        product_data: { name: product.name },
        unit_amount: Math.round((product.price as number) * 100), // convert to cents
      },
      quantity: item.quantity,
    };
  });

  // Create a Stripe Checkout Session
  const successUrl = `${Deno.env.get("VITE_APP_URL")}/thank-you?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${Deno.env.get("VITE_APP_URL")}/checkout`;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        // Store basic order info to be used later (optional)
        name: form.name,
        email: form.email,
        address: form.address,
        city: form.city,
        zip: form.zip,
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Stripe error:", e);
    return new Response(JSON.stringify({ error: "Failed to create Stripe session" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
});
