var Spooky = require('spooky');
var program = require('commander');

program.version('0.0.1')
  .usage('[options] <createDevCert|createDistCert>')
  .option('-p, --password <password>', 'Use password [blah]')
  .option('-u, --username <username>', 'Use username [blah]')
  .option('-t, --team [team]', 'Use team')
  .option('-c, --csr [csr file]', 'Use csr file')
  .parse(process.argv);

var world = require('./world').World;

var certificates = require('./certificates');
var authentication = require('./authentication');

world(function(world) {

  console.log(program.args[0]);
  authentication.login(program.username,program.password,program.team);

  if (program.args[0] == "createDevCert") {
    certificates.createDevelopmentCertificate(program.csr);    
  } else if (program.args[0] == "createDistCert") {
    certificates.createDistrobutionCertificate(program.csr);    
  }
  
  // // say cheeze!
  // spooky.then(function() {
  //   this.capture('lightman.png');
  // });
  
  spooky.run();
});


