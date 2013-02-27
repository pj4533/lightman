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

  console.log("\nHi! Lightman!\n");

  // first go to dev center page
  spooky.start('https://developer.apple.com/devcenter/ios/index.action');

  // then click the blue button,  i don't go directly here cause it has some appid thing
  spooky.then(function() {
    console.log("Navigating to developer portal...");
    this.click('[class="button blue"]');
  });

  // login
  spooky.then([{username:username,password:password},function() {
    console.log("Authenticating...");
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
      console.log("Choosing team...");
      this.click('[name="action:saveTeamSelection!save"]');
    });
  }
};

var iTunesConnectAuthenticate = function (username, password) {

  console.log("\nHi! Lightman!\n");

  // first go to dev center page
  spooky.start('https://itunesconnect.apple.com/WebObjects/iTunesConnect.woa');

  // then click the blue button,  i don't go directly here cause it has some appid thing
  spooky.then(function() {
    console.log("Navigating to iTunes Connect...");
  });

  // login
  spooky.then([{username:username,password:password},function() {
    console.log("Authenticating...");
    this.fill('form', {
            'theAccountName': username,
            'theAccountPW': password
        }, true);
  }]);

    // press manage applications link
  spooky.then(function() {
    console.log("Managing Applications...");
    // this.click('[href="WebObjects/iTunesConnect.woa/wo/3.0.9.27.3.0.0.1.1.3"]');
  });

  // spooky.then(function(){
  //   console.log('[class="upload-app-button"]')
  // });
};

var fbAuth = function (username, password) {

  console.log("\nHi! Lightman!\n");

  // first go to dev center page
  spooky.start('http://www.facebook.com');

  // then click the blue button,  i don't go directly here cause it has some appid thing
  spooky.then(function() {
    console.log("Navigating to Facebook Developer Center...");
  });

  // login
  spooky.then([{username:username,password:password},function() {
    console.log("Authenticating...");
    this.fill('form', {
            'email': username,
            'pass': password
        }, true);
  }]);

  spooky.then(function() {
    console.log("Managing Applications...");
    // this.click('[href="WebObjects/iTunesConnect.woa/wo/3.0.9.27.3.0.0.1.1.3"]');
  });

  // spooky.then(function(){
  //   console.log('[class="upload-app-button"]')
  // });
};

exports.login = login;
exports.logout = logout;
exports.iTunesConnectAuthenticate = iTunesConnectAuthenticate;
exports.fbAuth = fbAuth;
exports.authenticate = authenticate;
exports.whoami = whoami;