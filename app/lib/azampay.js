import fetch from 'node-fetch';

export const generateToken = async () => {
  try {
    const response = await fetch('https://authenticator-sandbox.azampay.co.tz/AppRegistration/GenerateToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        appName: process.env.APP_NAME,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
      })
    });

    if (!response.ok) {
      throw new Error(`Error generating token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('generateToken error:', error);
    throw error;
  }
};

export const payBill = async (paymentProvider, token, amount) => {
  try {
    const response = await fetch(`https://sandbox.azampay.co.tz/api/v1/OpenApi/${paymentProvider}/paybill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-API-KEY': process.env.API_KEY
      },
      body: JSON.stringify({
        version: 1,
        method: null,
        data: {
          amount: amount
        },
        checksum: null
      })
    });

    if (!response.ok) {
      throw new Error(`Error processing payment: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('payBill error:', error);
    throw error;
  }
};
