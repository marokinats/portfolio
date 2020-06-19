'use strict';

module.exports = function () {
  $.gulp.task('js:process', function () {
    return $.gulp.src($.path.app)
      .pipe($.mode.development($.gp.sourcemaps.init()))
      .pipe($.webpackStream({
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              use: [{
                loader: 'babel-loader',
                options: {
                  presets: [
                    ['@babel/preset-env',
                      {
                        'targets': {
                          'chrome': '58',
                          'ie': '11'
                        }
                      }
                    ]
                  ]
                }
              }]
            }
          ]
        },
        mode: $.mode.development() ? "development" : "production"
      }))
      .pipe($.gp.concat('app.js'))
      .pipe($.mode.development($.gp.sourcemaps.write()))
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};
