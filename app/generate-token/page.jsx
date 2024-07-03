'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [token, setToken] = useState('');

  const generateToken = async () => {
    try {
      const response = await axios.post('/api/generateToken');

      // Log the entire response to understand its structure
      console.log('API Response:', response.data);

      // Check if token exists in the expected field
      if (response.data.data && response.data.data.accessToken) {
        setToken(response.data.data.accessToken);
      } else {
        console.error('Token not found in response data:', response.data);
      }
    } catch (error) {
      console.error('Error generating token:', error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='flex-col w-96 h-96 bg-slate-900'>
        <div className='flex flex-col gap-4 justify-center items-center h-48'>
          <h1 className='text-white'>Azampay Integration</h1>
          <button className='text-white bg-blue-500 p-2 rounded-md' onClick={generateToken}>
            Generate Token
          </button>
          {token && <p className='bg-blue-500 text-white overflow-auto w-96'>Token: {token}</p>}
        </div>
      </div>
    </div>
  );
}
