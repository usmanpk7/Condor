import React, { useContext, useState } from 'react'
import '../../CSS/TextPreview.css'
import { AiOutlineSave, AiFillFolderAdd, AiOutlineArrowRight } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { useSendText } from '../../Hooks/useSendText';
import Spinner from '../../ui/Spinner'
import { GlobalContext } from '../../contextApi/Context';



export default function TextPreview() {
  // console.log('In textpreview')

  const [content, setContent]=useState('')
  const {newTextHandler, isLoading}= useSendText()
    const navigate=useNavigate()
    const {selectedUser}=useContext(GlobalContext)
   
    const contactId = selectedUser ? selectedUser.contactId : null;

     function handleText(e) {
      e.preventDefault();
      
      if (contactId !== null) {
        const payload = {
          contactId,
          content, 
          messageHistoryPreviewThumbnail: 'string',
          messagePreviewThumbnail: 'string',
          type: 'text',
        };
        newTextHandler(payload);
        setContent('')
      } else {
        // Handle the case when selectedUser is null
        console.error("selectedUser is null");
      }
  
    }
    

    if(isLoading) return <Spinner />

  return (
    <form className='reply-input' onSubmit={handleText}>
      <textarea type='text' className='text-area' value={content} onChange={(e)=>setContent(e.target.value)}
       placeholder='Type here...' 
       />
      <div className='textarea-icons'>
        <AiFillFolderAdd />
        <AiOutlineSave />
      </div>
      <div className='form-btns'>
        <button type='submit' className='submit-btn'><AiOutlineArrowRight /></button>
        <FaTimes className='cross' onClick={()=>navigate(-1) } />
      </div>
    </form>
  )
}
