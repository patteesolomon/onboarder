// App.jsx
import { useState } from 'react';
import OnboardingWsfax from './components/OnboardingWsfax';
import { handleOnboarding, handleCopy } from './utils/onboardingUtils.js';
import './App.css';

function App() {
  const [state, setState] = useState({
    fullName: '',
    position: '',
    location: '',
    email: '',
    password: '',
    sfaxLogin: '',
  });
  const [onboardingTemplate, setOnboardingTemplate] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateOnboarding = () => {
    const { email, sfaxLogin, password } = handleOnboarding(state.fullName, state.position, state.location);
    const newState = {
      ...state,
      email,
      password,
      sfaxLogin,
    };
    setState(newState);
  
    const sfaxtemplate = (
      <OnboardingWsfax
        state={newState}
      />
    );
  
    setOnboardingTemplate(sfaxtemplate);
  };

  const handleCopyToClipboard = () => {
    const copied = handleCopy(state.fullName, state.position, state.location, state.email, state.sfaxLogin, state.password);
    if (copied) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleReset = () => {
    setState({
      fullName: '',
      position: '',
      location: '',
      email: '',
      password: '',
      sfaxLogin: '',
    });
    setOnboardingTemplate(null);
  };

  return (
    <div>
      <input type="text" placeholder="Full Name" value={state.fullName} onChange={e => setState(prevState => ({ ...prevState, fullName: e.target.value }))} />
      <input type="text" placeholder="Position" value={state.position} onChange={e => setState(prevState => ({ ...prevState, position: e.target.value }))} />
      <input type="text" placeholder="Location" value={state.location} onChange={e => setState(prevState => ({ ...prevState, location: e.target.value }))} />
      <button onClick={handleGenerateOnboarding}>Generate Onboarding Template</button>
      {onboardingTemplate}
      {onboardingTemplate && <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>}
      {onboardingTemplate && <button onClick={handleReset}>Reset</button>}
      {copied && <div>Copied to Clipboard!</div>}
    </div>
  );
}

export default App;
