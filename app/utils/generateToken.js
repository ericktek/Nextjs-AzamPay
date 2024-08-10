import axios from "axios";

export const AccessToken = async () => {
  try {
    const response = await axios.post("/api/generateToken");

    if (response.status === 200) {
      return response.data.data.accessToken; // Return only the token
    } else {
      throw new Error('Token generation failed');
    }
  } catch (err) {
    console.log("Failed to generate token:", err);
    return null; 
  }
};

export default AccessToken;
