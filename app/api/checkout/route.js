import axios from 'axios';
import { NextResponse } from 'next/server';

const baseUrl='https://sandbox.azampay.co.tz'// app/api/checkout/route.js

export async function POST(request) {
  const { accountNumber, amount, currency, externalId, provider, additionalProperties, token, apiKey } = await request.json();

  const data = {
    accountNumber,
    amount,
    currency,
    externalId,
    provider,
    additionalProperties,
  };

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Ensure token is provided
    'X-API-Key': 'API-KEY' // Ensure API key is provided
  };

  try {
    const response = await axios.post(`${baseUrl}/azampay/mno/checkout`, data, { headers });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return NextResponse.json({
      error: error.response?.data?.message || 'Internal Server Error',
    }, { status: error.response?.status || 500 });
  }
}
