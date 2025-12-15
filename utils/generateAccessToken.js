import jwt from "jsonwebtoken";

const generateAccessToken = async (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role, 
    },
    process.env.SECRETE_KEY_ACCESS_TOKEN,
    {
      expiresIn: "5h",
    }
  );

  return token;
};

export default generateAccessToken;
