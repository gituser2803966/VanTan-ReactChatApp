import axios from "axios";

const BASE_URL = "http://localhost:5000/api/user";

axios.defaults.withCredentials = true;

const api = axios.create({
  method: "post",
  baseURL: BASE_URL,
  // timeout: 1000,
  headers: {
    "content-type": "application/json",
  },
});

export async function CheckLoginWithSessionCooki() {
  const respone = await axios.get("http://localhost:5000/api/user/login");
  return respone;
}

export async function LoginWithEmailAndPassword(email, password) {
  const response = await api.post("/login", {
    email,
    password,
  });
  return response;
}
