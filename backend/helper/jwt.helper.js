// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
/**
 * private function generateToken
 * @param user
 * @param secretSignature
 * @param tokenLife
 */
export const generateToken = (user, secretSignature, tokenLife) => {
  return new Promise((resolve, reject) => {
    // Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây
    // Thực hiện ký và tạo token
    jwt.sign(
      { data: user },
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
};
/**
 * This module used for verify jwt token
 * @param {*} token
 * @param {*} secretKey
 */
export const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};
