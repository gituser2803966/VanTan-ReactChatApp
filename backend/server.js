import * as dotenv from 'dotenv';
import express from "express";
import { Server } from "socket.io";
import db from "./db.js";
import { createServer } from "http";
import session from "express-session";
import MongoStore from 'connect-mongo'
import cors from "cors";
import userRouters from "./routes/user.js";

// use .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.use(express.json());
// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);


// a middleware which checks the username and allows the connection:
io.use((socket, next) => {
  // const username = socket.handshake.auth.username;
  const {_id,firstName,lastName,email} = socket.handshake.auth;
  // const username = socket.handshake.username;
  console.log('username: ',firstName)
  console.log('email',email,'connected')
  console.log('id:',_id)
  if (!email) {
    return next(new Error("invalid username"));
  }
  socket._id = _id;
  socket.email = email;
  socket.username = firstName+""+lastName;
  next();
});

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  session_config.cookie.secure = true // server secure cookies
}

// set session
app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGOOSE_CONNECTION_URL,
    // mongoOptions: advancedOptions // See below for details
  })
}));

// user routers
app.use("/api/user", userRouters);

// socket io
io.on("connection", (socket) => {
  // console.log("socket ", socket);
  const users = [];
  for (let [, socket] of io.of("/").sockets) {
    users.push({
      _id: socket._id,
      email: socket.email,
    });
    // will emit to all connected clients, except the socket itself.
    socket.broadcast.emit("user connected", {
      _id: socket._id,
      email: socket.email,
      username: socket.username,
      status: true,
    });
  }

  // gởi sự kiện user đăng xuất xuống client
  socket.on("user logout",({user})=>{
    socket.broadcast.emit("user logout",{
      _id: user._id,
      email: user.email,
      username: user.firstName+""+user.lastName,
      status: false,
    })
  })

  //would have sent the “user connected” event to all connected clients, including the new user.
  // socket.emit("users", users);
  socket.join(socket._id);
  socket.on("send-message", ({ recipients, text }) => {
    console.log("recipients: ", recipients);
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      console.log("newRecipients 0: ", newRecipients);
      console.log('socket id:',socket._id);
      newRecipients.push(socket._id);
      console.log("newRecipients 1: ", newRecipients);
      socket.to(recipient).to(socket._id).emit("receive-message", {
        recipients: newRecipients,
        sender: socket._id,
        text,
      });
    });
  });
});

httpServer.listen(PORT, () => {
  console.log("server running on port", PORT);
});

