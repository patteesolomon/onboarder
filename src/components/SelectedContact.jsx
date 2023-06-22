import { useEffect, useState } from 'react';

function SelectedContact({ selectedContactId, setSelectedContactId }) {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchContactData() {
      try {
        const url = `https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users/${selectedContactId}`;
        const response = await fetch(url);
        const data = await response.json();
        setContact(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchContactData();
  }, [selectedContactId]);

  // Function to handle the button click
  function handleButtonClick() {
    setSelectedContactId(null);
  }

  return (
    <div>
      {contact ? (
        <>
          <h1>{contact.name}</h1>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          <button onClick={handleButtonClick}>Back to List</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SelectedContact;
