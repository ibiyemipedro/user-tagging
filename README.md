# User Tagging

GraphQL API Server using Node and GraphQL that helps us managing our teams

_Author:_ Ibiyemi Sanni

## Features and Requirements

A member has a firstName, lastName enail and a type (that can an employee or a contractor) - if it's a contractor, the duration of the contract needs to be saved, and if it's an employee we need to store their role, for instance: Software Engineer, Project Manager and so on. A member can be tagged, for instance: C#, Angular, General Frontend, Seasoned Leader and so on. (Tags will likely be used as filters later, so keep that in mind)

- CREATE - READ - UPDATE - DELETE for Users
- CREATE - READ - UPDATE - DELETE for Admin
- CREATE - READ - UPDATE - DELETE for Tags

## Technologies

- NodeJS
- Express
- GraphQL
- MongoDB
- Docker

## Requirements

- NodeJS

## Installation

### Node.JS

Ensure you have node installed on your system, visit [node.org](https://nodejs.org/en/download/) to install. Once installed, open a terminal and run the command to confirm node is installed and see the current version

```bash
node -v
```

## Project Structure

The code base is structured in a modular way, following a Model - Controller - Service Architecture. An overview of the code base:

- CONFIG - containing config data and files
- CONTROLLER - contains the files that receives data from the routes and call the services
- SCHEMA - containing data for seeding
- SERVICES - containing services files that handles requests functionalities
- TESTS - containing test files
- UTILS - containing classes, middlewares and other utilities

## Set - Up

Clone the source file from github the github repo [https://github.com/yemipedro07/luckyGame.](https://github.com/yemipedro07/luckyGame) or unzip the source file to your project folder

For Production, the details are set in the .env file .

### NOTE: For actual production environment save your dbdetails to somewhere safe and not the .env in your root folder.

### Install Dependencies

To install the dependencies of the project

Navigate to the root folder of the project, open a terminal and run the following command

```bash
npm install

```

### Serve the project

At this point, everything should be set and project ready to run.

Run the following command

```bash
npm run start
```

If everything runs fine, navigate to your browser and open http://localhost:6000. The project will be running on the endpoint.

## EndPoints

### Register a User -

_Endpoint_ ` http://localhost:3800/register` - method (POST)

- Creates a user

_Payload_

#### application/json

```bash
{
	"name" : "Demo User",
	"password" : "12345678",
	"email" : "a@a.com",
	"age": 17
}
```

_Response format_

```bash
{
    "status": true,
    "message": "User registration successful",
    "data": null
}
```

### User Login -

_Endpoint_ ` http://localhost:3800/login` - method (POST)

- Login to play game

_Payload_

#### application/json

```bash
{
	"email" : "a@a.com",
	"password" : "12345678"
}
```

_Response format_

```bash
{
    "status": true,
    "message": "User login successful",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJpYXQiOjE2MDM1NjcyMDcsImV4cCI6MTYwMzY1MzYwN30.b4KOKwXFNm57CdhY4gcSkxxElhjmaRhVfaIol-KcNl8",
        "user": {
            "id": 1,
            "name": "Demo User",
            "email": "a@a.com",
            "password": "$2b$12$fccxgHrB3Ux1pxW9KzmDQ.Q9JLYkJ8QiKz3ys81PjMQ1Uf5zeHZFC",
            "age": 17,
            "createdAt": "2020-10-23T18:36:16.509Z",
            "updatedAt": "2020-10-23T18:36:16.509Z"
        }
    }
}
```
