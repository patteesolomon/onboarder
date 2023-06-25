export default function UrOnboarding({ state }) {
    const { fullName, position, location, email, password, sfaxLogin, availityLogin, availityPassword } = state;
  
    return (
      <pre>
        {`
 Hello,	
	
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
 
        `}
      </pre>
    );
  }