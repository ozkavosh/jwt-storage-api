import { model, Schema } from "mongoose";

const taskSchema = new Schema({
  ownerEmail: { type: "string", require: true},
  title: { type: "string", require: true },
  body: { type: "string", require: true },
  status: { type: "string", require: true },
  finishedAt: { type: "string", require: true },
  createdAt: { type: "string" },
});

export default model("Task", taskSchema, "tasks");
