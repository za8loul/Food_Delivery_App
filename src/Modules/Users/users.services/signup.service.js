import User from "../../../DB/Models/users.model.js";
import { hashPassword } from "../../../Utils/encryption.utils.js";
import { generateAccessToken, generateRefreshToken } from "../../../Utils/token.utils.js";

export const signupService = async (req, res, next) => {
  const { first_name, last_name, email, password, gender, phone_number, address, role } = req.body;

  const isEmailExist = await User.findOne({ where: { email } });
  if (isEmailExist) {
    return next(new Error("Email is already in use", { cause: 409 }));
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({ first_name, last_name, email, password: hashedPassword, gender, phone_number, address, role });

  const accessToken = generateAccessToken({ id: newUser.id, email: newUser.email, role: newUser.role });
  const refreshToken = generateRefreshToken({ id: newUser.id });

  newUser.refreshToken = refreshToken;
  await newUser.save();

  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  return res.status(201).json({ message: "User created successfully", accessToken, data: newUser });
};
