import { NextResponse } from 'next/server';

export async function POST(request) {
  const { accountNumber, amount, currency, externalId, provider, additionalProperties } = await request.json();

  const apiUrl = `${process.env.AZAMPAY_BASE_URL}/azampay/mno/checkout`;
  const token = process.env.AZAMPAY_TOKEN;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      accountNumber,
      amount,
      currency,
      externalId,
      provider,
      additionalProperties
    })
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to process payment' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
