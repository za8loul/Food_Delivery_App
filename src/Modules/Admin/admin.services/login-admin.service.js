import User from "../../../DB/Models/user.model.js";
import { comparePassword } from "../../../Utils/encryption.utils.js";
import { generateAccessToken } from "../../../Utils/token.utils.js";

export const adminLoginService = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ where: { email, role: "admin" } });
    if (!admin) return next(new Error("Admin not found", { cause: 401 }));

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) return next(new Error("Wrong password", { cause: 401 }));

    const token = generateAccessToken({ id: admin.id, role: "admin" });

    res.json({ message: "Admin login successful", token });
  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    next(err);
  }
};
