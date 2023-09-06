import React, { useContext } from 'react';
import '../../CSS/ChatMessages.css';
import { GlobalContext } from '../../contextApi/Context';

export default function ChatMessages({ message }) {
  const {setSelectedMessage, setShowMidPart}=useContext(GlobalContext)

   // Function to handle clicking on a specific message
   const handleOnClick = () => {
    setSelectedMessage(message.content)
    setShowMidPart(true)
  }


  // You can format the date here if needed
  const formattedDate = new Date(message.createdAt).toLocaleString();

  // Define a CSS class based on whether the message was sent by you
  const messageClass = message.sentByMe ? 'sent-by-me' : 'sent-by-others';

  return (
    <div className={`chat-message ${messageClass}`}>
      <p className='message-content' onClick={handleOnClick}>{message.content}</p>
      <p className='message-time'>{formattedDate}</p>
    </div>
  );
}