'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SuccessPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState('Processing payment...');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const query = new URLSearchParams(window.location.search);
        const paymentStatus = query.get('status');
        const message = paymentStatus === 'success' ? 'Payment was successful!' : 'Payment failed.';
        
        // Update status message based on payment status
        setStatus(message);

        // Prepare data to send to the callback endpoint
        const data = {
          msisdn: '0178823',
          amount: '2000',
          message: 'any message',
          utilityref: '1292-123',
          operator: 'Tigo',
          reference: '123-123',
          transactionstatus: paymentStatus || 'unknown', // Use the payment status from the query
          submerchantAcc: '01723113',
        };

        const headers = {
          'Content-Type': 'application/json',
        };

        // Send the data to the callback endpoint
        const response = await axios.post(`${BaseUrl}/api/v1/Checkout/Callback`, data, { headers });
        console.log('Successfully received response:', response.data);

      } catch (error) {
        setError('Failed to fetch payment status and send callback.');
        console.error('Axios error:', error.response?.data || error.message);
      }
    };

    fetchPaymentStatus();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <p className="text-green-600">{status}</p>
      )}

      <button
        onClick={() => router.push('/')}
        className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Go Home
      </button>
    </div>
  );
};

export default SuccessPage;
