# GraphQL API

A GraphQL API for managing projects and tasks, built with Node.js, Express, and MongoDB (Mongoose).

## Features
- Typed GraphQL schema with `Project` and `Task` types
- Queries to fetch a single project or task by ID, or all projects and tasks
- Mutations to add projects and tasks
- Nested resolvers: a project returns its tasks, and a task returns its project
- Interactive GraphiQL explorer for testing queries

## Tech Stack
Node.js · Express · express-graphql · GraphQL · MongoDB · Mongoose

## Getting Started
1. Clone the repo and move into the server folder:
```
   cd GraphQL_API/server
```
2. Install dependencies:
```
   npm install
```
3. In `app.js`, set the MongoDB connection string to your own database.
4. Start the server:
```
   node app.js
```
5. Open GraphiQL at `http://localhost:4000/graphql`.

## Example Queries

Fetch all projects with their tasks:
```graphql
{
  projects {
    id
    title
    weight
    tasks {
      title
    }
  }
}
```

Add a project:
```graphql
mutation {
  addProject(title: "Website redesign", weight: 3, description: "Redesign the marketing site") {
    id
    title
  }
}
```

## Project Structure
- `server/models/`: Mongoose models for `Project` and `Task`
- `server/schema/schema.js`: GraphQL types, queries, and mutations
- `server/app.js`: Express server and MongoDB connection
- `server/graphiql*`: saved GraphiQL queries used while developing
