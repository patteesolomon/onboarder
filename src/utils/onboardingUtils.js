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


  export const handleCopy = (
    fullName, 
    position, 
    location, 
    email, 
    sfaxLogin, 
    password, 
    availityLogin, 
    availityPassword, 
    templateType, 
    positionData,
    extension,
    phoneNumber
  ) => {
    let onboardingText = '';
  
    const goToText = `
    ${fullName}, will need to install the GoTo app on their phone (published by GoTo Technologies) and look out for the welcome email here shortly. 
    In that email, they'll need to click the "Get Started" button to finish setting up their account. 
    In the app, they can sign in using their Office 365 credentials and can begin taking calls on the app.
    I went ahead and set up the following number and extension:
    
    Extension: 
    Phone Number: +1
    Voicemail PIN: 0000
    `
    if (extension) {
      copyText += "\nExtension: " + extension;
    }
  
    if (phoneNumber) {
      copyText += "\nPhone Number: " + phoneNumber;
    }

    switch(templateType){
        case 'sfax':
            onboardingText = `
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
            if (positionData.Software.GoToConnect) {
              onboardingText += goToText;
            }
            break;
        case 'ac':
            onboardingText = `Hello,
  
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
  
            Call Tracking Metrics URL:	https://app.calltrackingmetrics.com/login
            Login: ${email}
            Password:	E-mail invitation sent to work e-mail
            
            Availity URL:	https://apps.availity.com/availity/web/public.elegant.login
            Login: ${availityLogin}
            Password: ${availityPassword}
  
            Has been successfully onboarded.
    
            Thank you!`; 
            if (positionData.Software.GoToConnect) {
              onboardingText += goToText;
            }
        case 'ur':
            onboardingText = `Hello,	
	
            Full Name:	${fullName}
            Position: ${position}
            Location:	${location}
              
            URL:	it.landmarkrecovery.com
            Login:	${email}
            Password: ${password}
              
            URL:	https://emr.sunwavehealth.com/
            Login:	${email}
            Password:	E-mail invitation sent to work e-mail
              
            URL:	https://compliance.hipaasecurenow.com/
            Login:	${email}
            Password:	Landmark Account Password
              
            URL:	https://app.sfaxme.com/appLogin.aspx?ReturnUrl=%2fsettingsUsers.aspx
            Login:	${sfaxLogin}
            Password:	E-mail invitation sent to work e-mail.
              
            URL:	https://apps.availity.com/availity/web/public.elegant.login
            Login:	${availityLogin}
            Password:	${availityPassword}
              
            Has been successfully onboarded.	
              
            Thank you!	
            `;
            if (positionData.Software.GoToConnect) {
              onboardingText += goToText;
            } 
            break;
        default:
            onboardingText = `          Hello,
  
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
  
            Has been successfully onboarded.
    
            Thank you!`; 
            if (positionData.Software.GoToConnect) {
              onboardingText += goToText;
            }
    }
  
    // Copy the onboarding text to the clipboard
    navigator.clipboard.writeText(onboardingText)
      .then(() => {
        console.log('Onboarding text copied to clipboard');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  
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

  export const getUserDomain = (email) => {
    if (email.includes('@praxistreatment.com')) {
      return 'praxis';
    } else if (email.includes('@landmarkrecovery.com')) {
      return 'landmark';
    } else {
      return '';
    }
  };