var keychain = require('keychain');
var program = require('commander');

var whoami = function () {
  keychain.getPassword({ account: 'lightmanUsername', service: 'lightman' }, function(err,username) {
    if (username == null) {
      console.log("Not logged in");
    } else {
      console.log("Logged in as: " + username);
    }
  });
}

var login = function (callback) {
  program.prompt('Username: ', function(username){
    program.password('Password: ', '*', function(password){
      keychain.setPassword({ account: 'lightmanUsername', service: 'lightman', password: username }, function(err) {
        keychain.setPassword({ account: 'lightmanPassword', service: 'lightman', password: password }, function(err) {
          process.stdin.destroy();
          console.log("Logged in as:" + username);
          callback();
        });
      });
    });
  });
};

var logout = function (callback) {
  keychain.deletePassword({ account: 'lightmanUsername', service: 'lightman' }, function(err) {
    keychain.deletePassword({ account: 'lightmanPassword', service: 'lightman' }, function(err) {
      process.stdin.destroy();
      console.log("Logged out.");
      callback();
    });  
  });  
}

var authenticate = function (username, password) {
  // first go to dev center page
  spooky.start('https://developer.apple.com/devcenter/ios/index.action');
  
  // then click the blue button,  i don't go directly here cause it has some appid thing
  spooky.then(function() {
    this.click('[class="button blue"]');
  });

  // login
  spooky.then([{username:username,password:password},function() {
    this.fill('form', {
            'theAccountName': username,
            'theAccountPW': password
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
};

exports.login = login;
exports.logout = logout;
exports.authenticate = authenticate;
exports.whoami = whoami;