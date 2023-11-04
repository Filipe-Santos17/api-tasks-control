# Api Tasks Control

![Node](https://img.shields.io/badge/Node-%84ba64.svg?style=for-the-badge&logo=npm&logoColor=white)
![Typescript](https://img.shields.io/badge/Typescript-%3178c6.svg?style=for-the-badge&logo=typescript&logoColor=white)

Crud of Tasks(Get, Create, Put, Patch, Delete) e importation on CSV and JSON


## About the project

API to perform CRUD of your *tasks*.

Functionalities:

- Creation of a task
- List of all tasks
- Update a task by `id`
- Remove a task by `id`
- Mark a task as complete by `id`
- Bulk import of tasks via a CSV file

## Task Strutucutre

```javascript
{
  id: '67505954-5cdf-41b1-bd3c-d994ca054a16' // UUID()
  title: 'Example'
  description:  'Text Example'
  completed_at: null // Date when the task was completed. The initial value must be `null`
  created_at:'2023-01-01 12:00:00'
  updated_at: '2023-01-01 12:00:00'
}
```
## Routes

### Get All Tasks

List all tasks saved in the database and perform a search, filtering tasks by `title` and `description` 

```http
  GET /api/tasks
```

### Create One Task

Create a task in the database, sending the `title` and `description` fields through the `body` of the request.

```http
  POST /api/tasks
```

| Parameter    | Type 
| :----------  | :--------- 
| `title`      | `string` 
| `description`| `string` 

### Update One Task

Updates a task by `id` with new `title` and `description. Before doing so, perform validation if the id exists in the database.

```http
  PUT /api/tasks/:id
```
| Parameter    | Type 
| :----------  | :--------- 
| `title`      | `string` 
| `description`| `string` 

### Delete One Task

Remove a task by `id`.

```http
  DELETE /api/tasks/:id
```

### Complete One Task

Insert the date of completed.

```http
  PATCH /api/tasks/:id/complete
```
    

## :four_leaf_clover: Technologies used

This project is being developed with the following technologies.

-   [TypeScript](https://www.typescriptlang.org/docs/)
-   [Node](https://nodejs.org/)
-   [Fastify](https://fastify.dev/)
-   [Knex](https://knexjs.org/)
-   [Zod](https://zod.dev/)
-   [Vitest](https://vitest.dev/)
-   [Sqlite3](https://www.sqlite.org/index.html)


## :rocket: Run the code

To clone and upload the application, you need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en) installed on your machine.

```bash
# Make a clone of the application.
$ git clone https://github.com/Filipe-Santos17/api-tasks-control

# Open the folder.
$ api-tasks-control

# Install the dependencies.
$ npm install

# Make Migrations.
$ npm run knex -- migrate:latest

# Run the code
$ npx run dev
```

[Filipe Santos on Linkedin](https://www.linkedin.com/in/filipemarquesdeveloper/)