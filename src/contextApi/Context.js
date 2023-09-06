import React, { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedChatId, setSelectedChatId]=useState(null)
  const [closedContacts, setClosedContacts] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMidPart, setShowMidPart]=useState(false)

  // Function to close a contact and persist it in local storage
  function closeContact(contactId) {
    // Close the contact
    setClosedContacts((prevClosedContacts) => [...prevClosedContacts, contactId]);

    // Store the updated closedContacts in local storage
    localStorage.setItem('closedContacts', JSON.stringify([...closedContacts, contactId]));
  }


  // Function to reopen a contact
  function reopenContact(contactId) {
    setClosedContacts((prevClosedContacts) =>
      prevClosedContacts.filter((id) => id !== contactId)
    );

    // Store the updated closedContacts in local storage
    localStorage.setItem('closedContacts', JSON.stringify(closedContacts.filter((id) => id !== contactId)));
  }


  function checkChatId(id){
    setSelectedChatId(id)
    // console.log('chatId', selectedChatId)
  }

  // Initialize the closedContacts state from local storage
  useEffect(() => {
    const storedClosedContacts = JSON.parse(localStorage.getItem('closedContacts')) || [];
    setClosedContacts(storedClosedContacts);
  }, []);


  useEffect(() => {
    // Retrieve selectedUser from local storage when the component mounts
    const storedUser = localStorage.getItem("selectedUser");
    if (storedUser) {
      setSelectedUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to set selectedUser and update local storage
  const updateSelectedUser = (user) => {
    setSelectedUser(user);
    // Save selectedUser to local storage
    localStorage.setItem("selectedUser", JSON.stringify(user));
  };

  return ( 
    <GlobalContext.Provider value={{
      selectedUser,
      updateSelectedUser,
      setSelectedUser,
      selectedChatId,
      setSelectedChatId,
      checkChatId,
      closedContacts, // Make closed contacts available in the context
        closeContact, // Function to close a contact
        reopenContact,
        selectedMessage,
        setSelectedMessage,
        showMidPart,
        setShowMidPart
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext };
