import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
    try {
        const { amount } = await req.json();

        // Ensure keys are present
        const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
        const key_secret = process.env.RAZORPAY_KEY_SECRET;

        if (!key_id || !key_secret) {
            console.warn("Razorpay keys are missing! Check your environment variables.");
            return NextResponse.json(
                { error: "Payment gateway is not fully configured. Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET." },
                { status: 500 }
            );
        }

        const razorpay = new Razorpay({
            key_id: key_id,
            key_secret: key_secret,
        });

        // Create an order
        const options = {
            amount: amount, // amount in the smallest currency unit (e.g. paisa for INR)
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Return order ID and the key to the frontend
        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    } catch (error: any) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
