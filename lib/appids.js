var createNewAppID = function (bundlename,bundleid) {
  // go to the App IDs section
  spooky.then(function() {
    this.clickLabel('App IDs','a');
  });

  // click new app id
  spooky.then(function() {
    this.click('[href="/ios/manage/bundles/add.action"]');
  });    
  
  // fill in new app id form
  spooky.then([{bundlename:bundlename,bundleid:bundleid},function() {
    this.fill('form#save', {
            'bundleName': bundlename,
            'bundleIdentifier': bundleid
        }, true);
  }]);
  
};

var configureAppIDForDistPush = function (csr,bundlename) {
  
  // go to the App IDs section
  spooky.then(function() {
    this.clickLabel('App IDs','a');
  });
 
  spooky.then([{bundlename:bundlename},function() {
    var href = this.evaluate(function(bundlename) {
      return $('td.name:contains("' + bundlename + '")').parents('tr').children('td:last').children('a').attr('href');
    }, bundlename);
    console.log("HREF: " + href);
    this.click('[href="'+ href + '"]');
  }]);
  
  spooky.then(function() {
    this.click('[id="enablePush"]');
  });    
  
  spooky.then(function() {
    this.click('[id="aps-assistant-btn-prod-en"]');
  })

  spooky.wait(5000, function() {
          this.echo("WAITED 5 SECS");
  });  

  spooky.then(function() {
    this.click('[id="ext-gen59"]');
  })
  
  // pass in CSR filename  
  spooky.then([{csr:csr},function() {
    this.fill('form#certsubmit', {
            'upload': csr
        }, false);
  }]);
    
  spooky.then(function() {
    this.click('[id="ext-gen75"]');
  })

  spooky.wait(30000, function() {
    this.echo("WAITED 30 SECS");
  });  

  spooky.then(function() {
    this.click('[id="ext-gen59"]');
  });

  spooky.then(function() {
    this.click('[id="ext-gen91"]');
  });
  
  spooky.wait(3000, function() {
          this.echo("WAITED 3 SECS");
  });  

  // download apn cert
  spooky.then([{bundlename:bundlename},function() {
    var href = this.evaluate(function() {
      return $('td:contains("Production Push SSL Certificate")').first().parents('tr').children('td:last').find('#form_logginMemberCert_').attr('href');
    });
    console.log("HREF: " + href);
    this.download(href, bundlename + '_apns.cer');
  }]);

  // say cheeze!
  spooky.then(function() {
    this.capture('lightman.png');
  });
  
}

exports.configureAppIDForDistPush = configureAppIDForDistPush;
exports.createNewAppID = createNewAppID;
