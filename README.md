# Prokino's Protein Family Browser

## Build Status

|  Application 	|  Status 	|
|---	|---	|
|   KinView	|   [![Netlify Status](https://api.netlify.com/api/v1/badges/b4c08ab1-96fd-4caf-ab62-54bd1fe3bd1b/deploy-status)](https://app.netlify.com/sites/uga-kinview/deploys)|
|   GTA Explorer	|   [![Netlify Status](https://api.netlify.com/api/v1/badges/08f203b3-bdd8-4931-b464-86d37e51acf4/deploy-status)](https://app.netlify.com/sites/uga-gta/deploys)	|
|   Tyrosinekinase	|  [![Netlify Status](https://api.netlify.com/api/v1/badges/9255ffc6-82fb-4eb6-ad37-56d67e52766d/deploy-status)](https://app.netlify.com/sites/uga-tyrosinekinase/deploys)|
|   	|   	|


#### KinView 
A sample application using the Protein Family Browser. KinView description..

#### GTA Explorer 
A sample application using the Protein Family Browser. GTA description..

## Installation
You might build and run this project on your local machine. Your application will work offline without internet connection anfter building. Or, you can follow the Publish Online section to publish your application on netlify.com. Of course, you can use other CI/CD platform or a web server (e.g., nginx, apache) to host the application.

### Offline Setup
The offline setup means no internet connection required after the building process. However, you can still access your application on a local network or host it on your own web server.

#### Pre-requirements
- Install [Node JS](https://nodejs.org/en/download/)
#### Steps
- Modify package.json by adding a new line in the scripts section to start the application. For example: 
`"start_ApplicationName": "env REACT_APP_NAME=ApplicationName react-scripts start HOST=0.0.0.0"`
- `npm install` to install npm packages in the source code directory (it takes a few minutes)
- Run the script added to package.json using npm. For example: `npm start_ApplicationName`

### Online Setup
- Clone this repository
- Create an account on netlify.com
- Connect Netlify to your GitHub account
- Choose a website name, and after each change you make on the repository the website is updated.


## Development
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


