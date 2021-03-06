var keychain = require('keychain');
var world = require('./world').World;
var authentication = require('./authentication');

var createDist = function (csr) {
  if (csr == null) {
    console.log("Need to specify a CSR file.");
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
          // go to the certificates section
          spooky.then(function() {
            console.log("Certificates...");
            this.clickLabel('Certificates','a');
          });

          // go to the distrobution certificates section
          spooky.then(function() {
            this.click('[href="/ios/manage/certificates/team/distribute.action"]');
          });
  
          // click request dist certificate
          spooky.then(function() {
            this.click('img[alt="Request Certificate"]');
          });    
  
          // pass in CSR filename  
          spooky.then([{csr:csr},function() {
            console.log("Requesting Certificate...");
            this.fill('form#save', {
                    'upload': csr
                }, true);
          }]);
  
          // for for pending issuence
          spooky.then(function() {
            if (!this.exists('img[alt="download"]')) {
              this.wait(5000, function() {
                console.log("Pending...");
                this.click('[href="/ios/manage/certificates/team/index.action"]');        
  
                if (!this.exists('img[alt="download"]')) {
                  this.wait(5000, function() {
                    console.log("Pending...");
                    this.click('[href="/ios/manage/certificates/team/index.action"]');        
                  });      
                }
              });      
            }
          });
  
          // download dist cert
          spooky.then(function() {
            this.download(this.getElementAttribute('[href^="/ios/manage/certificates/team/downloadDistCert.action"]', 'href'), 'distribution.cer');
          });    
            
          spooky.run();
        });
      }
    });  
  });  
  
};

var createDev = function (csr) {
  if (csr == null) {
    console.log("Need to specify a CSR file.");
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

          // go to the certificates section
          spooky.then(function() {
            console.log("Certificates...");
            this.clickLabel('Certificates','a');
          });
    
          // click request development certificate
          spooky.then(function() {
            this.click('img[alt="Request Certificate"]');
          });    
  
          // pass in CSR filename  
          spooky.then([{csr:csr},function() {
            console.log("Requesting Certificate...");
            this.fill('form#save', {
                    'upload': csr
                }, true);
          }]);
  
          // for for pending issuence
          spooky.then(function() {
            if (!this.exists('img[alt="download"]')) {
              this.wait(5000, function() {
                console.log("Pending...");
                this.click('[href="/ios/manage/certificates/team/index.action"]');        
  
                if (!this.exists('img[alt="download"]')) {
                  this.wait(5000, function() {
                    console.log("Pending...");
                    this.click('[href="/ios/manage/certificates/team/index.action"]');        
                  });      
                }
              });      
            }
          });
  
          // download dev cert
          spooky.then(function() {
            console.log("Downloading certificate...");            
            this.download(this.getElementAttribute('[href^="/ios/manage/certificates/team/downloadCert.action"]', 'href'), 'development.cer');
          });  
  
          spooky.run();
        });
      }
    });  
  });  
};

exports.createDist = createDist;
exports.createDev = createDev;
