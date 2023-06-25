import positions from "../data/positions";

export const handleOnboarding = (fullName, position, location) => {
    const [firstName, lastName] = fullName.toLowerCase().split(' ');
    const domain = location.toLowerCase().startsWith('p') ? '@praxistreatment.com' : '@landmarkrecovery.com';
    const email = `${firstName}.${lastName}${domain}`;
    const sfaxLogin = `${firstName}.${lastName}`;
    const password = `${firstName.slice(0, 2).charAt(0).toUpperCase()}${firstName.slice(1, 2)}${lastName.slice(0, 4)}2023!`;
    const availityLogin = `${firstName}${lastName}`;
    const availityPassword = generateAvailityPassword();
  
    return { email, sfaxLogin, password,availityLogin, availityPassword };
  };
  function generateAvailityPassword() {
    const length = 8; 
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

  export const handleGenerateOnboarding = (state) => {
    const { email, sfaxLogin, password, availityLogin, availityPassword  } = handleOnboarding(state.fullName, state.position, state.location);
    const newState = {
      ...state,
      email,
      password,
      sfaxLogin,
      availityLogin,
      availityPassword,
    };
    


  // Find the selected position in the positions array
  const selectedPosition = positions.find(pos => pos.Position === state.position);
  // Check if SFAX is true in the Software object of the selected position
  if (selectedPosition && selectedPosition.Software.SFAX) {
    return { newState, templateType: 'sfax' };
  } else if (selectedPosition && selectedPosition.Software.Availity && selectedPosition.Software["Call Tracking Metrics"]) {
    return { newState, templateType: 'ac' };
  } else {
    return { newState, templateType: 'basic' };
  }
}


export const getTemplateType = (state) => {
    // Find the selected position in the positions array
    const selectedPosition = positions.find(pos => pos.Position === state.position);
    // Check if SFAX is true in the Software object of the selected position
    if (selectedPosition && selectedPosition.Software.SFAX) {
      return 'sfax';
    } else {
      return 'basic';
    }
  };


export function handleCopy(fullName, position, location, email, sfaxLogin, password) {
    const onboardingText = `
      Hello,
  
      Full Name: ${fullName}
      Position: ${position}
      Location: ${location}
  
      Office 365 URL: it.landmarkrecovery.com
      Login: ${email}
      Password: ${password}
  
      Sunwave EMR URL: https://emr.sunwavehealth.com/SunwaveEMR/SunwaveClient/build/web/firsttabs.html#
      Login: ${email}
      Password: E-mail invitation sent
  
      HIPAA Compliance URL: https://compliance.hipaasecurenow.com/
      Login: ${email}
      Password: Landmark Account Password
  
      Sfax URL: https://app.sfaxme.com/appLogin.aspx?ReturnUrl=%2fsettingsUsers.aspx
      Login: ${sfaxLogin}
      Password: E-mail invitation sent to work e-mail.
  
      Has been successfully onboarded.
  
      Thank you!
    `;
  
    // Create a new textarea element and set its value to the onboarding text
    const textarea = document.createElement('textarea');
    textarea.value = onboardingText;
    document.body.appendChild(textarea);
  
    // Select the onboarding text
    textarea.select();
  
    // Copy the onboarding text to the clipboard
    document.execCommand('copy');
  
    // Remove the textarea element from the DOM
    document.body.removeChild(textarea);
  
    return true;
  }
  
  export const updateSuggestions = (e, setState, setSuggestions) => {
    const value = e.target.value;
    setState(prevState => ({ ...prevState, position: value }));
  
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      const newSuggestions = positions.filter(pos => regex.test(pos.Position));
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };