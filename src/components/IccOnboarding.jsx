export default function IccOnboarding({ state }) {
    const { fullName, position, location, email, password, sfaxLogin, availityLogin, availityPassword } = state;
  
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

          Availity URL:	https://apps.availity.com/availity/web/public.elegant.login
          Login: ${availityLogin}
          Password: ${availityPassword}

          Call Tracking Metrics URL:	https://app.calltrackingmetrics.com/login
          Login: ${email}
          Password:	E-mail invitation sent to work e-mail

          VerifyTX URL:	https://app.verifytx.com/login
          Login: ${email}
          Password:	E-mail invitation sent to work e-mail

          Waystar URL:	https://login.zirmed.com/ui
          Login:	
          Password:	
          
          Has been successfully onboarded.
  
          Thank you!
        `}
      </pre>
    );
  }