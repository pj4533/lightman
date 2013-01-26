var Spooky = require('spooky');
var program = require('commander');

program.version('0.0.1')
  .usage('[options] <command>')
  .option('-t, --team [team]', 'Use team')
  .option('-c, --csr [csr file]', 'Use csr file')
  .option('-bn, --bundlename [bundle name]', 'Use bundle name')
  .option('-bi, --bundleid [bundle id]', 'Use bundle id')
  .parse(process.argv);

var certificates = require('./certificates');
var authentication = require('./authentication');
var appids = require('./appids');
var teams = require('./teams');

if (program.args[0] == "login") {
  authentication.login(function() {});
} else if (program.args[0] == "logout") {
  authentication.logout(function() {});
} else if (program.args[0] == "teams:list") {
      teams.listTeams();
} else if (program.args[0] == "certs:create:dev") {
      certificates.createDevelopmentCertificate(program.csr);    
} else if (program.args[0] == "certs:create:dist") {
      certificates.createDistrobutionCertificate(program.csr);    
} else if (program.args[0] == "appid:create") {
      appids.createNewAppID(program.bundlename,program.bundleid);
} else if (program.args[0] == "appid:configure:push") {
      appids.configureAppIDForDistPush(program.csr,program.bundlename);
}     
