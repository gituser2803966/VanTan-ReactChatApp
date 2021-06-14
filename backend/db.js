import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const CONNECTION_URL = process.env.MONGOOSE_CONNECTION_URL;
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
