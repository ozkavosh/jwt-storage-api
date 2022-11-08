import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: "string", require: true },
  password: { type: "string", require: true },
  email: { type: "string", require: true },
});

export default model("User", userSchema, "users");
