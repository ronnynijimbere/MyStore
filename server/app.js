const express = require ('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");



// connect to mongodb
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV === 'test') {
  mongoose.connect('mongodb://localhost/MyStoreTEST', { useNewUrlParser: true });
} else {
  mongoose.connect('mongodb://localhost/MyStore', { useNewUrlParser: true });
}

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

//Middlewares: these will run in sequence when our we run our routes
if (!process.env.NODE_ENV === 'test') {
	app.use(morgan('dev'));
}


app.use(bodyParser.json());

//Routes
app.use('/users', require('./routes/users'));


module.exports = app;