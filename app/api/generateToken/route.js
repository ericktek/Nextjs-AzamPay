import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { NEXT_PUBLIC_AZAMPAY_AUTH_URL, NEXT_PUBLIC_AZAMPAY_CLIENT_ID, NEXT_PUBLIC_AZAMPAY_CLIENT_SECRET } = process.env;

  try {
    const response = await axios.post(NEXT_PUBLIC_AZAMPAY_AUTH_URL, {
      appName: 'e-app',
      clientId: NEXT_PUBLIC_AZAMPAY_CLIENT_ID,
      clientSecret: NEXT_PUBLIC_AZAMPAY_CLIENT_SECRET,
    });
    console.log(response.data.data.accessToken);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error occurred during POST request:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
