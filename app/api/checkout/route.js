// /app/api/checkout/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { accountNumber, amount, currency, externalId, provider, additionalProperties } = await request.json();

    // Replace with actual Mno Checkout endpoint URL
    const MNO_CHECKOUT_URL = 'https://sandbox.azampay.co.tz/azampay/mno/checkout';

    // Send request to Mno Checkout API
    const response = await axios.post(MNO_CHECKOUT_URL, {
      accountNumber,
      amount,
      currency,
      externalId,
      provider,
      additionalProperties
    }, {
      headers: {
        Authorization: `Bearer ${process.env.TOKEN}`, // Use a valid JWT token
        'Content-Type': 'application/json'
      }
    });

    // Return the response from the Mno Checkout API
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error processing payment:', error.message);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}
