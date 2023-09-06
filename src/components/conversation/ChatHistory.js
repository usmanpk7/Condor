import React, { useState, useEffect, useContext } from 'react';
import '../../CSS/ChatContainer.css';
import { useGetChat } from '../../Hooks/useGetChat';
import ChatMessages from './ChatMessages'; // Create a ChatMessage component as mentioned before
import { GlobalContext } from '../../contextApi/Context';

export default function ChatHistory() {
  const {selectedChatId}=useContext(GlobalContext)
  const { chatDetails } = useGetChat(selectedChatId);

  

  return (
    <div className='chat-history'>
      <div className='detail-header'>
        <h5>History</h5>
        <button className='reply-btn'>Reply</button>
      </div>
      <p className='message'>Messages</p>
      <div className='chat-messages'>
      {selectedChatId ? (
        <>
          <div className='chat-messages'>
            {chatDetails?.map((message) => (
              <ChatMessages key={message._id} message={message} />
            ))}
          </div>
        </>
      ) : (
        <p className='no-chat-selected'>No chat selected.</p>
      )}
      </div>
    </div>
  );
}
