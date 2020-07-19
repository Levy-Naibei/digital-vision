import jwt from 'jsonwebtoken';
import User from "../../../models/user";

/**
 * Login mutation that logs user into the app
 * @param _
 * @param req
 * @returns {Promise<{message: string, token: (undefined|*), status: string}|Error>}
 * @constructor
 */
export const Login = async (_, req) => {
    const { email, password } = req;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return new Error('Unauthorized access. Please contact admin');
        }
        if(user.password !== password) {
            return new Error('Wrong username/password')
        }
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: 60 * 60 }
        );
        return { token, message: "Login successful", status: "success" };
    } catch(err) {
        console.error(err)
    }
}

/**
 * Signup mutation that handles signing up users to our application
 * @param _
 * @param req
 * @returns {Promise<{message: string}>}
 * @constructor
 */
export const Signup = async (_, req) => {
    const { email, password } = req;
    try {
        const user = await User.findOne({ email });
        if(!user) {
            const newUser = await new User({ email, password });
            newUser.save();
            return {
                message: 'User created successfully'
            }
        }
        return new Error('User already exists');
    } catch(err) {

    }
}

