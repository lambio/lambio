import dotenv from 'dotenv'
import * as path from 'path'
import logger from 'morgan';
import express from "express";
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import {errorReporter} from 'express-youch';
import {createConnection} from "typeorm";
import "reflect-metadata";
import 'express-async-errors';
// Import routes
import {router as projectsRouter} from './routes/Projects'
import {router as assetsRouter} from './routes/Assets'

dotenv.config()
createConnection().then(async connection => {
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

  app.use('/projects', projectsRouter);
  app.use('/assets', assetsRouter);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(errorReporter());

  app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
  })
});
