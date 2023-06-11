const express = require("express");
const { connectDB, disconnectDB } = require("./config/db");
const port = process.env.PORT || 3001;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config({ path: ".env" });

// cors whitelist
const whitelist = [ 
  'http://localhost:3000/', // not https
]
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {

      // `!origin` allows server-to-server requests (ie, localhost requests)
      if(!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true)
      } else {
          callback(new Error("Not allowed by CORS: "+ origin))
      }
  },
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/student", require("./routes/studentRoute"));
app.use("/api/company", require("./routes/companyRoute"));

const serverStart = async () => {
  try {
    connectDB();
    app.listen(process.env.PORT || 3001, () => {
      console.log(
        `Server ready at http://localhost:${process.env.PORT || 3001}`
      );
    });
  } catch (error) {
    console.err("Error while connecting to database", error);
  }
};

serverStart();
