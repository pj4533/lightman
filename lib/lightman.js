var Spooky = require('spooky');
var program = require('commander');

program.version('0.0.6')
  .usage('[options] <command>')
  .option('-t, --team [team id]', 'Use team id')
  .option('-c, --csr [csr file]', 'Use csr file')
  .option('-bn, --bundlename [bundle name]', 'Use bundle name')
  .option('-bi, --bundleid [bundle id]', 'Use bundle id')
  .option('-dn, --devicename [device name]', 'Use device nam')
  .option('-di, --deviceid [device id]', 'Use device id')
  .option('-pn, --profilename [profile name]', 'Use profile name')

program.on('--help', function(){
  console.log('  Commands:');
  console.log('');
  console.log('    login - logs you in (saves to keychain)');
  console.log('    logout');
  console.log('    whoami - who am i logged in as?');
  console.log('    cert:create:dev - create development certificate');
  console.log('    cert:create:dist - create distribution certificate');
  console.log('    appid:create - create app id');
  console.log('    appid:configure:push - configure app id for push');
  console.log('    appid:bundleid - retrieve bundle id for bundle name');
  console.log('    device:addid - add device id');
  console.log('    team:list - list teams you belong to');
  console.log('    profile:list:dist - list distrobution provisioning profiles');
  console.log('    profile:manage:addall - add all devices to the given dist profile');
  console.log('');
});

program.parse(process.argv);

var cert = require('./cert');
var authentication = require('./authentication');
var appid = require('./appid');
var team = require('./team');
var device = require('./device');
var profile = require('./profile');

if (program.args[0] == "login") {
  authentication.login(function() {});
} else if (program.args[0] == "logout") {
  authentication.logout(function() {});
} else if (program.args[0] == "whoami") {
  authentication.whoami();
} else if (program.args[0] == "team:list") {
  team.list();
} else if (program.args[0] == "cert:create:dev") {
  cert.createDev(program.csr);
} else if (program.args[0] == "cert:create:dist") {
  cert.createDist(program.csr);
} else if (program.args[0] == "appid:create") {
  appid.create(program.bundlename,program.bundleid);
} else if (program.args[0] == "appid:configure:push") {
  appid.configurePush(program.csr,program.bundlename);
} else if (program.args[0] == "appid:bundleid"){
  appid.getBundle(program.bundlename);
} else if (program.args[0] == "device:addid") {
  device.addid(program.devicename,program.deviceid);
} else if (program.args[0] == "profile:list:dist") {
  profile.listDist();
} else if (program.args[0] == "profile:manage:addall") {
  profile.manageAddAll(program.profilename);
}
