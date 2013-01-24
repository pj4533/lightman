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

var listAppIDs = function () {
  // go to the App IDs section
  spooky.then(function() {
    this.clickLabel('App IDs','a');
  });
 
  // // say cheeze!
  // spooky.then(function() {
  //   this.capture('lightman.png');
  // });
  
  spooky.thenEvaluate(function() {
    console.log(x('//div[@class="nt_multi"]/table/tbody/tr'));
  });
}

exports.listAppIDs = listAppIDs;
exports.createNewAppID = createNewAppID;
