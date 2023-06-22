import './App.css'
import { useState } from 'react';
import ContactList from './components/ContactList'
import SelectedContact from './components/SelectedContact'


/*Initialize a state variable, selectedContactId, with a default value of null.
- Define a function, handleContactClick, that takes an ID and sets selectedContactId to that ID.
- Conditionally render ContactList or SelectedContact based on whether selectedContactId is null or not.
- Pass handleContactClick and selectedContactId to ContactList and SelectedContact via props.
*/



function App() {
  const [selectedContactId, setSelectedContactId] = useState(null);

  return (
    <>
      {selectedContactId ? (<SelectedContact selectedContactId={selectedContactId} setSelectedContactId={setSelectedContactId} />
      ) : (
        <ContactList setSelectedContactId={setSelectedContactId} />
      )}
    </>
  )
}
export default App
