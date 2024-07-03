import axios from 'axios';

export async function POST(req, res) {
  const appName = process.env.APP_NAME;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRETE_KEY;


  try {
    const response = await axios.post('https://authenticator-sandbox.azampay.co.tz/AppRegistration/GenerateToken', {
      appName,
      clientId,
      clientSecret,
    });

    // Log the response data to understand its structure
    console.log('Response data:', response.data);

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    // Log the error
    console.error('Error:', error.response ? error.response.data : error.message);

    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
