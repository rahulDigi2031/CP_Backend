const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const connectDB = require('./db');
const cookieParser = require('cookie-parser');
const ProductRoute = require('./routes/productroute');
const AuthRoute = require('./routes/usersRoute');
const status =  require('express-status-monitor')

app.use(cookieParser());
app.use(status())


// view engine setup
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods:["get" , "post" , "patch" , "delete"]
}))
app.use(express.json({limit:"4mb"}));
app.use('/auth/', AuthRoute);
app.use('/product/' , ProductRoute)



// error handler
app.listen(process.env.PORT , async()=> {
  try {
      await connectDB()
      console.log(`server is running on port http://localhost:${process.env.PORT}/`)
  } catch (error) {
    console.log(error);
  }
})

module.exports = app;
