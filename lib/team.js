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
          
            var numTeams = this.evaluate(function() {
              return $('#teams').find('option').length;
            });
            
            for (var i=0;i<numTeams;i++) {
              var thisTeam = this.evaluate(function(i) {
                return $('#teams').find('option')[i];
              },i);
              console.log(thisTeam.text + " (id: " + thisTeam.value + ")");
            }
            
          });
            
          spooky.run();
        });
      }
    });  
  });  
};

exports.list = list;