"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const mongoose_1 = require("mongoose");
(0, dotenv_1.config)();
const PORT = process.env.PORT || 8080;
(0, mongoose_1.connect)(process.env.MONGO_PATH, {}, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    else {
        console.log("Connected to mongo!");
    }
});
const app_1 = __importDefault(require("./app"));
app_1.default.listen(PORT, () => {
    console.log(`Server ready listening on ${PORT}`);
});
