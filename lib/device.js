var keychain = require('keychain');
var world = require('./world').World;
var authentication = require('./authentication');

var addid = function (devicename,deviceid) {
  keychain.getPassword({ account: 'lightmanUsername', service: 'lightman' }, function(err,username) {
    keychain.getPassword({ account: 'lightmanPassword', service: 'lightman' }, function(err,password) {
      if (password == null) {
        console.log("Not logged in");
      } else {
        world(function(world) {

          authentication.authenticate(username,password);
  
          // go into the provisioning portal
          spooky.then(function() {
            this.clickLabel('iOS Provisioning Portal','a');
          });

          // go to the Devices section
          spooky.then(function() {
            console.log("Navigating to Devices section...")
            this.clickLabel('Devices','a');
          });

          spooky.then(function() {
            this.click('[href="/ios/manage/devices/add.action"]');
          });


          spooky.then([{devicename:devicename,deviceid:deviceid},function() {
            console.log("Adding device name and id...")
            this.fill('form#add', {
                    'deviceNameList[0]': devicename,
                    'deviceNumberList[0]': deviceid
                }, true);
          }]);

          spooky.run();
  
        });
      }
    });  
  });    
};

exports.addid = addid;
