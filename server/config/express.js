/**
 * Express configuration
 */

'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import shrinkRay from 'shrink-ray';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';
import path from 'path';
import passport from 'passport';
import cors from 'cors';
import expressSession from 'express-session';

import config from './environment';

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
  app.set('view engine', 'pug');
  app.use(shrinkRay());
  app.use(cors({
    allowedHeaders: ['X-Page-Size', 'X-Start-Page', 'Authorization', 'Content-Type', 'X-Return-Post'],
    exposedHeaders: ['X-Aggregate-Count']
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());

//Session Configuration
  var sessionConfig = {
    saveUninitialized: false,
    resave: false,
    secret: config.secrets.session,
    store: sessionStorage,
    key: 'authAPI.sid',
    cookie: {
      maxAge: config.session.maxAge * 1000
    }
  };

  // FIXME app crashes on req.session.returnTo if client didn't send the cookie

  if (env === 'production') {
    app.set('trust proxy', 1);
    // sessionConfig.cookie.secure = true;
  }

  app.use(expressSession(sessionConfig));

  app.use(passport.initialize());
  //app.use(passport.session());

  app.set('appPath', path.join(config.root, 'client'));

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
  }

  if(env === 'development') {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const stripAnsi = require('strip-ansi');
    const webpack = require('webpack');
    const makeWebpackConfig = require('../../webpack.make');
    const webpackConfig = makeWebpackConfig({ DEV: true });
    const compiler = webpack(webpackConfig);
    const browserSync = require('browser-sync').create();

    /**
     * Run Browsersync and use middleware for Hot Module Replacement
     */
    browserSync.init({
      open: false,
      logFileChanges: false,
      proxy: 'localhost:' + config.port,
      ws: true,
      middleware: [
        webpackDevMiddleware(compiler, {
          noInfo: false,
          stats: {
            colors: true,
            timings: true,
            chunks: false
          }
        })
      ],
      port: config.browserSyncPort,
      plugins: ['bs-fullscreen-message']
    });

    /**
     * Reload all devices when bundle is complete
     * or send a fullscreen error message to the browser instead
     */
    compiler.plugin('done', function(stats) {
      console.log('webpack done hook');
      if(stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.sockets.emit('fullscreen:message', {
          title: 'Webpack Error:',
          body: stripAnsi(stats.toString()),
          timeout: 100000
        });
      }
      browserSync.reload();
    });
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
}
