# Zywa Assignment Backend

## Introduction

This repository contains the backend application for the Zywa assignment. It provides functionalities to import data from CSV files into a MongoDB database and offers an API endpoint to retrieve card status information.

## Overview

The backend application is built using Node.js and Express.js framework. It utilizes MongoDB as the database for storing card status information imported from CSV files. The application includes features for automatic data import from CSV files upon startup and watches for changes in the data folder to update the database accordingly.

## Setup

1. Clone the repository to your local machine:

    ```
    git clone <repository-url>
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Ensure MongoDB is installed and running on your system.

4. Set up your MongoDB connection URI in the `database.js` file.

5. Ensure that your data folder is structured correctly and contains the necessary CSV files.

## API Endpoint

### GET /get_card_status

Retrieves the status of a card based on the provided identifier (phoneNumber or cardId).

Parameters:
- `phoneNumber`: The phone number associated with the card.
- `cardId`: The ID of the card.

Example usage: /get_card_status?phoneNumber=585949014

## File Structure

- `server.js`: Main server file containing Express application setup and route definitions.
- `database.js`: Handles MongoDB connection and database operations.
- `readDataFromCSV.js`: Reads data from CSV files and imports it into the database.
- `updater.js`: Watches for changes in the data folder and updates the database accordingly.

## Software Architecture

The application follows a server-client architecture where the server (backend) interacts with the MongoDB database and serves API endpoints to clients for accessing card status information.

## Tech Stack Used

- Node.js: JavaScript runtime environment
- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database for data storage
- csvtojson: Library for converting CSV data to JSON format
- csv-parser: Library for parsing CSV files

## Docker

To run the application using Docker, you can use the provided Dockerfile:
- Build the Docker image: `docker build -t zywa-card-status .`
- Run the Docker container: `docker run -p 3000:80 zywa-card-status`

## Usage

Start the server: npm start

The server will start running on port 3000 by default.

## Future Improvements

- Implement authentication and authorization mechanisms for API endpoints.
- Add validation for incoming requests to ensure data integrity.
- Improve error handling to provide more informative responses.
- Enhance scalability and performance of the application.




