'use client';
import React, { useState, useEffect } from 'react';
import AccessToken from '../utils/generateToken'

const GenerateToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const accessToken = await AccessToken();
        setToken(accessToken); // Save the token in state
      } catch (error) {
        console.error('Failed to fetch access token:', error);
      }
    };

    fetchAccessToken(); // Fetch the token when the component mounts
  }, []);

  return (
    <div>
      <h1>Access Token Viewer</h1>
      {token ? <p>Access Token: {token}</p> : <p>Loading...</p>}
    </div>
  );
};

export default GenerateToken;



