const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./db');
const AuthRoute = require('./routes/usersRoute');
const cookieParser = require('cookie-parser');
const Productroute = require('./routes/productRoute');
app.use(cookieParser());

// view engine setup
app.use(express.json({limit:"4mb"}));
app.use('/auth/', AuthRoute);
app.use('/product/' , Productroute)


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
