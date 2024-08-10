import axios from 'axios';

export const AccessToken = async () => {
  const AUTHENTICATOR_URL = process.env.NEXT_PUBLIC_AUTHENTICATOR_URL;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const CLIENT_SECRET = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

  const data = {
    CLIENT_ID,
    CLIENT_SECRET,
    APP_NAME,
  };


    await axios.post(AUTHENTICATOR_URL, data)
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
};

export default AccessToken;

