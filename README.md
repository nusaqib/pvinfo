# PV Info

*Still a work in progress*

Please report all bugs and give feedback!

Web interface for using EPICS Channel Finder database. Integrates with PV Web Socket (PVWS), Archiver Appliance web viewing, and OLOG.

## Required Packages

- node JS
	- Test with:
		- ```node -v```
		- ```npm -v```

## Initial Setup and Running Locally

### `npm install`

Installs the needed NPM modules into node_modules directory. Run this the first time you clone the repository.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Site specific settings

- Update src/theme.js with the colors and fonts you want
- Place your own logos in src/assets
- Edit .env or create .env.local with your site specific settings


## Building Production Bundle

### ```npm run build```
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
