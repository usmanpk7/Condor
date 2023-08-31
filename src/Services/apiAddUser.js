import base_url from '../utils/constants';
import { getToken } from '../Services/apiLogin'; // Import your getToken function

export async function addUser({ firstName, lastName, email }) {
  try {
    const token = getToken(); // Get the access token using your getToken function

    if (!token) {
      throw new Error('No access token found'); // Handle if token is missing
    }

    const res = await fetch(`${base_url}/contacts/create`, {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        email
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Include the access token in the Authorization header
      }
    });

    const data = await res.json();

    if (data.error) {
      throw new Error('User Is Not Add');
    }

    return data;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
}
