const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./db');
const AuthRoute = require('./routes/users');

// view engine setup
app.use(express.json());
app.use('/auth/', AuthRoute);


// error handler
app.listen(process.env.PORT , async()=> {
  try {
      await connectDB()
      console.log(`server is running on port ${process.env.PORT}`)
  } catch (error) {
    console.log(error);
  }
})

module.exports = app;
