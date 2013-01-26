var keychain = require('keychain');
var world = require('./world').World;
var authentication = require('./authentication');

var list = function () {
  
  keychain.getPassword({ account: 'lightmanUsername', service: 'lightman' }, function(err,username) {
    keychain.getPassword({ account: 'lightmanPassword', service: 'lightman' }, function(err,password) {
      if (password == null) {
        console.log("Not logged in");
      } else {
        world(function(world) {

          authentication.authenticate(username,password);
  
          spooky.then(function() {
            console.log(this.getHTML('[name="memberDisplayId"]'));
          });
            
          spooky.run();
        });
      }
    });  
  });  
};

exports.list = list;