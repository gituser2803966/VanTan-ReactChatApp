import mongoose from "mongoose";
const CONNECTION_URL =
  "mongodb+srv://tan123:MLPrXK0G5sYXh7Uh@cluster0.qfjwb.mongodb.net/ReactChatApp?retryWrites=true&w=majority";
export default mongoose.connect(
  CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("DB connect succesfully ...");
    } else {
      console.log("DB connect fail " + err);
    }
  }
);
// module.exports = db
