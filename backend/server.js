import express from "express";
import { Server } from "socket.io";
import db from "./db.js";
import { createServer } from "http";
import session from "express-session";
import cors from "cors";
import userRouters from "./routes/user.js";

const app = express();
const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//  a middleware which checks the username and allows the connection:
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  console.log("socket usernamne **** ", username);
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
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

var session_config = {
  name: "sid",
  secret: "session_secret_key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
  },
};

app.use(session(session_config));

// user routers
app.use("/api/user", userRouters);

// socket io
io.on("connection", (socket) => {
  // console.log("socket ", socket);
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  console.log("co ", users.length, "connected");
  // socket.emit("users", users);
  console.log("a new user connected ** ...");
});

httpServer.listen(PORT, () => {
  console.log("server running on port", PORT);
});

// session
// app.use(
//   session({
//     secret: "VANTAN",
//     //don't save session if unmodified
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl:
//         "mongodb+srv://tan123:MLPrXK0G5sYXh7Uh@cluster0.qfjwb.mongodb.net/ReactChatApp?retryWrites=true&w=majority",
//       dbName: "ReactChatApp",
//       stringify: false,
//     }),
//   })
// );
