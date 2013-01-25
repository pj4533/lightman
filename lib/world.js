var Spooky = require('spooky');
var path = require('path');
var fs = require('fs');

var World = function World(callback) {
  var spooky;
  var world = this;
  var lib = path.join(path.dirname(fs.realpathSync(__filename)), '../lib');
  spooky = world.spooky = new Spooky({
    casper: {
      logLevel: 'debug',
      verbose: true,
      clientScripts: [lib + "/jquery.min.js"],
      waitTimeout: 60000
    }
  }, function (error) {
    if (error) {
      console.dir(error);
      throw new Error('Failed to initialize context.spooky: ' + error.code + ' - ' + error.message);
    }
    
    spooky.on('error', function(e) {
      console.error(e);
    });

    spooky.on('console', function(line) {
      console.log(line);
    });
    
    spooky.on('log', function(log) {
      if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
      }
    });

   callback(world);
  });
};

module.exports.World = World;
