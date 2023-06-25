import { useState } from 'react';
import {handleGenerateOnboarding, handleCopy} from './utils/onboardingUtils.js';
import {handleReset, handleCopyToClipboard } from './utils/buttonUtils.js';
import OnboardingWsfax from "./components/OnboardingWsfax";
import BasicOnboarding from "./components/BasicOnboarding";
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
  const copyToClipboard = () => handleCopyToClipboard(handleCopy, setCopied,state);
  const reset = () => handleReset(setState, setOnboardingTemplate);
  const generateOnboarding = () => {
    const { newState, templateType } = handleGenerateOnboarding(state);
    setState(newState);
  
    if (templateType === 'sfax') {
      const sfaxtemplate = (
        <OnboardingWsfax
          state={newState}
        />
      );
      setOnboardingTemplate(sfaxtemplate);
    } else {
      const basicTemplate = (
        <BasicOnboarding
          state={newState}
        />
      );
      setOnboardingTemplate(basicTemplate);
    }
  };
  return (
    <div className = "first-render">
      <input type="text" placeholder="Full Name" value={state.fullName} onChange={e => setState(prevState => ({ ...prevState, fullName: e.target.value }))} />
      <input type="text" placeholder="Position" value={state.position} onChange={e => setState(prevState => ({ ...prevState, position: e.target.value }))} />
      <input type="text" placeholder="Location" value={state.location} onChange={e => setState(prevState => ({ ...prevState, location: e.target.value }))} />
      <button onClick={generateOnboarding}>Generate Onboarding Template</button>
      {onboardingTemplate}
      {onboardingTemplate && <button onClick={copyToClipboard}>Copy to Clipboard</button>}
      {onboardingTemplate && <button onClick={reset}>Reset</button>}
      {copied && <div>Copied to Clipboard!</div>}
    </div>
  );
}

export default App;
