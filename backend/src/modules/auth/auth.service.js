import bcrypt from "bcryptjs";
import User from "./auth.model.js";
import jwt from "jsonwebtoken";


const createUser = async (userData) => {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({
        ...userData,
        password: hashedPassword,
    });

    return user;
};


const loginUser = async (email, password) => {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare password
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        throw new Error("Invalid email or password");
    }

    // Generate JWT
    const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    const userResponse = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    state: user.state,
    district: user.district,
    language: user.language,
    role: user.role,
    profileImage: user.profileImage,
    };

    return {
    user: userResponse,
    token,
    };
};
// get profile
const getProfile = async (userId) => {
    const user = await User.findById(userId).select("-password -__v");

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export { createUser, loginUser ,getProfile};




