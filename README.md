# hngx-stage2

This guide will walk you through setting up and using a simple Express.js REST API with MongoDB for CRUD operations on a "person" resource.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running Locally](#running-locally)
5. [Testing](#testing)
6. [API Endpoints](#api-endpoints)

## Prerequisites

Before getting started, ensure you have the following installed on your system:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)

## Installation

1. Clone this repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install Dependencies

   ```bash
   npm install

   ```

## Configuration

1. Create a .env file in the root directory of your project and add the following:

   ```bash
   MONGO_URI=<your-mongodb-connection-string>
   PORT=<your-preferred-port>
   ```

## Running Locally

1. To run the Express API locally, use the following command:

   ```bash

    npm start

   ```

## Testing

1. To Test, use the following command:

   ```bash

    npm test

   ```

## API Endpoints

base url : https://alex-hngx-stage2.onrender.com

## Create a New Person

Create a new person by sending a POST request to `/api` with a JSON body containing the person's name.

### Request

```http
POST /api
Content-Type: application/json

{
  "name": "John Doe"
}
```

### Response

```http
{
 "_id": "5fbd6a53a2b65d00173b9a1f",
  "name": "John Doe",
}
```

## To Retrieve a person with ID

Retrieve a person's details by sending a GET request to /api/:id, where :id is the person's unique identifier.

### Request

```http
GET /api/5fbd6a53a2b65d00173b9a1f
```

### Response

```http
{
  "_id": "5fbd6a53a2b65d00173b9a1f",
  "name": "John Doe",

}
```

## Update a Person by ID

Update a person's details by sending a PUT request to /api/:id, where :id is the person's unique identifier. Provide a JSON body containing the updated name.

### Request

PUT /api/5fbd6a53a2b65d00173b9a1f
Content-Type: application/json

{
"name": "Updated Name"
}

### Response

```http
{
  "_id": "5fbd6a53a2b65d00173b9a1f",
  "name": "Updated Name",
}
```

## Delete a Person by ID

Remove a person by sending a DELETE request to /api/:id, where :id is the person's unique identifier

### Request

DELETE /api/5fbd6a53a2b65d00173b9a1f

### Response

```http
{
  "message": "Person deleted"
}
```
