const express = require("express");
const { connectDB, disconnectDB } = require("./config/db");
const port = process.env.PORT || 3001;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

require("dotenv").config({ path: ".env" });

app.use(cors());
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
