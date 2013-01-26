Lightman : Node based CLI for the Apple Developer Center
========

Hi, Lightman!

![Lightman](http://images.paxholley.net/blog/geeks/david_lightman.jpg)

Lightman uses an [Inception](http://4.bp.blogspot.com/_OORyagu8ETY/TE9PNl1Qq4I/AAAAAAAABqQ/_HJ5lfqLNZA/s1600/INCEPTION_WTF_CHART_150.jpg) level of javascript libraries.   [Spooky.js](https://github.com/WaterfallEngineering/SpookyJS) is the node flavor of [Casper.js](https://github.com/n1k0/casperjs), which is a higher level library for [Phantom.js](https://github.com/ariya/phantomjs)! YIKES.  Should you still want to install:


    npm install -g lightman



### Make sure to install CasperJS/PhantomJS with:  

    brew install casperjs


Lightman usage:

````
Usage: lightman [options] <command>

Options:

  -h, --help                       output usage information
  -V, --version                    output the version number
  -t, --team [team id]             Use team id
  -c, --csr [csr file]             Use csr file
  -bn, --bundlename [bundle name]  Use bundle name
  -bi, --bundleid [bundle id]      Use bundle id
  -dn, --devicename [device name]  Use device nam
  -di, --deviceid [device id]      Use device id

Commands:

  login - logs you in (saves to keychain)
  logout
  whoami - who am i logged in as?
  cert:create:dev - create development certificate
  cert:create:dist - create distribution certificate
  appid:create - create app id
  appid:configure:push - configure app id for push
  device:addid - add device id
  team:list - list teams you belong to

````

### Other Stuff:

* I also include some shell scripts for doing things like:
  * creating a CSR
  * importing a certificate
  * exporting a p12 certificate
* Lightman was created as part of the [EverTrue](http://www.evertrue.com) 2013 winter hackathon.
* I prefer working in objective-C, this javascript stuff scares me.


# Very in development, probably won't work
