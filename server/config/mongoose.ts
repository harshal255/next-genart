import { connect } from "mongoose";
import config from "./index.js";

const connectMongoose = async () => {
  try {
    await connect(config.mongodb_url_atlas as string);
    console.log("=============Database connection successfully=============");
  } catch (error) {
    console.log("=============Database error=============", error);
  }
};
export default connectMongoose;