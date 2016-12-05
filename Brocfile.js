const AssetRev       = require('broccoli-asset-rev'),
      mergeTrees     = require('broccoli-merge-trees'),
      BroccoliFunnel = require('broccoli-funnel'),
      BroccoliSass   = require('broccoli-sass'),
      Uglify         = require('broccoli-uglify-sourcemap'),
      env            = require('broccoli-env').getEnv();

// compile sass
let appCss = new BroccoliSass(['app'], 'styles/index.scss', 'index.css');

// uglify js
var appJs = Uglify('app/js', {
  mangle   : env === 'production',
  compress : env === 'production',
  sourceMapIncludeSources: env === 'production',
  sourceMapConfig: {
    enabled: env === 'production'
  }
});

// move images to top-level
var images = new BroccoliFunnel('app/images', {
  destDir: '/',
});

// exclude source files
var sourceFiles = new BroccoliFunnel('app', {
  exclude: ['styles/**/*', 'js/**/*', 'images/**/*']
});

// merge js, css and image file trees
// then figerprint
var rev = new AssetRev(mergeTrees([sourceFiles, images, appCss, appJs]), {
  extensions: ['js', 'css', 'png', 'jpg', 'gif', 'svg'],
  replaceExtensions: ['html', 'js', 'css'],
  generateAssetMap: true
});

module.exports = rev;
