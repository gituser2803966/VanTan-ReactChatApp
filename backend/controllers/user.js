import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../helper/jwt.helper.js";
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

// check loggedIn with session cooki
export const LoginWithSessionCooki = (req, res) => {
  if (req.session.user) {
    return res.status(200).json({
      loggedin: true,
      message: "đã đăng nhập rồi",
      user: req.session.user,
    });
  } else {
    return res.status(400).json({
      loggedin: false,
      message: "chưa đăng nhập",
    });
  }
};

export const login = async (req, res) => {
  try {
    // req.session.VANTAN = "test_session_value";
    // debug(`test session`);
    // kiem tra email cua nguoi dung
    const { email, password } = req.body;
    // console.log("co REQUEST TOI ...");
    const user = await User.findOne({ email });

    if (!user) {
      // email không đúng
      return res.status(400).send({
        loggedin: false,
        error: "Email does not exist",
        message: "email không tồn tại",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      //nếu password không đúng
      return res.status(400).send({
        loggedin: false,
        error: "Password does not exist",
        message: "Mật khẩu không đúng",
      });
    }
    // console.log("user info ", user);

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
    // debug(`Thực hiện tạo mã Refresh Token, [thời gian sống 10 năm] =))`);
    const refreshToken = await generateToken(
      userData,
      refreshTokenSecret,
      refreshTokenLife
    );
    // debug(`Gửi Token và Refresh Token về cho client...`);
    req.session.user = user;
    return res.status(200).json({
      loggedin: true,
      accessToken,
      refreshToken,
      user,
      message: "đăng nhập thành công ...",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
// register
export const register = async (req, res) => {
  try {
    const userData = {
      email: req.body.email,
      password: req.body.password,
    };
    const isUserExist = await User.findOne({ email: userData.email }).exec();
    if (isUserExist) {
      // neu email da ton tai
      res.status(400).send({ error: "Email đã tồn tại" });
    } else {
      const user = new User(userData);
      await user.save();
      // const token = await user.generateAuthToken();
      res.status(200).send({ message: "Đăng kí thành công", user });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
