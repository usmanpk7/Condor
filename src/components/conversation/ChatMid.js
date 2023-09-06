import React, { useContext, useState, useRef } from 'react';
import '../../CSS/ChatContainer.css';
import { RiArrowDropDownLine, RiDeleteBin5Line } from 'react-icons/ri';
import { FcShare } from 'react-icons/fc';
import { CiMail } from 'react-icons/ci';
import { GoDownload } from 'react-icons/go';
import { AiOutlineClear } from 'react-icons/ai';
import { GlobalContext } from '../../contextApi/Context';
import { useGetTextUserName } from '../../Hooks/useGetTextUserName';
import {AiOutlineDelete} from 'react-icons/ai'
import {FiCopy} from 'react-icons/fi'
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default function ChatMid() {
  const { selectedChatId, selectedMessage, showMidPart } = useContext(GlobalContext);
  const { activeContactNames } = useGetTextUserName();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isCopied, setIsCopied] = useState(false);


  const hideTooltipTimeout = useRef(null); // Added a ref for the timeout

  const selectedChat = activeContactNames?.find((active) => active._id === selectedChatId);

  if (!selectedChat) {
    return null;
  }

  const firstName = selectedChat?.contactId?.firstName || '';
  const shortenedFirstName = firstName.length > 2 ? firstName.slice(0, 2) + '...' : firstName;

  // Function to hide the tooltip with a slight delay
  const handleMouseLeave = () => {
    // Set a timeout to hide the tooltip after 300 milliseconds
    hideTooltipTimeout.current = setTimeout(() => {
      setShowTooltip(false);
    }, 300);
  };

  // Function to clear the timeout and prevent tooltip from hiding
  const handleMouseEnter = () => {
    if (hideTooltipTimeout.current) {
      clearTimeout(hideTooltipTimeout.current);
    }
    setShowTooltip(true);
  };

   // Function to handle copying to clipboard and show the popup
   const handleCopyToClipboard = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Hide the popup after 2 seconds (adjust as needed)
  };


  return (
    <>
    <div className='chat-mid'>
      <div className='mid-header'>
        <h4 onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          Conversation With {shortenedFirstName} <span><RiArrowDropDownLine /></span>
        </h4>
        
        {showTooltip && (
          <div className='tooltip active-toll'>
            <p className='user-text'>Organization: <span>---</span></p>
            <p className='user-text'>Email: <span>{selectedChat?.contactId?.email || '---'} </span></p>
            <p className='user-text'>Phone: <span>---</span></p>
            <p className='user-text'>Address: <span>---</span></p>
          </div>
        )}

        <div className='mid-icons'>
          <p><FcShare /></p>
          <p><CiMail /></p>
          <p><RiDeleteBin5Line /></p>
          <p><GoDownload /></p>
          <p><AiOutlineClear /></p>
        </div>
      </div>
    </div>

    <div>
  {showMidPart && (
    <div className='message-container'>
      <p className='selected-message'>{selectedMessage}</p>

      <div className='mess-icons'>
        {/* Wrap the copy icon with CopyToClipboard */}
        <CopyToClipboard text={selectedMessage} onCopy={handleCopyToClipboard}>
          <FiCopy />
        </CopyToClipboard>
        
        <AiOutlineDelete />

        {/* Render a popup when isCopied is true */}
        {isCopied && (
          <div className='popup'>
            Copied!
          </div>
        )}
      </div>
    </div>
  )}
</div>

</>
  );
}
