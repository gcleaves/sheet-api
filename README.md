# Sheets API

This project is a simple API for a Google Sheet. It is built upon Nest.js in the backend and Nuxt in the frontend. Configuration is stored in MySQL. Authentication is handled by Google OAUTH2.

Write commands are queued in Redis and executed sequentially to avoid rate limit issues. Therefore this service is not suitable for high volume use with realtime read consistency. In other words, a write command will not be reflected in the read command until the write command is executed, which may take a few seconds.

## Setup

1. Clone this repo.
1. [Set up a Google Cloud project](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication?id=setting-up-your-quotapplicationquot). Set user type to Internal in OAuth consent screen if you want to restrict access to a specific domain.
1. [Create a Google service account](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication?id=service-account) and download the JSON file.
1. Leave the JSON file in the root of the repo so that the docker-compose.yml file can copy it into the backend container.
1. Edit the .env file with your MySQL credentials and Google Cloud project credentials and other settings.
1. Run `docker compose up -d` to start the service, which will automatically build the container and start MySQL and Redis.

## Usage

1. Visit the frontend at `http://localhost:3000`. 
1. Log in with your Google account. Add a new sheet. 
1. Give it a descriptive name.
1. Enter the exact sheet id. You can find it in the url of the Google Sheet: httpw://docs.google.com/spreadsheets/d/__1OIoMOgtddeREFeDenx2b2BQnIsLeHa6yQm37eBhQEX8__/edit?gid=0#gid=0
1. Recommended: enter a random string to protect read access.
1. Recommended: enter a random string to protect write access.
1. Click "Submit".

## API

See https://localhost:3000/app/docs

