Lightman : Node based CLI for the Apple Developer Center
========

Hi, Lightman!

![Lightman](http://images.paxholley.net/blog/geeks/david_lightman.jpg)

Lightman uses an inception level of javascript libraries.   [Spooky.js](https://github.com/WaterfallEngineering/SpookyJS) is the node flavor of [Casper.js](https://github.com/n1k0/casperjs), which is a higher level library for [Phantom.js](https://github.com/ariya/phantomjs)! YIKES.  Should you still want to install:


    npm install -g lightman



### Make sure to install CasperJS/PhantomJS with:  

    brew install casperjs


Lightman usage:

````
 Usage: lightman [options] <command>

  Options:

    -h, --help                       output usage information
    -V, --version                    output the version number
    -p, --password <password>        Use password [blah]
    -u, --username <username>        Use username [blah]
    -t, --team [team]                Use team
    -c, --csr [csr file]             Use csr file
    -bn, --bundlename [bundle name]  Use bundle name
    -bi, --bundleid [bundle id]      Use bundle id
    
````

Supported Commands:

* createDevCert - create development certificate (username, password, team, csr)
* createDistCert - create distribution certificate (username, password, team, csr)
* createAppID - create app id (username, password, team, bundle name, bundle id)
* configureAppIDForDistPush - configure app id for push (username, password, team, csr, bundle name)
* listTeams - list teams you belong to (username, password)
 

### Other Stuff:

I also include some shell scripts for doing things like:
* creating a CSR
* importing a certificate
* exporting a p12 certificate


# Very in development, probably won't work
