var debounce = require('lodash.debounce');
var chokidar = require('chokidar');
var exec = require('child_process').exec;
var server = require('pushstate-server');
var instantiatedServer;
var runningServerSetup = 0;

var startServer = function() {
  runningServerSetup++;
  if (runningServerSetup > 1) return;
  var cmd = 'rm -rf dist && BROCCOLI_ENV=production broccoli build dist';

  exec(cmd, function(error, stdout, stderr) {
    if (error) {
      console.error(stderr);
      if (instantiatedServer) instantiatedServer.close();
      if (watcher) watcher.close();
      return;
    }

    console.error(stdout);
    if (instantiatedServer) instantiatedServer.close();
    instantiatedServer = server.start({
      port: 8080,
      directory: './dist'
    }, function() {
      if (runningServerSetup > 1) {
        runningServerSetup = 0;
        restartServer();
        return;
      }
      runningServerSetup = 0;
      console.log('Server started at ', 'http://localhost:8080');
    });
  });
};

var restartServer = debounce(startServer, 500);

var watcher = chokidar.watch('app/**/*', {
  ignored: /[\/\\]\./
});

var log = console.log.bind(console);

watcher
  .on('add', function(path) { log('File', path, 'has been added'); restartServer(); })
  .on('addDir', function(path) { log('Directory', path, 'has been added'); })
  .on('change', function(path) { log('File', path, 'has been changed'); restartServer(); })
  .on('unlink', function(path) { log('File', path, 'has been removed'); restartServer(); })
  .on('unlinkDir', function(path) { log('Directory', path, 'has been removed'); })
  .on('error', function(error) { log('Error happened', error); })
  .on('ready', function() { log('Initial scan complete. Ready for changes.'); restartServer(); })
