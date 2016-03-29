module.exports = function (wallaby) {
  return {
    files: [
      'server/**/*.js',
      {pattern: 'server/**/*.spec.js', ignore: true}
    ],

    tests: [
      'server/**/*.spec.js'
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        // babel options
        // like `stage: n` for Babel 5.x or `presets: [...]` for Babel 6
        // (no need to duplicate .babelrc, if you have it, it'll be automatically loaded)
      })
    },

    env: {
      type: 'node',
      runner: 'node',  // or full path to any node executable,
      params: {
        env: 'NODE_ENV=development'
      }
    }
  };
};
