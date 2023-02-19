const express = require('express')
const connecDB = require('./config/db')
const port = process.env.PORT || 3001
const cors = require("cors");
const app = express()

require('dotenv').config()

connecDB()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/student',require('./routes/studentRoute'))
app.use('/api/company',require('./routes/companyRoute'))

app.listen(port,()=> console.log("Running on port "+port))