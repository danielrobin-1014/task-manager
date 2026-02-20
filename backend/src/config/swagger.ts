/**
 * Swagger/OpenAPI Documentation Configuration
 */

export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Task Management Dashboard API",
    version: "1.0.0",
    description:
      "A secure task management REST API with JWT authentication built with Node.js, Express, TypeScript, and MongoDB",
    contact: {
      name: "API Support",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
  tags: [
    {
      name: "Authentication",
      description: "User authentication endpoints",
    },
    {
      name: "Tasks",
      description: "Task management endpoints (protected)",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter JWT token obtained from login",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "507f1f77bcf86cd799439011",
          },
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      Task: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "507f1f77bcf86cd799439011",
          },
          title: {
            type: "string",
            example: "Complete project documentation",
          },
          description: {
            type: "string",
            example: "Write comprehensive README and API docs",
          },
          status: {
            type: "string",
            enum: ["pending", "completed"],
            example: "pending",
          },
          userId: {
            type: "string",
            example: "507f1f77bcf86cd799439012",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },
      RegisterRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          password: {
            type: "string",
            minLength: 6,
            example: "password123",
          },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com",
          },
          password: {
            type: "string",
            example: "password123",
          },
        },
      },
      AuthResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          message: {
            type: "string",
            example: "Login successful",
          },
          data: {
            type: "object",
            properties: {
              token: {
                type: "string",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
              user: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
      },
      CreateTaskRequest: {
        type: "object",
        required: ["title", "description"],
        properties: {
          title: {
            type: "string",
            maxLength: 200,
            example: "Complete assignment",
          },
          description: {
            type: "string",
            maxLength: 1000,
            example: "Finish the backend module for task management",
          },
        },
      },
      UpdateTaskRequest: {
        type: "object",
        properties: {
          title: {
            type: "string",
            maxLength: 200,
            example: "Updated task title",
          },
          description: {
            type: "string",
            maxLength: 1000,
            example: "Updated task description",
          },
          status: {
            type: "string",
            enum: ["pending", "completed"],
            example: "completed",
          },
        },
      },
      TaskResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          message: {
            type: "string",
            example: "Task created successfully",
          },
          data: {
            type: "object",
            properties: {
              task: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
      },
      TaskListResponse: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: true,
          },
          message: {
            type: "string",
            example: "Tasks fetched successfully",
          },
          data: {
            type: "object",
            properties: {
              tasks: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Task",
                },
              },
              total: {
                type: "number",
                example: 25,
                description: "Total number of tasks matching the query",
              },
              page: {
                type: "number",
                example: 1,
                description: "Current page number",
              },
              totalPages: {
                type: "number",
                example: 3,
                description: "Total number of pages",
              },
            },
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          error: {
            type: "string",
            example: "ValidationError",
          },
          message: {
            type: "string",
            example: "Email and password are required",
          },
          statusCode: {
            type: "number",
            example: 400,
          },
        },
      },
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register a new user",
        description: "Create a new user account with email and password",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "User registered successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AuthResponse",
                },
              },
            },
          },
          400: {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login user",
        description: "Authenticate user and receive JWT token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AuthResponse",
                },
              },
            },
          },
          401: {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get current user",
        description: "Get authenticated user information",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "User fetched successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "User fetched successfully",
                    },
                    data: {
                      type: "object",
                      properties: {
                        user: {
                          $ref: "#/components/schemas/User",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized - Invalid or missing token",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/tasks": {
      post: {
        tags: ["Tasks"],
        summary: "Create a new task",
        description: "Create a new task for the authenticated user",
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
                $ref: "#/components/schemas/CreateTaskRequest",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Task created successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TaskResponse",
                },
              },
            },
          },
          400: {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Tasks"],
        summary: "Get all tasks",
        description: "Get all tasks for the authenticated user with filtering, sorting, and pagination",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "status",
            in: "query",
            description: "Filter by task status",
            required: false,
            schema: {
              type: "string",
              enum: ["pending", "completed"],
            },
          },
          {
            name: "sortBy",
            in: "query",
            description: "Sort by field",
            required: false,
            schema: {
              type: "string",
              enum: ["createdAt", "updatedAt", "title"],
              default: "createdAt",
            },
          },
          {
            name: "sortOrder",
            in: "query",
            description: "Sort order",
            required: false,
            schema: {
              type: "string",
              enum: ["asc", "desc"],
              default: "desc",
            },
          },
          {
            name: "page",
            in: "query",
            description: "Page number",
            required: false,
            schema: {
              type: "integer",
              minimum: 1,
              default: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            description: "Number of tasks per page",
            required: false,
            schema: {
              type: "integer",
              minimum: 1,
              maximum: 100,
              default: 100,
            },
          },
        ],
        responses: {
          200: {
            description: "Tasks fetched successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TaskListResponse",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/tasks/{id}": {
      get: {
        tags: ["Tasks"],
        summary: "Get a single task",
        description: "Get a specific task by ID",
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
            description: "Task ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Task fetched successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TaskResponse",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          403: {
            description: "Forbidden - Task belongs to another user",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          404: {
            description: "Task not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Tasks"],
        summary: "Update a task",
        description: "Update a specific task by ID",
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
            description: "Task ID",
            schema: {
              type: "string",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateTaskRequest",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Task updated successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/TaskResponse",
                },
              },
            },
          },
          400: {
            description: "Validation error",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          403: {
            description: "Forbidden - Task belongs to another user",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          404: {
            description: "Task not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Tasks"],
        summary: "Delete a task",
        description: "Delete a specific task by ID",
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
            description: "Task ID",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Task deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: {
                      type: "boolean",
                      example: true,
                    },
                    message: {
                      type: "string",
                      example: "Task deleted successfully",
                    },
                  },
                },
              },
            },
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          403: {
            description: "Forbidden - Task belongs to another user",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
          404: {
            description: "Task not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse",
                },
              },
            },
          },
        },
      },
    },
  },
};
