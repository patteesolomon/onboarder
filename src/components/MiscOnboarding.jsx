export default function MiscOnboarding({ state }) {
    const { fullName, position, location, email, password, sfaxLogin } = state;
  
    return (
      <pre>
        {`
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
          
          WiseNet URL:	https://sync.wavevms.com/systems/b070b191-9ca7-448d-a12e-e2371158e7d7
          Login:	${email}
          Password:	E-mail invitation sent to work e-mail

          Docusign URL: 	https://app.docusign.com/home
          Activation Code:	Welcome1!
          Login:	${email}
          Password:	E-mail invitation sent to work e-mail

          Adobe Information:	
          Login:	${email}
          Password: 	E-mail invitation sent to work e-mail

          Has been successfully onboarded.
  
          Thank you!
        `}
      </pre>
    );
  }