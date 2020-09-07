# Prokino's Protein Family Browser

## Build Status

|  Application 	|  Status 	|
|---	|---	|
|   KinView	|   [![Netlify Status](https://api.netlify.com/api/v1/badges/b4c08ab1-96fd-4caf-ab62-54bd1fe3bd1b/deploy-status)](https://app.netlify.com/sites/uga-kinview/deploys)|
|   GTA Explorer	|   [![Netlify Status](https://api.netlify.com/api/v1/badges/08f203b3-bdd8-4931-b464-86d37e51acf4/deploy-status)](https://app.netlify.com/sites/uga-gta/deploys)	|
|   Tyrosinekinase	|  Private Project|
|   	|   	|


#### KinView 
A sample application using the Protein Family Browser. KinView description..

#### GTA Explorer 
A sample application using the Protein Family Browser. GTA description..

## Installation
You might build and run this project on your local machine. Your application will work offline without internet connection anfter building. Or, you can follow the Publish Online section to publish your application on netlify.com. Of course, you can use other CI/CD platform or a web server (e.g., nginx, apache) to host the application.

#### Pre-requirements
- Install [Node JS](https://nodejs.org/en/download/)

### Updating KinView on http://prokino.uga.edu/kinview/
- `cd /var/www/html/kinview/source` to navigate to the source directory
- `git pull` to update the source code
- `npm install` to install required npm packages in the source directory
    - if `npm` command not found, add `node` to the path: `export PATH=$PATH:/opt/rh/rh-nodejs12/root/usr/bin`
- `npm run build` to compile and build the project
- `cp -r build/* ../` to replace the old compiled files with new ones

Note 1: if there was no `source` directory in `/var/www/html/kinview/`, clone this repository there
Note 2: there should be an environment variable `REACT_APP_NAME` having value `kinase`, if not, run `env REACT_APP_NAME=kinase`

