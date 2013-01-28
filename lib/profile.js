var keychain = require('keychain');
var world = require('./world').World;
var authentication = require('./authentication');

var listDist = function () {
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
            console.log("Navigating to Provisioning section...")
            this.clickLabel('Provisioning','a');
          });

          spooky.then(function() {
            this.click('[href="/ios/manage/provisioningprofiles/viewDistributionProfiles.action"]');
          });

          spooky.then(function() {
            console.log("\nProfiles:\n")
            
            var numProfiles = this.evaluate(function() {
              return $('td.profile').find('span').length;
            });
            
            // HAAAAALP, I need help here...this code sucks the life out of me.   XCODE COME BAAAACK!
            // for (var i=0;i<numProfiles;i++) {
              var thisProfile = this.evaluate(function() {
                var blkstr = $.map( $('td.profile').find('span'), function(val,index) {                    
                     return val.innerHTML;
                }).join("\n"); 
                
                return blkstr
              });
              console.log(thisProfile);
            // }
          });

          spooky.run();
  
        });
      }
    });  
  });    
};

var manageAddAll = function (profilename) {
  if (profilename == null) {
    console.log("Need to specify a profile name.");
    return;
  } 
  
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
            console.log("Navigating to Provisioning section...")
            this.clickLabel('Provisioning','a');
          });

          spooky.then(function() {
            this.click('[href="/ios/manage/provisioningprofiles/viewDistributionProfiles.action"]');
          });

          spooky.then([{profilename:profilename},function() {
            var href = this.evaluate(function(profilename) {
              return $('td.profile:contains("givingtree ad hoc")').parents('tr').children('td:last').find('a:contains("Modify")').attr('href');
            }, profilename);
            this.click('[href="'+ href + '"]');
          }]);

          // TODO:
          // - choose check box
          // - hit submit
          // - download new profile
          // - profit.
          
          // say cheeze!
          spooky.then(function() {
            this.capture('lightman.png');
          });

          spooky.run();
  
        });
      }
    });  
  });    
};

exports.manageAddAll = manageAddAll;
exports.listDist = listDist;