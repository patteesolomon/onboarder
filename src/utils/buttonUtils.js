import positions from "../data/positions";
import { handleOnboarding } from './onboardingUtils';
export const handleReset = (state) => {
  const newState = {
    ...state,
    email: '',
    password: '',
    sfaxLogin: '',
    availityLogin: '',
    availityPassword: '',
  };

  // Generate new email, password, and sfaxLogin
  const { email, password, sfaxLogin, availityLogin, availityPassword } = handleOnboarding(newState.fullName, newState.position, newState.location);

  // Update the state with the new email, password, and sfaxLogin
  newState.email = email;
  newState.password = password;
  newState.sfaxLogin = sfaxLogin;
  newState.availityLogin = availityLogin;
  newState.availityPassword = availityPassword;



  // Find the selected position in the positions array
  const selectedPosition = positions.find(pos => pos.Position === newState.position);
 
  // Check if both Availity and Call Tracking Metrics are true in the Software object of the selected position
  if (selectedPosition && selectedPosition.Software.Availity && selectedPosition.Software["Call Tracking Metrics"]) {
      return { newState, templateType: 'ac' };
  } 
  // Check if SFAX and Availity are true in the Software object of the selected position
  else if (selectedPosition && selectedPosition.Software.SFAX && selectedPosition.Software.Availity) {
      return { newState, templateType: 'ur' };
  }
  // Check if SFAX is true in the Software object of the selected position
  else if (selectedPosition && selectedPosition.Software.SFAX) {
      return { newState, templateType: 'sfax' };
  } else {
      return { newState, templateType: 'basic' };
  }
};


  
export const handleCopyToClipboard = (handleCopy, setCopied, state) => {
    const copied = handleCopy(state.fullName, state.position, state.location, state.email, state.sfaxLogin, state.password);
    if (copied) {
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
    }
  };

