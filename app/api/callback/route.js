import { NextResponse } from 'next/server';

let callbackStatus = 'No callback received yet'; // Example status, use a real status tracking mechanism

export async function GET() {
  return NextResponse.json({ status: callbackStatus });
}

export async function POST(request) {
  try {
    const callbackData = await request.json();

    // Handle the callback data
    console.log('Received callback data:', callbackData);

    // Update the status based on the callback data
    callbackStatus = 'Callback processed successfully';

    return NextResponse.json({ message: 'Callback received successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error processing callback:', error);

    callbackStatus = 'Failed to process callback';

    return NextResponse.json({ error: 'Failed to process callback.' }, { status: 500 });
  }
}
