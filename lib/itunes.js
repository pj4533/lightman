var keychain = require('keychain');
var world = require('./world').World;
var authentication = require('./authentication');

var addNewApp = function(){
	keychain.getPassword({ account: 'lightmanUsername', service: 'lightman' }, function(err,username) {
    keychain.getPassword({ account: 'lightmanPassword', service: 'lightman' }, function(err,password) {
      if (password == null) {
        console.log("Not logged in");
      } else {
        world(function(world) {

          authentication.iTunesConnectAuthenticate(username,password);
          // spooky.wait(5000, function() {
          //    this.echo("WAITED 5 SECS");
          // });
          spooky.then(function(){
            href = this.evaluate(function(){
              return $('a:contains("Manage Your Applications")').attr('href');
            });
            this.click('[href="'+ href + '"]');
          });

          spooky.then(function(){
            href = this.evaluate(function(){
              return $('.upload-app-button').children().attr('href');
            });
            this.click('[href="'+ href + '"]');
            console.log('Adding New App...');
          });

          spooky.run();

        });
      }
    });
  });
};

exports.addNewApp = addNewApp;