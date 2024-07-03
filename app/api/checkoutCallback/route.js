import { NextResponse } from 'next/server';

export async function POST(request) {


  try {
    const { method, headers } = request;

    if (method !== 'POST') {
      return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    // Get the token and API key from your environment variables or configuration
    const TOKEN = process.env.TOKEN;
    const API_KEY = process.env.CLIENT_SECRETE_KEY;
    const APP_NAME = process.env.APP_NAME;
    const CLIENT_ID = process.env.CLIENT_ID;

    // Verify the request's authenticity
    if (!headers.get('authorization') || headers.get('authorization') !== `Bearer ${APP_NAME}`) {
      console.error('Unauthorized: Invalid authorization token');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (!headers.get('x-api-key') || headers.get('x-api-key') !== API_KEY) {
      console.error('Unauthorized: Invalid API key');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Process the callback data
    const data = await request.json();
    console.log('Callback data:', data);

    // Handle the callback data (e.g., update the order status in your database)
    // Respond to the callback
    return NextResponse.json({ message: 'Callback received successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing callback:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
