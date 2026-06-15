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

  paths : {
    "/health" : {
        get: {
            summary : "Health check",
            responses: {
                "200": {
                    description: "Server is running",
                }
            }
        }
    },
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
                        id: { type: "number" },
                        name: { type: "string" },
                        email: { type: "string" },
                        role: { type: "string" },
                        created_at: { type: "string" },
                      },
                    },
                  },
                  meta: {
                    type: "object",
                    properties: {
                      page: { type: "number" },
                      limit: { type: "number" },
                      total: { type: "number" },
                      totalPages: { type: "number" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    post: {
      summary: "Create user",
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
                name: { type: "string", example: "John Doe" },
                email: { type: "string", example: "john@mail.com" },
                password: { type: "string", example: "123456" },
              },
            },
          },
        },
      },
      responses: {
        "201": {
          description: "User created",
        },
      },
    },
  },
  "/auth/register": {
  post: {
    summary: "Register new user",
    description: "Creates a new user account",
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
    description: "Returns JWT token",
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
        description: "JWT token returned",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
                email: { type: "string",
                    example: "John@mail.com" },
                role: { type: "string",
                    example: "user" },
                name: { type: "string",
                    exapmle: "John" }
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
          },
        },
      ],
      responses: {
        "200": {
          description: "User found",
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
                name: { type: "string" },
                email: { type: "string" },
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
        "404": {
          description: "User not found",
        },
      },
    },

    delete: {
      summary: "Delete user",
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
          },
        },
      ],
      responses: {
        "200": {
          description: "User deleted",
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
                id: { type: "number" },
                name: { type: "string" },
                email: { type: "string" },
                role: { type: "string" },
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
},
  }
};