# User Tagging

GraphQL API Server using Node and GraphQL that helps in managing teams

_Author:_ Ibiyemi Sanni

## Features and Requirements

A member has a firstName, lastName enail and a type (that can an employee or a contractor) - if it's a contractor, the duration of the contract needs to be saved, and if it's an employee their role is stored, for instance: Software Engineer, Project Manager and so on. A member can be tagged, for instance: C#, Angular, General Frontend, Seasoned Leader and so on. (Tags will likely be used as filters later, so keep that in mind)

The application is further extended to allow have admin users and regular users. And admin users can only be employees not contractors.

### Features overview

- CREATE - READ - UPDATE - DELETE for Users
- CREATE - READ - UPDATE - DELETE for Admin User
- CREATE - READ - UPDATE - DELETE for Tags

### Other unique features of the application

- Only admin users can create, edit and delete tags.

- Admin users need to be verified to be active. verification code(CODELITT)

- Users can fetch all tags and select from the tags during sign up or when editing user accounts

- Tags are hard-deleted - They are removed from the database permanently

- Users are soft-deleted - They are only marked with a deleted flag but not permanently removed from the database

- For authenticated queries/mutations, pass an extra hearder 'x-auth-token', with a value of the token gotten on on sign in

- Admin users can delete other users account

## Technologies

- NodeJS
- Express
- GraphQL
- MongoDB
- Docker

## Requirements

- NodeJS (minimum v14.0.0)

## Installation

### Node.JS

