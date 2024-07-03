// app/api/process-payment/route.js

import { generateToken, payBill } from "@/app/lib/azampay";

export async function POST(req) {
  try {
    const { amount, paymentProvider } = await req.json();

    const token = await generateToken();
    const paymentResult = await payBill(paymentProvider, token, amount);

    if (paymentResult.success) {
      return new Response(JSON.stringify({ message: 'Payment processed successfully!', data: paymentResult }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ message: 'Payment failed', data: paymentResult }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('POST /api/process-payment error:', error);
    return new Response(JSON.stringify({ message: 'An error occurred', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
