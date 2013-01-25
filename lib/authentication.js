

var login = function (username, password, team) {
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
  
  if (team) {
    spooky.thenEvaluate(function(teamId) {
      document.querySelector('[name="memberDisplayId"]').value=teamId;
    },team);
  
    // press continue button
    spooky.then(function() {
      this.click('[name="action:saveTeamSelection!save"]');
    });    
  }
  
  // go into the provisioning portal
  spooky.then(function() {
    this.clickLabel('iOS Provisioning Portal','a');
  });
};

var listTeams = function (username, password) {
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
  
  // say cheeze!
  spooky.then(function() {
    this.capture('lightman.png');
  });
  
  spooky.then(function() {
    console.log(this.getHTML('[name="memberDisplayId"]'));
  });
};

exports.login = login;
exports.listTeams = listTeams;
