var Spooky = require('spooky');
var program = require('commander');

program.version('0.0.1')
  .option('-p, --password [password]', 'Use password [blah]', 'blah')
  .option('-u, --username [username]', 'Use username [blah]', 'blah')
  .option('-t, --team [team]', 'Use team')
  .option('-c, --csr [csr file]', 'Use csr file')
  .parse(process.argv);

var spooky = new Spooky({
  casper: {
    logLevel: 'debug',
    verbose: true
  }
}, function(err) {
    
  if (err) {
    e = new Error('Failed to initialize SpookyJS');
    e.details = err;
    throw e;
  }
  
  spooky.on('error', function(e) {    
    console.error(e);
  });

  spooky.on('console', function(line) {
    console.log(line);
  });

  spooky.on('log', function(log) {
    if (log.space === 'remote') {
      console.log(log.message.replace(/ \- .*/, ''));
    }
  });

  // first go to dev center page
  spooky.start('https://developer.apple.com/devcenter/ios/index.action');
  
  // then click the blue button,  i don't go directly here cause it has some appid thing
  spooky.then(function() {
    this.click('[class="button blue"]');
  });

  // login
  spooky.then([{program:program},function() {
    this.fill('form', {
            'theAccountName': program.username,
            'theAccountPW': program.password
        }, true);
  }]);
  
  if (program.team) {
    spooky.thenEvaluate(function(teamId) {
      document.querySelector('[name="memberDisplayId"]').value=teamId;
    },program.team);
  
    // press continue button
    spooky.then(function() {
      this.click('[name="action:saveTeamSelection!save"]');
    });    
  }
  
  // go into the provisioning portal
  spooky.then(function() {
    this.clickLabel('iOS Provisioning Portal','a');
  });
  
  // go to the certificates section
  spooky.then(function() {
    this.clickLabel('Certificates','a');
  });
  
  // // click request development certificate
  // spooky.then(function() {
  //   this.click('img[alt="Request Certificate"]');
  // });    
  // 
  // // pass in CSR filename  
  // spooky.then([{program:program},function() {
  //   this.fill('form#save', {
  //           'upload': program.csr
  //       }, true);
  // }]);
  // 
  // // go to the distrobution certificates section
  // spooky.then(function() {
  //   this.click('[href="/ios/manage/certificates/team/distribute.action"]');
  // });
  // 
  // // click request dist certificate
  // spooky.then(function() {
  //   this.click('img[alt="Request Certificate"]');
  // });    
  // 
  // // pass in CSR filename  
  // spooky.then([{program:program},function() {
  //   this.fill('form#save', {
  //           'upload': program.csr
  //       }, true);
  // }]);
  // 
  // go back to dev certificates section
  spooky.then(function() {
    this.click('[href="/ios/manage/certificates/team/index.action"]');
  });
  // 
  // 
  // // for for pending issuence
  // spooky.then(function() {
  //   if (!this.exists('img[alt="download"]')) {
  //     this.wait(5000, function() {
  //       console.log("*** WAITED 5 secs");
  //       this.click('[href="/ios/manage/certificates/team/index.action"]');        
  // 
  //       if (!this.exists('img[alt="download"]')) {
  //         this.wait(5000, function() {
  //           console.log("*** WAITED 5 secs");
  //           this.click('[href="/ios/manage/certificates/team/index.action"]');        
  //         });      
  //       }
  //     });      
  //   }
  // });
  
  // download dev cert
  spooky.then(function() {
    this.download(this.getElementAttribute('[href^="/ios/manage/certificates/team/downloadCert.action"]', 'href'), 'development.cer');
  });    

  // // go to the distrobution certificates section
  // spooky.then(function() {
  //   this.click('[href="/ios/manage/certificates/team/distribute.action"]');
  // });
  // 
  // // download dist cert
  // spooky.then(function() {
  //   this.download(this.getElementAttribute('[href^="/ios/manage/certificates/team/downloadDistCert.action"]', 'href'), 'distribution.cer');
  // });    

  spooky.then(function() {
    this.capture('lightman.png');
  });

  spooky.run();
});
