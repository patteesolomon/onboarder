import { useState, useEffect } from 'react';
import {handleGenerateOnboarding, handleCopy, updateSuggestions, getUserDomain} from './utils/onboardingUtils.js';
import {handleReset, handleCopyToClipboard } from './utils/buttonUtils.js';
import GoToTemp from './components/GoToTemp.jsx';
import OnboardingWsfax from "./components/OnboardingWsfax";
import BasicOnboarding from "./components/BasicOnboarding";
import AcOnboarding from './components/AcOnboarding.jsx';
import UrOnboarding from './components/UrOnboarding.jsx';
import IccOnboarding from './components/IccOnboarding.jsx';
import MiscOnboarding from './components/MiscOnboarding.jsx';

import positions from './data/positions.js';
import './App.css';


function App() {
  const [state, setState] = useState({
    fullName: '',
    position: '',
    location: '',
    email: '',
    password: '',
    sfaxLogin: '',
    availityLogin: '',
    availityPassword: '',
    extension: '',
    phoneNumber: '',
  });
  const [onboardingTemplate, setOnboardingTemplate] = useState(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const copyToClipboard = () => handleCopyToClipboard(handleCopy, setCopied, state);
  const [suggestions, setSuggestions] = useState([]);
  const [userDomain, setUserDomain] = useState('');

  useEffect(() => {
    setUserDomain(getUserDomain(state.email));
  }, [state.email]);


  

  const reset = () => {
    if (!state.fullName || !state.position || !state.location) {
      setErrorMessage("A field is missing!");
    } else {
      const { newState, templateType } = handleReset(state);
      setState({
        ...newState,
        templateType,
      });  
      setErrorMessage(null); // Clear the error message when the form is successfully submitted
  
      // Find the selected position in the positions array
      const selectedPosition = positions.find(pos => pos.Position === state.position);
        
      let TemplateComponent = null; // The component that will be rendered
      let templateArgs = { state: newState }; // Arguments to be passed to the component
  
      if (templateType === 'sfax') {
        TemplateComponent = OnboardingWsfax;
      } else if (templateType === 'ac') {
        TemplateComponent = AcOnboarding;
      } else if (templateType === 'ur') {
        TemplateComponent = UrOnboarding;
      } else {
        TemplateComponent = BasicOnboarding;
      }
  
      let FinalComponent = TemplateComponent; // Start with FinalComponent as TemplateComponent
  
      // If the selected position requires GoToConnect, append the GoToTemp component to the template
      if (selectedPosition && selectedPosition.Software.GoToConnect) {
        FinalComponent = ({ state }) => (
          <div>
            <TemplateComponent state={state} />
            <GoToTemp state={state} />
          </div>
        );
      }
  
      setOnboardingTemplate(<FinalComponent {...templateArgs} />);
    }
  };
  
  

  const generateOnboarding = () => {
    const { newState, templateType } = handleGenerateOnboarding(state, setState, setOnboardingTemplate);
    setState(newState);
  
    // Find the selected position in the positions array
    const selectedPosition = positions.find(pos => pos.Position === state.position);
      
    let TemplateComponent = null; // The component that will be rendered
    let templateArgs = { state: newState }; // Arguments to be passed to the component
  
    if (selectedPosition && selectedPosition.Software.Availity && selectedPosition.Software["Call Tracking Metrics"]) {
      TemplateComponent = AcOnboarding;
    } else if (templateType === 'ur') {
      TemplateComponent = UrOnboarding;
    } else if (templateType === 'sfax') {
      TemplateComponent = OnboardingWsfax;
    } else {
      TemplateComponent = BasicOnboarding;
    }
  
    let FinalComponent = TemplateComponent; // Start with FinalComponent as TemplateComponent
  
    // If the selected position requires GoToConnect, append the GoToTemp component to the template
    if (selectedPosition && selectedPosition.Software.GoToConnect) {
      FinalComponent = ({ state }) => (
        <div>
          <TemplateComponent state={state} />
          <GoToTemp state={state} />
        </div>
      );
    }
  
    setOnboardingTemplate(<FinalComponent {...templateArgs} />);
  };
  
  return (
    <div className = "first-render">
      <div className="domain-image">
        {userDomain === 'praxis' && <img className = "praxis-png" src="src/assets/praxis.PNG" alt="Praxis" />}
        {userDomain === 'landmark' && <img className = "landmark-png" src="src/assets/landmarkrecovery.PNG" alt="Landmark" />}
        </div>
      <input type="text" placeholder="Full Name" value={state.fullName} onChange={e => setState(prevState => ({ ...prevState, fullName: e.target.value }))} />
      <input type="text" placeholder="Position" value={state.position} onChange={e => updateSuggestions(e, setState, setSuggestions)} />
      { suggestions.length > 0 && (
      <div className={onboardingTemplate ? "suggestions suggestions-shifted" : "suggestions suggestions-unshifted"}>
        {suggestions.map((suggestion, index) => (
        <div className="suggestion"
        key={index}
        onClick={() => {
          setState(prevState => ({ ...prevState, position: suggestion.Position }));
          setSuggestions([]);
        }}>
        {suggestion.Position}
      </div>
    ))}
  </div>
)}
      <input type="text" placeholder="Location" value={state.location} onChange={e => setState(prevState => ({ ...prevState, location: e.target.value }))} />
      {!onboardingTemplate && (
      <>        
      <button onClick={generateOnboarding}>Generate Onboarding Template</button>
      </>)}

      {onboardingTemplate}
      {onboardingTemplate && <button onClick={copyToClipboard}>Copy Template</button>}
      {errorMessage && <div className="error-message bouncing-text">{errorMessage}</div>}
      {onboardingTemplate && <button onClick={reset}>Refresh Template</button>}
      {copied && <div className = "make-red">Copied to Clipboard!</div>}
    </div>

  );
}

export default App;
