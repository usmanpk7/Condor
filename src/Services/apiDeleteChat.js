
    import base_url from '../utils/constants'
    import { getToken } from './apiLogin'

    export async function deleteChat(_id){
        try {
            const res = await fetch(`${base_url}/conversation/delete/${_id}`, {
              headers: {
                Authorization: `Bearer ${getToken()}`
              },
              method: 'DELETE'
            });
          
            if (!res.ok) {
              throw new Error('Cannot delete');
            }
          
            const data = await res.json();
            return data.data;
          } catch (e) {
            throw e;
          }
          
    }