const express = require('express')
const connecDB = require('./config/db')
const port = process.env.PORT || 3001


connecDB()

require('dotenv').config()

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/student',require('./routes/studentRoute'))
app.use('/api/company',require('./routes/companyRoute'))

app.listen(port,()=> console.log("Running on port "+port))