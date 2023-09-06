import React, { useContext, useEffect, useState } from "react";
import { useGetTextUserName } from "../../Hooks/useGetTextUserName";
import Spinner from "../../ui/Spinner";
import "../../CSS/ActiveContacts.css";
import { GlobalContext } from "../../contextApi/Context";
import { BsThreeDotsVertical, BsDot } from "react-icons/bs";
import { useDeleteChat } from "../../Hooks/useDeleteChat";

export default function ActiveContacts() {
  const { activeContactNames, isLoading } = useGetTextUserName();
  // const [activeContactNames, setActiveContactNames]=useState([])
  const {removeChat}=useDeleteChat()

  const {
    checkChatId,
    selectedChatId,
    closeContact, // Function to close a contact
    closedContacts, 
  } = useContext(GlobalContext);



  if (isLoading) return <Spinner />;

 // Filter active contacts based on 'isClosed' property and excluding selectedChatId
const activeContacts = activeContactNames?.filter((activeUser) => {
  // Exclude if it's closed or the same as the selectedChatId
  return (
    !closedContacts.includes(activeUser.contactId._id) &&
    activeUser.contactId._id !== selectedChatId
  );
});


   function handleDeleteChat(delId){
    removeChat(delId)
    console.log('del',delId)
   }  
  
  
  return (
    <>
      <ul className="active-users">
        {activeContacts?.map((activeUser) => {
          const updatedAt = new Date(activeUser?.contactId?.updatedAt);
          const hours = updatedAt.getHours();
          const minutes = updatedAt.getMinutes();
          const ampm = hours >= 12 ? "pm" : "am";
          const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
          const formattedTime = `${formattedHours}:${minutes
            .toString()
            .padStart(2, "0")} ${ampm}`;

          const isActiveContact =
            activeUser.contactId._id === selectedChatId;

            // console.log("activeUser?.contactId:", activeUser?.contactId);
            // console.log("activeUser?.contactId?.isSeen:", activeUser?.contactId?.isSeen);
            

          return (
            <li
              className={`user-info ${isActiveContact ? "ac" : ""}`}
              key={activeUser._id}
              onClick={() => checkChatId(activeUser._id)}
            >
              <p className="fullName">
                {activeUser?.contactId?.firstName}{" "}
                {activeUser?.contactId?.lastName}
              </p>

              <div className="drop-parent">
                <p className="date">{formattedTime}</p>
                {activeUser?.contactId?.isSeen ?? false ? '' : <BsDot />}

                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle custom-dropdown bg-transparent border-0"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <BsThreeDotsVertical className="dots" />
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <p class="dropdown-item">Mark As Unread</p>
                    <p class="dropdown-item">View Contact Details</p>
                    <p
                      class="dropdown-item"
                      onClick={() => closeContact(activeUser.contactId._id)} // Close the contact
                    >
                      Close Conversation
                    </p>
                    <p class="dropdown-item" onClick={()=>removeChat(activeUser._id)}>Delete Conversation</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
