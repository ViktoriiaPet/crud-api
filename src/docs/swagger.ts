export const swaggerDocument = {
  openapi: "3.0.0",

  info: {
    title: "CRUD API",
    version: "1.0.0",
    description: "User management API",
  },

  servers: [
    {
      url: "https://crud-api-5ydv.onrender.com/",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },

  security: [
    {
      bearerAuth: [],
    },
  ],

  paths: {
    "/users": {
      get: {
        summary: "Get all users",
        description: "Returns paginated list of users",
        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "page",
            in: "query",
            required: false,
            schema: {
              type: "integer",
              example: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            required: false,
            schema: {
              type: "integer",
              example: 10,
            },
          },
        ],

        responses: {
          "200": {
            description: "List of users",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: {
                            type: "number",
                            example: 1,
                          },
                          uuid: {
                            type: "string",
                            format: "uuid",
                            example:
                              "550e8400-e29b-41d4-a716-446655440000",
                          },
                          name: {
                            type: "string",
                            example: "John Doe",
                          },
                          email: {
                            type: "string",
                            example: "john@mail.com",
                          },
                          role: {
                            type: "string",
                            example: "user",
                          },
                          created_at: {
                            type: "string",
                            format: "date-time",
                          },
                          updated_at: {
                            type: "string",
                            format: "date-time",
                          },
                        },
                      },
                    },

                    meta: {
                      type: "object",
                      properties: {
                        page: {
                          type: "number",
                          example: 1,
                        },
                        limit: {
                          type: "number",
                          example: 10,
                        },
                        total: {
                          type: "number",
                          example: 25,
                        },
                        totalPages: {
                          type: "number",
                          example: 3,
                        },
                      },
                    },
                  },
                },
              },
            },
          },

          "401": {
            description: "Unauthorized",
          },
        },
      },

      post: {
        summary: "Create user",
        description: "Creates a new user. Available for administrators.",
        security: [
          {
            bearerAuth: [],
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: {
                    type: "string",
                    example: "John Doe",
                  },
                  email: {
                    type: "string",
                    example: "john@mail.com",
                  },
                  password: {
                    type: "string",
                    example: "123456",
                  },
                },
              },
            },
          },
        },

        responses: {
          "201": {
            description: "User created",
          },
          "400": {
            description: "Validation error",
          },
          "401": {
            description: "Unauthorized",
          },
          "403": {
            description: "Forbidden",
          },
          "409": {
            description: "Email already exists",
          },
        },
      },
    },

    "/auth/register": {
      post: {
        summary: "Register new user",
        description: "Creates a new user account",
        security: [],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: {
                    type: "string",
                    example: "John Doe",
                  },
                  email: {
                    type: "string",
                    example: "john@mail.com",
                  },
                  password: {
                    type: "string",
                    example: "123456",
                  },
                },
              },
            },
          },
        },

        responses: {
          "201": {
            description: "User successfully registered",
          },
          "400": {
            description: "Validation error",
          },
          "409": {
            description: "Email already exists",
          },
        },
      },
    },

    "/auth/login": {
      post: {
        summary: "Login user",
        description:
          "Authenticates a user and returns an access token and refresh token",
        security: [],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: {
                    type: "string",
                    example: "john@mail.com",
                  },
                  password: {
                    type: "string",
                    example: "123456",
                  },
                },
              },
            },
          },
        },

        responses: {
          "200": {
            description: "Access and refresh tokens returned",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      description: "JWT access token",
                      example:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    },
                    refreshToken: {
                      type: "string",
                      description: "Refresh token",
                      example:
                        "a1b2c3d4e5f6...",
                    },
                    email: {
                      type: "string",
                      example: "john@mail.com",
                    },
                    role: {
                      type: "string",
                      example: "user",
                    },
                    name: {
                      type: "string",
                      example: "John",
                    },
                    uuid: {
                      type: "string",
                      format: "uuid",
                      example:
                        "550e8400-e29b-41d4-a716-446655440000",
                    },
                  },
                },
              },
            },
          },

          "401": {
            description: "Invalid credentials",
          },
        },
      },
    },

    "/auth/refresh": {
      post: {
        summary: "Refresh access token",
        description:
          "Returns a new access token using a valid refresh token. Refresh token rotation is applied.",
        security: [],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["refreshToken"],
                properties: {
                  refreshToken: {
                    type: "string",
                    example: "a1b2c3d4e5f6...",
                  },
                },
              },
            },
          },
        },

        responses: {
          "200": {
            description: "New access token returned",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string",
                      description: "New JWT access token",
                      example:
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                    },
                    refreshToken: {
                      type: "string",
                      description: "New refresh token",
                      example:
                        "f6e5d4c3b2a1...",
                    },
                  },
                },
              },
            },
          },

          "400": {
            description: "Refresh token is required",
          },

          "401": {
            description: "Invalid or expired refresh token",
          },

          "404": {
            description: "User not found",
          },
        },
      },
    },

    "/auth/logout": {
      post: {
        summary: "Logout user",
        description:
          "Invalidates the provided refresh token",
        security: [],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["refreshToken"],
                properties: {
                  refreshToken: {
                    type: "string",
                    example: "a1b2c3d4e5f6...",
                  },
                },
              },
            },
          },
        },

        responses: {
          "204": {
            description: "User successfully logged out",
          },

          "400": {
            description: "Refresh token is required",
          },

          "404": {
            description: "Refresh token not found",
          },
        },
      },
    },

    "/users/{id}": {
      get: {
        summary: "Get user by id",
        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],

        responses: {
          "200": {
            description: "User found",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "number",
                      example: 1,
                    },
                    uuid: {
                      type: "string",
                      format: "uuid",
                      example:
                        "550e8400-e29b-41d4-a716-446655440000",
                    },
                    name: {
                      type: "string",
                      example: "John Doe",
                    },
                    email: {
                      type: "string",
                      example: "john@mail.com",
                    },
                    role: {
                      type: "string",
                      example: "user",
                    },
                    created_at: {
                      type: "string",
                      format: "date-time",
                    },
                    updated_at: {
                      type: "string",
                      format: "date-time",
                    },
                  },
                },
              },
            },
          },

          "401": {
            description: "Unauthorized",
          },

          "404": {
            description: "User not found",
          },
        },
      },

      put: {
        summary: "Update user",
        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    example: "Updated Name",
                  },
                  email: {
                    type: "string",
                    example: "updated@mail.com",
                  },
                },
              },
            },
          },
        },

        responses: {
          "200": {
            description: "User updated",
          },

          "400": {
            description: "Nothing to update",
          },

          "401": {
            description: "Unauthorized",
          },

          "403": {
            description: "Forbidden",
          },

          "404": {
            description: "User not found",
          },

          "409": {
            description: "Email already exists",
          },
        },
      },

      delete: {
        summary: "Delete user",
        description: "Deactivates a user account",
        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],

        responses: {
          "200": {
            description: "User deleted",
          },

          "401": {
            description: "Unauthorized",
          },

          "403": {
            description: "Forbidden",
          },

          "404": {
            description: "User not found",
          },
        },
      },
    },

    "/users/me": {
      get: {
        summary: "Get current user",
        description: "Returns user data from JWT token",
        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          "200": {
            description: "Current user data",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id: {
                      type: "number",
                      example: 1,
                    },
                    uuid: {
                      type: "string",
                      format: "uuid",
                      example:
                        "550e8400-e29b-41d4-a716-446655440000",
                    },
                    name: {
                      type: "string",
                      example: "John Doe",
                    },
                    email: {
                      type: "string",
                      example: "john@mail.com",
                    },
                    role: {
                      type: "string",
                      example: "user",
                    },
                    created_at: {
                      type: "string",
                      format: "date-time",
                    },
                    updated_at: {
                      type: "string",
                      format: "date-time",
                    },
                  },
                },
              },
            },
          },

          "401": {
            description: "Unauthorized",
          },

          "404": {
            description: "User not found",
          },
        },
      },

      delete: {
        summary: "Delete current user",
        description:
          "Deactivates the currently authenticated user",
        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          "204": {
            description: "User successfully deactivated",
          },

          "401": {
            description: "Unauthorized",
          },

          "404": {
            description: "User not found",
          },
        },
      },
    },
  },
};
