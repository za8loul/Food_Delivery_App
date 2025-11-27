import User from "../../../DB/Models/users.model.js";
import { generateAccessToken, verifyRefreshToken } from "../../../Utils/token.utils.js";

export const refreshTokenService = async (req, res, next) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return next(new Error("Refresh token not provided", { cause: 401 }));
    }

    try {
        const decoded = verifyRefreshToken(refreshToken);

        const user = await User.findOne({ where: { id: decoded.id, refreshToken } });
        if (!user) {
            return next(new Error("Invalid refresh token", { cause: 403 }));
        }

        const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });

        res.json({ message: "Access token refreshed successfully", accessToken });
    } catch (error) {
        return next(new Error("Invalid refresh token", { cause: 403 }));
    }
};
