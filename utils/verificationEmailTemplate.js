// const verifyEmailTemplate = ({ name, token }) => {
//   // const url = `https://tantalizingly-garbleable-lia.ngrok-free.dev/api/users/verify-email?token=${token}`;
// const url = `https://freshlynow-backend.onrender.com/api/users/verify-email?token=${token}`;

//   return `
//     <p>Dear ${name},</p>
//     <p>Thank you for registering with freshlynow.</p>

//     <a href="${url}"
//        style="color:white; background: orange; padding: 12px 20px;
//               display: inline-block; text-decoration: none; border-radius: 6px;">
//         Verify Your Email
//     </a>

//     <p>If you did not request this, please ignore this email.</p>
//   `;
// };

// export default verifyEmailTemplate;


const verifyEmailTemplate = ({ name, token }) => {
  const url = `https://freshlynow-backend.onrender.com/api/users/verify-email?token=${token}`;

  return `
    <p>Dear ${name},</p>
    <p>Thank you for registering with FreshlyNow.</p>

    <a href="${url}"
       style="color:white; background: orange; padding: 12px 20px;
              display: inline-block; text-decoration: none; border-radius: 6px;">
        Verify Your Email
    </a>

    <p>If you did not request this, please ignore this email.</p>
  `;
};

export default verifyEmailTemplate;
