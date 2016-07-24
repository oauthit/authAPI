/**
 * Express configuration
 */

'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';
import path from 'path';
import config from './environment';
import passport from 'passport';
import cors from 'cors';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';

export default function(app) {
  var env = app.get('env');
  let sessionStorage;

  if (config.session.type === 'RedisStore') {

    var RedisStore = require('connect-redis')(expressSession);
    var redisConfig = config.redisSessionConfig;
    console.log('Using RedisStore for the Session');
    sessionStorage = new RedisStore(redisConfig);
  }

  app.set('views', config.root + '/server/views');
  app.set('view engine', 'jade');
  app.use(compression());
  app.use(cors({
    allowedHeaders: ['X-Page-Size', 'X-Start-Page', 'Authorization', 'Content-Type', 'X-Return-Post'],
    exposedHeaders: ['X-Aggregate-Count']
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use(cookieParser());
//Session Configuration
  var sessionConfig = {
    saveUninitialized: true,
    resave: true,
    secret: config.secrets.session,
    store: sessionStorage,
    key: 'authAPI.sid',
    cookie: {
      maxAge: config.session.maxAge * 1000
    }
  };

  app.use(expressSession(sessionConfig));

  app.use(passport.initialize());
  //app.use(passport.session());

  app.set('appPath', path.join(config.root, 'client'));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
  }

  if ('development' === env) {
    app.use(require('connect-livereload')());
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
}
