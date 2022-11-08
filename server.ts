import { config } from "dotenv";
import { connect } from "mongoose";
config();

const PORT = process.env.PORT || 8080;

connect(process.env.MONGO_PATH as string, {}, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    console.log("Connected to mongo!");
  }
});

import app from "./app";

app.listen(PORT, () => {
  console.log(`Server ready listening on ${PORT}`);
});
