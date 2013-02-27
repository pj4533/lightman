var keychain = require('keychain');
var world = require('./world').World;
var authentication = require('./authentication');

var getApps = function(){
  keychain.getPassword({ account: 'lightmanUsername', service: 'lightman' }, function(err,username) {
    keychain.getPassword({ account: 'lightmanPassword', service: 'lightman' }, function(err,password) {
      if (password === null) {
        console.log("Not logged in");
      } else {
        world(function(world) {
          authentication.fbAuth(username,password);

          spooky.then(function() {
            console.log("Managing Applications...");
          });
        });
      }
    });
  });
};

exports.getApps = getApps;