Ensure you have node installed on your system, visit [node.org](https://nodejs.org/en/download/) to install. Once installed, open a terminal and run the command to confirm node is installed and see the current version

```bash
node -v
```

## Project Structure

The code base is structured in a modular way, following a Model - Controller - Service Architecture. An overview of the code base:

- CONFIG - containing configuration data for the application
- CONTROLLER - contains the files that receives data from the graphql and call the services
- CONSTANTS - contains data that are expected to br constant across the application.
- MIDDLEWARES - collection of middlewares written for the application.
- MODEL - contains the models for the database
- SCHEMA - containing the queries, types and mutations for graphql server
- SERVICES - containing services files that handles requests functionalities
- TESTS - containing test files
- UTILS - containing utility functions used in the application ( error handling, logging )
- VALIDATIONS - contains validation rules for the requests.

## Set - Up

Clone the project from the github repository [https://github.com/ibiyemipedro/user-tagging.](https://github.com/ibiyemipedro/user-tagging)

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

### Tests

Installing the dependences will install `jest`, `jest-extented` and `mongodb-memory-server`. Theses are the packages needed for the test.

In the terminal of your root project, Run the following command

```bash
npm run test
```

## END-POINT

If everything runs fine, navigate to your browser and open http://localhost:5000. The project will be running on the endpoint.

_GraphQL Endpoint :_ ` http://localhost:5000/graphql`

## QUERIES

### tags -

- Gets all the tags in the database

_Payload_

```bash
{
  tags{
    _id
    name
    details
  }
}
```

_Response format_

```bash
{
  "data": {
    "tags": [
      {
        "_id": "6045c93db0f82343431e4332",
        "name": "JS",
        "details": "Tag for javascript developers"
      }
    ]
  }
}
```

### tag -

- Get details of a single tag

_Payload_

```bash
{
  tag(tagId: "6045c93db0f82343431e4332"){
    _id
    name
    details
  }
}
```

_Response format_

```bash
{
  "data": {
    "tag": {
      "_id": "6045c93db0f82343431e4332",
      "name": "JS",
      "details": "Tag for javascript developers"
    }
  }
}
```

### users -

- Gets all the users in the database

_Header :_ `x-auth-toke : {token}`

_Payload_

```bash
{
  users{
    firstName
    lastName
    email
    role
    duration
    userType
    tags{
      name
    }
  }
}
```

_Response format_

```bash
{
    "data": {
        "users": [
            {
                "firstName": "Demo",
                "lastName": "User",
                "email": "b@b.com",
                "role": "Software Dev",
                "duration": null,
                "userType": "employee",
                "tags": []
            },
            {
                "firstName": "Demo",
                "lastName": "Admin",
                "email": "a@a.com",
                "role": "Software Dev",
                "duration": null,
                "userType": "employee",
                "tags": []
            }
        ]
    }
}
```

### user -

- Get details of a single user

_Payload_

```bash
{
  user{
    firstName
    lastName
    email
    role
    duration
    userType
    tags{
      name
    }
  }
}
```

_Response format_

```bash
{
    "data": {
        "user": {
            "firstName": "Demo",
            "lastName": "Admin",
            "email": "a@a.com",
            "role": "Software Dev",
            "duration": null,
            "userType": "employee",
            "tags": []
        }
    }
}
```

## MUTATIONS

### signUp -

- creates a user account

_Payload_

```bash
mutation{
  signUp( firstName : "Demo" lastName : "User" role: "Software Dev" email: "b@b.com" userType: "employee" password: "1234567"){
    firstName
    lastName
    email
    role
    duration
    userType
    tags{
      name
    }
  }
}

```

_Response format_

```bash
{
  "data": {
    "signUp": {
      "firstName": "Demo",
      "lastName": "User",
      "email": "b@b.com",
      "role": "Software Dev",
      "duration": null,
      "userType": "employee",
      "tags": []
    }
  }
}
```

### adminSignUp -

- Creates a user with admin access

_Payload_

```bash
mutation{
  adminSignUp( firstName : "Demo" lastName : "Admin" role: "Software Dev" email: "a@a.com" userType: "employee" password: "1234567"){
    firstName
    lastName
    email
    role
    duration
    userType
    tags{
      name
    }
  }
}
```

_Response format_

```bash
{
  "data": {
    "adminSignUp": {
      "firstName": "Demo",
      "lastName": "Admin",
      "email": "a@a.com",
      "role": "Software Dev",
      "duration": null,
      "tags": []
    }
  }
}
```

### verifyAdmin -

- Verifies an admin account

_Payload_

```bash
mutation{
  verifyAdmin(email: "a@a.com" verificationCode: "CODELITT"){
    firstName
    lastName
    email
    role
    duration
    userType
    tags{
      name
    }
  }
}
```

_Response format_

```bash
{
  "data": {
    "verifyAdmin": {
      "firstName": "Demo",
      "lastName": "Admin",
      "email": "a@a.com",
      "role": "Software Dev",
      "duration": null,
      "userType": "employee",
      "tags": []
    }
  }
}

```

### addTag -

- adds a tag to the db

_Payload_

```bash
mutation{
  addTag(name: "JS" details: "Tag for tavascript developers"){
    name
    details
  }
}
```

_Response format_

```bash
{
    "data": {
        "addTag": {
            "name": "JS",
            "details": "Tag for tavascript developers"
        }
    }
}
```

### editTag -

- Edit tag information

_Payload_

```bash
mutation{
  editTag(id: "6045c93db0f82343431e4332" name: "JS" details: "Tag for javascript developers"){
    name
    details
  }
}
```

_Response format_

```bash
{
    "data": {
        "editTag": {
            "name": "JS",
            "details": "Tag for javascript developers"
        }
    }
}
```

### deleteTag -

- Removes a tag from the database

_Payload_

```bash
mutation{
  deleteTag(tagId: "6045cb783212fb44caf3f21f"){
    code
    message
  }
}
```

_Response format_

```bash
{
    "data": {
        "deleteTag": {
            "code": 200,
            "message": "Resource Deleted Successfully"
        }
    }
}
```

### editUser -

- Gets all the tags in the database

_Payload_

```bash
mutation{
  editUser(firstName: "Philli" lastName:"Layden" tags: ["6045c93db0f82343431e4332"]){
    firstName
    lastName
    email
    role
    duration
    userType
    tags{
      name
    }
  }
}
```

_Response format_

```bash
{
    "data": {
        "editUser": {
            "firstName": "Philli",
            "lastName": "Layden",
            "email": "a@a.com",
            "role": "Software Dev",
            "duration": null,
            "userType": "employee",
            "tags": [
                {
                    "name": "JS"
                }
            ]
        }
    }
}
```

### deleteUser -

- Gets all the tags in the database

_Payload_

```bash
mutation{
  deleteUser(userId:"6045cd7810ba6e453bdfcf98"){
    code
    message
  }
}
```

_Response format_

```bash
{
    "data": {
        "deleteUser": {
            "code": 200,
            "message": "Resource Deleted Successfully"
        }
    }
}
```

## IMPROVEMENTS

For improvements to the to make the application better

- More test cases are needed to cover success and failure cases
- Custom error handler function for graphql for improved error handling
- additional response types to better structure graphql responses with status and message alongside the data

### -------------------------------Side note--------------------------------------------------
