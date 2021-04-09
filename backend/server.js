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
  // const username = socket.handshake.auth.username;
  const _id = socket.handshake.auth._id;
  const username = socket.handshake.auth.username;
  console.log("_id: ", _id);
  console.log("username: ", username);
  if (!username) {
    return next(new Error("invalid username"));
  }
  // socket.username = username;
  socket._id = _id;
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
    // maxAge: 3600000,
  },
};

app.use(session(session_config));

// user routers
app.use("/api/user", userRouters);

// socket io
io.on("connection", (socket) => {
  // console.log("socket ", socket);
  const users = [];
  for (let [, socket] of io.of("/").sockets) {
    users.push({
      _id: socket._id,
      username: socket.username,
    });
    // notify the existing users
    socket.broadcast.emit("user connected", {
      _id: socket._id,
      username: socket.username,
    });
  }
  //
  socket.emit("users", users);
  socket.join(socket._id);
  socket.on("send-message", ({ recipients, text }) => {
    console.log("server nhan su lien emit tu client");
    console.log("recipients: ", recipients);
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(socket._id);
      console.log("newRecipients: ", newRecipients);
      socket.to(recipient).to(socket._id).emit("receive-message", {
        recipients: newRecipients,
        sender: socket._id,
        text,
      });
    });
  });
  //
  // socket.on("private message", ({ message, to, from }) => {
  //   console.log(message);
  //   console.log(from);
  //   console.log(to);
  //   socket.to(to).emit("private message", {
  //     message,
  //     from,
  //   });
  // });
  // console.log("co ", users.length, " user connected");
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
