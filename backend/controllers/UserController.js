import UserModel from "../models/user.model.js";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import { generateToken } from "../helper/jwt.helper.js";
import { GetAllConversationForTheCurrentUser } from "./ConversationController.js";

dotenv.config();

const debug = console.log.bind(console);
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET ||
  "access-token-secret-example-@dijhfoisjdwomefwef";
// Thời gian sống của refreshToken
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
// Mã secretKey này phải được bảo mật tuyệt đối, các bạn có thể lưu vào biến môi trường hoặc file
const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret-example-@1234";

// upload profile
// export const UploadProfile = (req,res) =>{
//   console.log('req.file: ',req.file)
//   return true;
// }

//get all user
export const GetAllUser = (req, res) => {
  UserModel.find({}, (error, docs) => {
    if (error) {
      return res.status(404).send({
        error,
        success: false,
        message: "NOT FOUND DOC",
      });
    } else {
      return res.status(200).send({
        users: docs,
        success: true,
        message: "OK",
      });
    }
  });
};

// check loggedIn with session cooki
export const LoginWithSessionCookie = async (req, res) => {
  if (req.session.user) {
    const conversations = await GetAllConversationForTheCurrentUser(
      req.session.user._id
    );
    return res.status(200).json({
      logged: true,
      message: "đã đăng nhập rồi",
      user: req.session.user,
      conversations,
    });
  } else {
    return res.status(400).json({
      logged: false,
      message: "chưa đăng nhập",
    });
  }
};

// login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("co REQUEST TOI ...");
    const user = await UserModel.findOne({ email });

    if (!user) {
      // email không đúng
      return res.status(400).send({
        logged: false,
        error: "Email does not exist",
        message: "email không tồn tại",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      //nếu password không đúng
      return res.status(400).send({
        logged: false,
        error: "Password does not exist",
        message: "Mật khẩu không đúng",
      });
    }
    // user data
    const userData = {
      _id: user._id,
      email,
    };

    // tạo access token và refesh token
    const accessToken = await generateToken(
      userData,
      accessTokenSecret,
      accessTokenLife
    );
    const refreshToken = await generateToken(
      userData,
      refreshTokenSecret,
      refreshTokenLife
    );

    // lưu thông tin cookie vào tab trên browser
    req.session.user = user;
    // lấy ra tất cả các cuộc trò chuyện của user nếu có
    const conversations = await GetAllConversationForTheCurrentUser(user._id);
    return res.status(200).json({
      logged: true,
      accessToken,
      refreshToken,
      user,
      message: "you are logged",
      conversations,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// logout
export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send({ error: "Logout error" });
    }
    req.session = null;
    res.clearCookie(process.env.SESSION_NAME, { path: "/" });
    return res.send({
      logged: false,
      message: "you are logout",
    });
  });
};

// register
export const Register = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };
  UserModel.findOne({ email }, (error, userDoc) => {
    if (userDoc) {
      return res.status(400).send({
        message: "Email đã tồn tại",
        success: false,
        error,
      });
    } else {
      const user = new UserModel(userData);
      user.save((err, doc) => {
        if (err) {
          console.log("err ****** :", err);
          return res.status(400).send({
            success: false,
            message: "Email không hợp lệ",
            error: err,
          });
        } else {
          req.session.user = doc;
          // const token = await user.generateAuthToken();
          return res
            .status(200)
            .send({ success: true, message: "Đăng kí thành công", user: doc });
        }
      });
    }
  });
};
