// useGetUser.js
import { useQuery } from 'react-query';
import base_url from '../utils/constants';
import { getToken } from '../Services/apiLogin';

export function useGetUser(searchQuery) {
  const token = getToken();

  const fetchContacts = async () => {
    const response = await fetch(`${base_url}/contacts/find-all?query=${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.data;
  };

  return useQuery(['contacts', searchQuery], fetchContacts);
}
