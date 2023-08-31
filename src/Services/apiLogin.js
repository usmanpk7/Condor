import base_url from '../utils/constants'

export async function getLogin({ email, password }) {
    try {
        const res = await fetch(`${base_url}/user/sign-in`, {
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        const data = await res.json();

        if (data.error) {
            throw new Error(data.message); 
        }

        return data; 
    } catch (e) {
        console.error(e.message);
        throw e; 
    }
}

export const getToken = () => {
    const localToken = localStorage.getItem("accessToken");
    const sessionToken = sessionStorage.getItem("accessToken");
  
    if (localToken !== null) {
      return localToken;
    } else if (sessionToken !== null) {
      return sessionToken;
    }
  
    return null; // Return null if no token is found
  };
  