import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
// import { generateToken } from "../helper/jwt.helper.js";

const userSchema = new mongoose.Schema({
    firstName:{
      type: String,
      required: true,
      trim: true,
    },
    lastName:{
      type: String,
      required: true,
      trim: true,
    },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
  createAt: {
    type: Date,
    default: Date.now,
  }
});

userSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// userSchema.methods.generateAuthToken = async function () {
//   // Generate an auth token for the user
//   const user = this;
//   // const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
//   const token = await generateToken(user, "ACCESS_TOKEN_SECRET");
//   user.tokens = user.tokens.concat({ token });
//   await user.save();
//   return token;
// };

// userSchema.statics.findByCredentials = async (email, password) => {
//   // Search for a user by email and password.
//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error({ invalidEmail: "Email không hợp lệ" });
//   }
//   const isPasswordMatch = await bcrypt.compare(password, user.password);
//   if (!isPasswordMatch) {
//     throw new Error({ invalidPassword: "Mật khẩu không hợp lệ" });
//   }
//   return user;
// };

const User = mongoose.model("User", userSchema);

export default User;
