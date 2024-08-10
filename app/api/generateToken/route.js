import axios from 'axios';
import { NextResponse } from 'next/server';

const appName = process.env.APP_NAME;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const baseUrl = 'https://authenticator-sandbox.azampay.co.tz';

export async function POST(request) {

  try {
    const response = await axios.post(`${baseUrl}/AppRegistration/GenerateToken`, {
      appName,
      clientId,
      clientSecret,
    });

    if (response.status === 200) {
      return NextResponse.json(response.data, { status: 200 });
    } else {
      return NextResponse.json({ error: response.data.message || 'Token generation failed' }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ error: error.response?.data?.message || 'Internal Server Error' }, { status: 500 });
  }
}
