// Example status page (optional)
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CallbackStatus = () => {
  const [status, setStatus] = useState('Loading...');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCallbackStatus = async () => {
      try {
        const response = await axios.get('/api/callback/'); // Adjust based on your implementation

        setStatus('Callback processed successfully');
      } catch (error) {
        setError('Failed to fetch callback status');
      }
    };

    fetchCallbackStatus();
  }, []);

  return (
    <div>
      <h1>Callback Status</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>Status: {status}</p>
      )}
    </div>
  );
};

export default CallbackStatus;
