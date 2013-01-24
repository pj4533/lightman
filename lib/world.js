var Spooky = require('spooky');

var World = function World(callback) {
  var spooky;
  var world = this;

  spooky = world.spooky = new Spooky({
    casper: {
      logLevel: 'debug',
      verbose: true
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
