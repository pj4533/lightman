var Spooky = require('spooky');
var program = require('commander');

program.version('0.0.1')
  .option('-p, --password [password]', 'Use password [blah]', 'blah')
  .option('-u, --username [username]', 'Use username [blah]', 'blah')
  .option('-t, --team [team]', 'Use team [blah]', 'blah')
  .parse(process.argv);

var spooky = new Spooky({
  program:program,
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
  
  // couldnt figure out how to pass variables to the fill function so I do querySelector
  spooky.thenEvaluate(function(obj) {
    document.querySelector('[name="theAccountName"]').value = obj.username;
    document.querySelector('[name="theAccountPW"]').value = obj.password;
  },{ username:program.username, password:program.password});
  
  // press signin button
  spooky.then(function() {
    this.click('[class="button large blue signin-button"]');
  });

  spooky.thenEvaluate(function(teamId) {
    document.querySelector('[name="memberDisplayId"]').value=teamId;
  },program.team);

  // press continue button
  spooky.then(function() {
    this.click('[name="action:saveTeamSelection!save"]');
  });

  spooky.then(function() {
    this.clickLabel('iOS Provisioning Portal','a');
  });

  spooky.then(function() {
    this.capture('lightman.png');
  });

  spooky.run();
});
