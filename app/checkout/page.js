'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AccessToken from '../utils/generateToken';
import { useRouter } from 'next/navigation';

const providers = ["Airtel", "Tigo", "Halopesa", "Azampesa", "Mpesa"];

const CheckoutPage = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(providers[0]);
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('TZS');
  const [externalId, setExternalId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenData = await AccessToken();
        setToken(tokenData);
      } catch (error) {
        console.error('Error fetching token:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  const handleCheckout = async () => {
    if (!token) {
      console.error('No token available');
      return;
    }

    setStatus('');
    setError('');

    try {
      const response = await axios.post('/api/checkout', {
        accountNumber,
        amount,
        currency,
        externalId,
        provider: selectedProvider,
        additionalProperties: {
          property1: null,
          property2: null,
        },
        token,
        callbackUrl: 'https://payments-gateways-ds37soctu-erickteks-projects.vercel.app/api/callback'
      });

      setStatus('Checkout successful!');
      console.log('Response:', response.data);

      if (response.status === 200) {
        router.push('/success');
      } else {
        setError('Checkout failed');
      }
    } catch (error) {
      setError(error.response ? error.response.data : 'An error occurred during checkout');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
      {token ? (
        <div>
          <p className="text-gray-700 mb-4">Token: {token}</p>

          <div className="mb-4">
            <label htmlFor="accountNumber" className="block text-gray-700 mb-2">Account Number:</label>
            <input
              id="accountNumber"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 mb-2">Amount:</label>
            <input
              id="amount"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="currency" className="block text-gray-700 mb-2">Currency:</label>
            <input
              id="currency"
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="externalId" className="block text-gray-700 mb-2">External ID:</label>
            <input
              id="externalId"
              type="text"
              value={externalId}
              onChange={(e) => setExternalId(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="provider" className="block text-gray-700 mb-2">Select Provider:</label>
            <select
              id="provider"
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {providers.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Checkout
          </button>

          {status && <p className="mt-4 text-green-600">Status: {status}</p>}
          {error && <p className="mt-4 text-red-600">Error: {error}</p>}
        </div>
      ) : (
        <p>No token available</p>
      )}
    </div>
  );
};

export default CheckoutPage;
