export function handleOnboarding(fullName, position, location) {
    const [firstName, lastName] = fullName.toLowerCase().split(' ');
    const domain = location.toLowerCase().startsWith('p') ? '@praxistreatment.com' : '@landmarkrecovery.com';
    const email = `${firstName}.${lastName}${domain}`;
    const sfaxLogin = `${firstName}.${lastName}`;
    const password = `${firstName.slice(0, 2).charAt(0).toUpperCase()}${firstName.slice(1, 2)}${lastName.slice(0, 4)}2023!`;
  
    return { email, sfaxLogin, password };
  }
  
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
  