# CRUD API

REST API for user management built with Node.js, Express, TypeScript, PostgreSQL, JWT authentication, and Swagger documentation.

## Features

- User registration
- User authentication with JWT
- Role-based access control
- Protected routes
- User ownership validation
- CRUD operations for users
- Soft delete support
- Pagination, filtering and sorting
- Swagger API documentation
- PostgreSQL database
- Production deployment on Render
- Cloud PostgreSQL with Neon

## Tech Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Neon
- JWT
- bcrypt
- Zod
- Swagger
- Render

## API Documentation

### Swagger

[SWAGGER LINK](https://crud-api-5ydv.onrender.com/api-docs/#/)

### Production API

[API LINK](https://crud-api-5ydv.onrender.com/users)

## Authentication

Authentication is implemented using JSON Web Tokens (JWT).

Protected endpoints require the following header:

```http
Authorization: Bearer <token>
```

## User Roles

### User

Can:

- View own profile
- Update own profile

Cannot:

- Create admin users
- Delete users
- Manage other users

### Admin

Can:

- Create users
- Create admin users
- Delete users
- Access administrative endpoints

## Main Endpoints

### Authentication

```http
POST /auth/register
POST /auth/login
```

### Users

```http
GET    /users
GET    /users/:id
GET    /users/me
POST   /users
PUT    /users/:id
DELETE /users/:id
```

## Soft Delete

Users are not physically removed from the database.

Instead, the `is_active` field is set to `false`.

Inactive users are excluded from application queries.

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret
PORT=3000
```

Example configuration is available in:

```text
.env.example
```

## Local Development

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

## Database

The project uses PostgreSQL.

### Users Table

| Column | Type |
|----------|----------|
| id | SERIAL |
| name | VARCHAR |
| email | VARCHAR |
| password | TEXT |
| role | VARCHAR |
| is_active | BOOLEAN |
| created_at | TIMESTAMPTZ |
| updated_at | TIMESTAMPTZ |

## Project Goals

This project was created to practice:

- REST API design
- Authentication and authorization
- PostgreSQL integration
- TypeScript backend development
- API documentation with Swagger
- Cloud deployment: Neon (database) and Render (backend)

## Author

**Viktoriia Petukhova**
