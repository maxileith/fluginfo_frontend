# Getting Started

## Install dependencies: `npm ci`

Installs all required dependencies with pinned versions.

## Run the dev-server: `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Run storybook: `npm run storybook`

Runs storybook in the development mode.\
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

## Build the app for production

To run the app in production it is recommended to use **Docker**.\
Just fire up the `docker-build.sh` script and wait for it to finish.

Then you can fire up the container on it's own or use the\
preconfigured `docker-compose.yaml.example` file and set up\
your own docker stack.
