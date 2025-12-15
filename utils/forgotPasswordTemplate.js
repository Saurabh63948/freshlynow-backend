const forgotPasswordTemplate =({name,otp})=>{
   return   `
      <div>
      <p>Dear ,${name}</p>
      <p>you are requested change your password or reset !!.
      Please use following otp code to reset your password </p>
      <div style="background:yellow">
      ${otp}
      
      </div>
        <p>This otp is vaild for 1hour only.Enter this otp in the blinkit to proceed with resetting your password.</p>
        <br/>
        <br/>
        <p>thanks</p>
        
      <p>ignore if is it not you !..</p>
      </div>
   
   `
};

export default forgotPasswordTemplate;