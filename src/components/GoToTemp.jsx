import { useState } from "react";
export default function GoToTemp({ state }) {
  const { fullName } = state;
  const [extension, setExtension] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState(''); 

  return (
    <div>
      <pre>
      {`${fullName}, will also need to install the GoTo app on their phone (published by GoTo Technologies) and look out for the welcome email here shortly. 
      In that email, they'll need to click the "Get Started" button to finish setting up their account. 
      In the app, they can sign in using their Office 365 credentials and can begin taking calls on the app.
      I went ahead and set up the following number and extension:`}
      </pre>
      <pre>
        Extension: 
        <input value={extension} onChange={e => setExtension(e.target.value)} />
      </pre>
      <pre>
        Phone Number:
        <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
      </pre>
      <pre>
      {`Voicemail PIN: 0000`}
      </pre>
    </div>
  );
}
