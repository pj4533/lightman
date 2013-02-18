var keychain = require('keychain');
var world = require('./world').World;
var authentication = require('./authentication');

var addNewApp = function(appname, skunumber){
	keychain.getPassword({ account: 'lightmanUsername', service: 'lightman' }, function(err,username) {
    keychain.getPassword({ account: 'lightmanPassword', service: 'lightman' }, function(err,password) {
      if (password === null) {
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

          spooky.then([{appname:appname,skunumber:skunumber},function() {
            console.log("Entering App Information...");
            var name = this.evaluate(function(){
              return $('#appNameUpdateContainerId').children().children('span').children().attr('name');
            });
            var sku = this.evaluate(function(){
              return $('.metadataFieldReadonly').children('input').attr('name');
            });
            console.log("App Name Field: " + name);
            console.log("App Name: " + appname);
            console.log("SKU Number: " + skunumber);
            console.log("SKU Number Field: " + sku);
            // this.fill('form', {
            //         name: appname,
            //         sku: skunumber
            //     }, true);
          }]);
          spooky.run();

        });
      }
    });
  });
};

exports.addNewApp = addNewApp;