import { useState, useEffect } from 'react';
import ContactRow from './ContactRow';
import * as XLSX from 'xlsx';



const dummyContacts = [
    { id: 1, name: "R2-D2", phone: "222-222-2222", email: "r2d2@droids.com" },
    { id: 2, name: "C-3PO", phone: "333-333-3333", email: "c3po@droids.com" },
    { id: 3, name: "BB-8", phone: "888-888-8888", email: "bb8@droids.com" },
  ];


  export default function ContactList({ setSelectedContactId }) {
    const [contacts, setContacts] = useState(dummyContacts);

    useEffect(() => {
      async function fetchContacts() {
        try {
          /* Load the onboarding_template.xlsx file */
          const response = await fetch('/onboarding_template.xlsx');
          const arrayBuffer = await response.arrayBuffer();
  
          /* Parse the file */
          const data = new Uint8Array(arrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
  
          /* Get the first worksheet (you can modify this to choose the worksheet based on the job title) */
          const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
  
          /* Convert the worksheet to JSON */
          const jsonData = XLSX.utils.sheet_to_json(firstWorksheet, { header: 1 });
  
          /* Assume that the first row is the header and the rest are the data */
          const [header, ...rows] = jsonData;
  
          /* Convert the rows to objects */
          const contacts = rows.map(row => {
            let contact = {};
            row.forEach((cell, i) => {
              contact[header[i]] = cell;
            });
            return contact;
          });
  
          setContacts(contacts);
        } catch(error) {
          console.log(error);
        }
      }
  
      fetchContacts();
    }, []);
  return (
// - When rendering each contact row, attach an onClick event handler that calls handleContactClick with the contact's ID.
<table className="just-for-spacing"> 
    <thead>
        <tr>
            <th className="cl-title" colSpan="3">Contact List</th>
        </tr>
    </thead>
    <tbody>
        <tr className = "cat-row">
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
        </tr>
        {contacts.map(contact => 
        <ContactRow key={contact.id} 
                    contact={contact} 
                    setSelectedContactId={setSelectedContactId} />)}
    </tbody>
</table>
  )
}
