##al_ui_template Framework - Getting started  

*~ You must have installed XCode and accepted the licensing agreemment before continuing with this document ~*   
*~ You mst have an [Alert Logic Github Enterprise](https://algithub.pd.alertlogic.net) account and a [Github](https://github.com/) account with SSH keys configured to complete this process ~*   

###Prerequisite software  
Install [Homebrew](http://brew.sh/)  
```$ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"```  
*~ Homebrew allows us to easily install and manage packages with dependencies ~*   

Use [Homebrew](http://brew.sh/) to install [NGINX](http://nginx.org/)  
```$ brew install nginx```  
*~ The proxy and server for the development UI ~*   

Use [Homebrew](http://brew.sh/) to install [Node](http://nodejs.org/)  
```$ brew install node```  
*~ Javascript runtime required to run UI cli tools ~*   

Use [Homebrew](http://brew.sh/) to install [Rebar](https://github.com/basho/rebar)  
```$ brew install rebar```  
*~ Rebar can fetch and build projects from external sources. ~*   

Make sure your system can handle large numbers of open files   
```$ echo 'kern.maxfiles=20480' | sudo tee -a /etc/sysctl.conf```   
```$ echo -e 'limit maxfiles 8192 20480\nlimit maxproc 1000 2000' | sudo tee -a /etc/launchd.conf```   
```$ echo 'ulimit -n 4096' | sudo tee -a /etc/profile```   

REBOOT

###Creating your development environment
Install dependencies using [NPM](https://www.npmjs.org/) and [bower](http://bower.io/)   
```$ sudo npm install```   
```$ sudo npm install -g bower```   
```$ sudo npm install -g grunt-cli```   
```$ bower install```   

LESS needs to be transpiled into CSS and this happens by running the correct [grunt](http://gruntjs.com/) task   
```$ grunt less:production```   
Anytime LESS files are updated you will need to re-run this task   

###Working in your environment  

*~ You may need to stop apache before starting NGINX ~*   

 The [NPM](https://www.npmjs.org/) install process that was run earlier installed some [Node](http://nodejs.org/) modules that make the al_ui_template framework much more helpful than simple code checkouts.  Starting up the framework will enable the built in web server, real time linting, unit tests, documentation and translation, as well as the UI artifact build system.   
 
 Start the built in webserver by running the grunt web task.  
 ```$ grunt web```   
*~ watch your terminal for the real-time background tasks that are performed on most file saves ~*  

You my now visit [http://127.0.0.1:8888/](http://127.0.0.1:8888/)
