

import base_url from '../utils/constants'
import { getToken } from './apiLogin'

export async function SendText({ contactId, content, type, messageHistoryPreviewThumbnail, messagePreviewThumbnail }) {
    try {
      const token = getToken();
      if (!token) {
        throw new Error('UnAuthorized user');
      }
      const res = await fetch(`${base_url}/conversation/messages/send-messages`, {
        method: 'POST',
        body: JSON.stringify({
          contactId,
          content,
          messageHistoryPreviewThumbnail,
          messagePreviewThumbnail,
          type, // Use 'text' if type is not provided
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
  
      const data = await res.json();
      return data;
    } catch (e) {
      throw e;
    }
  }


  