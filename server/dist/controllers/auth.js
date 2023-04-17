import userSchema from "../models/user.js";
import bcrypt from "bcrypt";
export const authController = {
    register: async (req, res) => {
        try {
            const { password, email } = req.body;
            const newUser = new userSchema({
                email,
                password,
            });
            await newUser.save();
            res.status(201).json({
                msg: "Register Success ",
                user: newUser,
            });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const userFound = await userSchema.findOne({ email });
            if (!userFound) {
                return res.status(401).json({ msg: "The Email Is Wrong" });
            }
            // return real password
            const matchPassword = await bcrypt.compare(password, userFound.password);
            if (!matchPassword) {
                return res.status(401).json({ msg: "Password is incorrect" });
            }
            res.json({
                msg: "Login Success.",
                user: userFound,
            });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};
//# sourceMappingURL=auth.js.map