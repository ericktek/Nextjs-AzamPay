import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { token, paymentProvider, amount } = await request.json();
  const { NEXT_PUBLIC_AZAMPAY_CHECKOUT_URL, NEXT_PUBLIC_AZAMPAY_API_KEY } = process.env;

  try {
    const response = await axios.post(
      NEXT_PUBLIC_AZAMPAY_CHECKOUT_URL.replace('{paymentProvider}', paymentProvider),
      {
        version: 1,
        method: null,
        data: { amount },
        checksum: null
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'X-API-Key': NEXT_PUBLIC_AZAMPAY_API_KEY
        }
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
