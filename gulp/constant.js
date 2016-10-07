'use strict';

import gulp from 'gulp';
import _ from 'lodash';
import conf from './conf';
import gulpLoadPlugins from 'gulp-load-plugins';

let plugins = gulpLoadPlugins();

gulp.task('constant', function () {

  let sharedConfig;

  try {
    sharedConfig = require(`../${conf.serverPath}/config/environment/shared`);
  } catch (err) {
    sharedConfig = {};
  }

  let localConfig;

  try {
    localConfig = require(`../${conf.serverPath}/config/local.env.js`);
    if (conf.isBuild) {
      localConfig = _.assign(localConfig, localConfig.build);
    }
  } catch (err) {
    localConfig = {};
  }


  let {AUTH_URL, AUTH_API_URL} = localConfig;
  let saaAppConfigConstants = {
    authApi: AUTH_URL,
    authApiUrl: AUTH_API_URL,
    loginState: 'auth.login'
  };

  let merged = _.merge({}, sharedConfig, localConfig);
  let appConfigConstants = {};
  _.each(merged, function (val, key) {
    if (sharedConfig[key] && localConfig[key]) {
      appConfigConstants[key] = val;
    }
  });


  return plugins.ngConstant({
      name: 'authApiApp.constants',
      deps: [],
      wrap: `(function() {<%= __ngModule %>})();`,
      stream: true,
      templatePath: 'gulp/ng-constant.tpl.ejs',
      constants: {
        appConfig: appConfigConstants,
        saaAppConfig: saaAppConfigConstants
      }
    })
    .pipe(plugins.rename({
      basename: 'app.constant'
    }))
    .pipe(gulp.dest(`${conf.clientPath}/app/`))
});
