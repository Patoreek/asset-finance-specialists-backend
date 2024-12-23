## Project Overview

This repository contains the backend code for the Asset Finance Specialists application. The backend is designed to run on AWS Lambda ( + AWS REST API Gateway ) for production and can be run locally using server.js for development purposes.

## Setup

To set up the project locally:

1. **Clone the repository:**
   `git clone https://github.com/Patoreek/asset-finance-specialists-backend.git`

2. **Install dependencies:**
   `npm install`

3. **Start the development server:**
   `npm run dev`

## Environment Variables

This project uses environment variables for configuration. Ensure you have a `.env` file at the root of your project with necessary variables.

- MONGO_URI: The connection string for the database.
- PORT: The port on which the server runs.
- JWT_SECRET: Secret string for auth tokens.
- NODE_ENV: Node environment variable.

## Deployment

In production, the backend runs on AWS Lambda using lambda.js. To deploy the application to AWS Lambda, follow these steps:

1.  Package the application code and dependencies into a ZIP file. `npm run package`
2.  Upload the ZIP file to AWS Lambda.
3.  Configure the Lambda function to use lambda.js as the entry point.

Ensure that all necessary environment variables are set in the AWS Lambda configuration.
