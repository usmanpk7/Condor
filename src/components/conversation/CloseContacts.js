import React, { useContext, useEffect } from "react";
import { useGetTextUserName } from "../../Hooks/useGetTextUserName";
import Spinner from "../../ui/Spinner";
import "../../CSS/ActiveContacts.css";
import { GlobalContext } from "../../contextApi/Context";
import { BsThreeDotsVertical } from "react-icons/bs";


export default function CloseContacts() {
    const { activeContactNames, isLoading } = useGetTextUserName();
    const {
      reopenContact, // Function to reopen a contact
      closedContacts,
      checkChatId, // List of closed contact IDs
    } = useContext(GlobalContext);
  
    if (isLoading) return <Spinner />;
  
    // Filter closed contacts based on 'isClosed' property
    const closedContactNames = activeContactNames.filter(
      (activeUser) => closedContacts.includes(activeUser.contactId._id)
    );
  
    return (
      <>
        <ul className="active-users">
          {closedContactNames.map((closedUser) => {
            const updatedAt = new Date(closedUser?.contactId?.updatedAt);
            const hours = updatedAt.getHours();
            const minutes = updatedAt.getMinutes();
            const ampm = hours >= 12 ? "pm" : "am";
            const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
            const formattedTime = `${formattedHours}:${minutes
              .toString()
              .padStart(2, "0")} ${ampm}`;
  
            return (
              <li className="user-info" key={closedUser._id}  onClick={() => checkChatId(closedUser._id)}>
                <p className="fullName">
                  {closedUser?.contactId?.firstName}{" "}
                  {closedUser?.contactId?.lastName}
                </p>
  
                <div className="drop-parent">
                  <p className="date">{formattedTime}</p>
  
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle custom-dropdown bg-transparent border-0"
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
                      onClick={() => reopenContact(closedUser.contactId._id)} // reopen the contact
                    >
                      Active Conversation
                    </p>
                    <p class="dropdown-item">Delete Conversation</p>
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