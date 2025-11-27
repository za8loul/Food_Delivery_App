import User from "../../../DB/Models/user.model.js";
import { comparePassword } from "../../../Utils/encryption.utils.js";
import { generateAccessToken, generateRefreshToken } from "../../../Utils/token.utils.js";

const loginservice = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return next(new Error("Invalid email or password", { cause: 401 }));
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return next(new Error("Invalid email or password", { cause: 401 }));
  }

  const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id });

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  res.json({ message: "Login successful", accessToken });
};

export default loginservice;