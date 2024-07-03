'use client'
import { useState } from "react";

const Payments = () => {
  const [amount, setAmount] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      setErrorMessage('Please enter a valid amount.');
      setSuccessMessage(''); // Clear the success message if any
      return;
    }

    // Send the amount to the server
    try {
      const res = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, paymentProvider: 'YourPaymentProvider' }), // Replace 'YourPaymentProvider' with the actual provider
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Payment failed');
      }

      setSuccessMessage(data.message);
      setErrorMessage(''); // Clear the error message on success
      setAmount(''); // Clear the input field after successful payment
    } catch (error) {
      console.error('Error processing payment:', error);
      setErrorMessage(error.message || 'Payment failed. Please try again.');
      setSuccessMessage(''); // Clear the success message on error
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            Pay Now
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 w-96">
              <div>
                <label className="text-gray-700 dark:text-gray-200" htmlFor="amount">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                Pay
              </button>
            </div>
          </form>
          <div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payments;
