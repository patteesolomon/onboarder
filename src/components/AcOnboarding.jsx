export default function AcOnboarding({ state }) {
    const { fullName, position, location, email, password, availityLogin, availityPassword } = state;
  
  const AccTemplateConditional = (state) => {
    {
      (state != undefined) ? 
      (suggestions.length === 0) ? null : (
        <ul>
          {state.map((sug) => (
            <>
              Full Name: <li key={sug.id}>{fullName}</li>
              <li key={sug.id}>{position}</li>
              <li key={sug.id}>{location}</li>
              <li key={sug.id}>{email}</li>
              <li key={sug.id}>{password}</li>
              <li key={sug.id}>{availityLogin}</li>
              <li key={sug.id}>{availityPassword}</li>
            </>
          ))}
        </ul>
        )
        : null
    }
  };
    return (
      <pre>
        <AccTemplateConditional/>
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

          Call Tracking Metrics URL:	https://app.calltrackingmetrics.com/login
          Login: ${email}
          Password:	E-mail invitation sent to work e-mail
          
          Availity URL:	https://apps.availity.com/availity/web/public.elegant.login
          Login: ${availityLogin}
          Password: ${availityPassword}

          Has been successfully onboarded.
  
          Thank you!
        `} 
      </pre>
    );
  }