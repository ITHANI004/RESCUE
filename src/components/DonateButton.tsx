"use client"
import { useState } from 'react';
import { toast } from 'sonner';

export function DonateButton() {
    const [isLoading, setIsLoading] = useState(false);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (document.getElementById('razorpay-js')) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.id = 'razorpay-js';
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleDonate = async () => {
        setIsLoading(true);
        const res = await loadRazorpayScript();

        if (!res) {
            toast.error("Razorpay SDK failed to load. Are you online?");
            setIsLoading(false);
            return;
        }

        try {
            // Ask user for amount or hardcode
            // Amount in Paisa (e.g., to donate 150 INR, send 15000)
            const donationAmount = prompt("Enter donation amount (INR)", "100");
            
            if (!donationAmount || isNaN(Number(donationAmount)) || Number(donationAmount) <= 0) {
                toast.error("Invalid amount entered.");
                setIsLoading(false);
                return;
            }

            const amountInPaisa = Math.floor(Number(donationAmount) * 100);

            const response = await fetch("/api/razorpay", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: amountInPaisa }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Failed to initialize payment. Check API keys.");
                setIsLoading(false);
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", 
                amount: data.amount,
                currency: data.currency,
                name: "RESQ Project",
                description: "Support our disaster management initiative.",
                order_id: data.id,
                handler: function (response: any) {
                    toast.success("Payment successful! Thank you for your support.");
                    // You could verify signature here against backend
                    console.log("Payment ID:", response.razorpay_payment_id);
                    console.log("Order ID:", response.razorpay_order_id);
                },
                prefill: {
                    name: "Kind Donor",
                    email: "donor@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3B82F6" // matches the blue-500 from the RESQ theme
                }
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.on('payment.failed', function (response: any){
                    toast.error("Payment failed. Please try again.");
                    console.error("Payment error:", response.error.description);
            });
            paymentObject.open();

        } catch (error) {
            toast.error("Something went wrong with the payment.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button 
            onClick={handleDonate}
            disabled={isLoading}
            className="group flex items-center gap-3 px-6 py-2 border border-emerald-500/30 hover:border-emerald-500 transition-all duration-700 bg-emerald-500/10 hover:bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] disabled:opacity-50 cursor-pointer"
        >
            <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${isLoading ? 'animate-ping' : 'animate-pulse'}`} />
            <span className="text-[10px] tracking-[0.3em] text-emerald-400 uppercase font-mono mt-0.5">
                {isLoading ? "CONNECTING..." : "SUPPORT_MISSION"}
            </span>
        </button>
    );
}
