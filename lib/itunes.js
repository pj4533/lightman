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
            //     }, false);
          }]);
          spooky.run();

        });
      }
    });
  });
};

var updateApp = function(appname, version, description){
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
              return $('.seeAll').children().children().attr('href');
            });
            this.click('[href="'+ href + '"]');
          });

          spooky.then([{appname:appname},function() {
            var apps = this.evaluate(function() {
              var blkstr = $.map( $('div.sorted').find('a'), function(val,index) {
                   return val.innerHTML;
              });
              return blkstr;
            });
            var urls = this.evaluate(function() {
              var blkstr = $.map( $('div.sorted').find('a'), function(val,index) {
                   return val.toString();
              }).join(" ").split(' https://itunesconnect.apple.com');
              return blkstr;
            });
            for (var i = apps.length - 1; i >= 0; i--) {
              if(apps[i] === appname){
                this.click('[href="'+ urls[i] + '"]');
              }
            }
          }]);

          spooky.then(function(){
            var href = this.evaluate(function(){
              return $('.blue-btn:contains("Add Version")').attr('href');
            });
            this.click('[href="' + href + '"]');
          });

          spooky.then([{version:version, description:description}, function(){
            this.evaluate(function(){
              document.querySelector('input[type="text"]').setAttribute('name', 'version');
              document.querySelector('textarea').setAttribute('name', 'description');
            });
            this.fill('form', {
                    'version': version,
                    'description': description
                }, false);
            this.captureSelector('form.png', 'form');
          }]);
          spooky.run();

        });
      }
    });
  });
};
exports.updateApp = updateApp;
exports.addNewApp = addNewApp;