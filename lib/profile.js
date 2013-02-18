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
            console.log("Navigating to Provisioning section...");
            this.clickLabel('Provisioning','a');
          });

          spooky.then(function() {
            this.click('[href="/ios/manage/provisioningprofiles/viewDistributionProfiles.action"]');
          });

          spooky.then([{profilename:profilename},function() {
            console.log("Modifying profile...");
            var href = this.evaluate(function(profilename) {
              return $('td.profile:contains("' + profilename + '")').parents('tr').children('td:last').find('a:contains("Modify")').attr('href');
            }, profilename);
            this.click('[href="'+ href + '"]');
          }]);

          // TODO:
          // - choose check box
          spooky.thenEvaluate(function() {
            console.log("Selecting all devices...");
            var allInputs = document.getElementsByTagName("input");
            for (var i = 0, max = allInputs.length; i < max; i++){
                if (allInputs[i].type === 'checkbox')
                    allInputs[i].checked = true;
            }
          });

          spooky.then(function() {
            console.log("Saving new profile...");
            this.click('#save_submit');
          });

          // - download new profile
          spooky.then([{profilename:profilename},function() {
            var href = this.evaluate(function(profilename) {
              return $('td.profile:contains("' + profilename + '")').parents('tr').children('td:last').children('a').attr('href');
            }, profilename);
            console.log("Downloading profile...");
            this.download(this.getElementAttribute('[href^="' + href + '"]', 'href'), 'profile.mobileprovision');
          }]);


          // - profit.


          spooky.run();

        });
      }
    });
  });
};

exports.manageAddAll = manageAddAll;
exports.listDist = listDist;
