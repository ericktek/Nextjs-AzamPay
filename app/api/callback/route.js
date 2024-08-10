import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const callbackData = await request.json(); // Parse the JSON body

    console.log('Callback data:', callbackData); // Log for debugging

    // Extract necessary details from callback data
    const { transactionId, status, message } = callbackData;

    // Process the callback data
    // Example: Update your database or notify users
    // await updateTransactionStatus(transactionId, status, message);

    return NextResponse.json({ message: 'Callback processed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error processing callback:', error);
    return NextResponse.json({ error: 'Failed to process callback' }, { status: 500 });
  }
}
