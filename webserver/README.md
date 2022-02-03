# Ridgebotics Scouting App 2022

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Scripts

In the project directory, you can run:

### `start_dev.sh`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\

This will also run the couchdb server.
Open [http://localhost:5984](http://localhost:5984) to open the couchdb web interface

### `start_prod.sh`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

This runs and nginx server that serves the app over http
Open [http://localhost](http://localhost) to view it in your browser.

This will also run the couchdb server.
Open [http://localhost:5984](http://localhost:5984) to open the couchdb web interface

### `stop.sh`

Stops any running containers