import dotenv from 'dotenv'
import * as path from 'path'
import logger from 'morgan';
import express from "express";
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import { errorReporter } from 'express-youch';
import "reflect-metadata";
import 'express-async-errors';

dotenv.config()

// Express modules
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Express routes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next()
})
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/projects', require('./routes/projects'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorReporter());

app.listen(9090, () => console.log(`Example app listening at http://localhost:9090`))


module.exports = app;