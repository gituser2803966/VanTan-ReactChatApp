import axios from "axios";

let BASE_URL = "http://localhost:5000/api/user";

axios.defaults.withCredentials = true;

// config post method
// var api = axios.create({
//   method: "post",
//   baseURL: BASE_URL,
//   // timeout: 1000,
//   headers: {
//     "content-type": "application/json",
//   },
// });

// get all user
export async function APIGetAllUser() {
  return await axios.get(BASE_URL + "/all");
}
// check user logged in with session cookie
export async function APIAuthenticationWithSessionCookie() {
  return await axios.get(BASE_URL + "/login");
}
//signout
export async function APISignout() {
  return await axios.get(BASE_URL + "/logout");
}

// register
export async function APISignup(userData) {
  return await axios.post(BASE_URL + "/register", userData);
}

// login with email and password
export async function APILoginWithEmailAndPassword(email, password) {
  return await axios.post(
    BASE_URL + "/login",
    {
      email,
      password,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
}

// upload file
// export function UploadUserProfile(file){
//   const formData = new FormData();
//   console.log('****',file[0])
//   formData.append('avatar',file[0]);
//   return axios.post("http://localhost:5000/api/user/uploadAvatar",formData,{
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   })
// }
