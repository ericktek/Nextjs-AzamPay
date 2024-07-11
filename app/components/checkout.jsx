'use client'
import { useState } from 'react';
import axios from 'axios';

export default function Checkout() {
  const [amount, setAmount] = useState('');
  const [paymentProvider, setPaymentProvider] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleTokenGeneration = async () => {
    try {
      const response = await axios.post('/api/generateToken');
      setToken(response.data.data.accessToken);
      setMessage('Token generated successfully');
      console.log('Access Token:', response.data.data.accessToken); // Log the accessToken for verification
  
    } catch (error) {
      console.log('Error fetching token:', error.message); // Log error message for debugging
      setMessage(`Error: ${error.message}`);
    }
  };
  

  const handleCheckout = async () => {
    if (!token) {
      setMessage('Please generate a token first');
      return;
    }

    try {
      const response = await axios.post('/api/checkout', { token, paymentProvider, amount });
      setMessage(`Success: ${response.data.message}`);
      console.log(response);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className='flex pt-52 flex-col space-y-6 justify-center items-center'>
      <h1>Azampay Checkout</h1>
      <button onClick={handleTokenGeneration}>Generate Token</button>
      <div>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Payment Provider:
          <input type="text" value={paymentProvider} onChange={(e) => setPaymentProvider(e.target.value)} />
        </label>
      </div>
      <button onClick={handleCheckout}>Checkout</button>
      {message && <p>{message}</p>}
    </div>
  );
}
