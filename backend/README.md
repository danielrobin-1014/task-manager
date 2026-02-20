# Task Management Backend

A secure Node.js + Express backend for task management with JWT authentication.

## Tech Stack

- Node.js + Express
- TypeScript (strict mode)
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing
- Zod for validation
- Swagger for API documentation

## Project Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── middleware/      # Express middleware
│   ├── models/          # Database schemas
│   ├── types/           # TypeScript interfaces
│   ├── config/          # Configuration files
│   ├── utils/           # Utility functions
│   └── index.ts         # Application entry point
├── dist/                # Compiled JavaScript
├── .env                 # Environment variables
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies
└── README.md           # This file
```

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   - Edit `.env` file with your configuration
   - Set `MONGODB_URI` to your MongoDB connection string
   - Set `JWT_SECRET` to a secure key

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Start production server**
   ```bash
   npm start
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks` - Get all user tasks (with filtering, sorting, pagination)
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Query Parameters (GET /api/tasks)
The tasks endpoint supports advanced filtering, sorting, and pagination:

**Filtering:**
- `?status=pending` - Get only pending tasks
- `?status=completed` - Get only completed tasks

**Sorting:**
- `?sortBy=createdAt` - Sort by creation date (default)
- `?sortBy=updatedAt` - Sort by last update
- `?sortBy=title` - Sort alphabetically
- `?sortOrder=asc` - Ascending order
- `?sortOrder=desc` - Descending order (default)

**Pagination:**
- `?page=1` - Page number (default: 1)
- `?limit=10` - Tasks per page (default: 100, max: 100)

**Example:**
```
GET /api/tasks?status=pending&sortBy=createdAt&sortOrder=desc&page=1&limit=10
```

**Response Format:**
```json
{
  "success": true,
  "message": "Tasks fetched successfully",
  "data": {
    "tasks": [...],
    "total": 25,
    "page": 1,
    "totalPages": 3
  }
}
```

## API Documentation (Swagger)

Interactive API documentation is available at:

```
http://localhost:5000/api/docs
```

The Swagger UI provides:
- Complete endpoint documentation
- Request/response schemas
- Authentication testing with JWT tokens
- Try-it-out functionality for all endpoints

### Using Swagger UI

1. Start the server: `npm run dev`
2. Open browser to `http://localhost:5000/api/docs`
3. For protected endpoints:
   - First call `/api/auth/login` to get a token
   - Click "Authorize" button at the top
   - Enter: `Bearer <your_token>`
   - Now you can test protected endpoints

## Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/task-manager
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
BCRYPT_ROUNDS=10
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- Input validation with Zod
- CORS protection
- Error handling with custom error classes

## Development Notes

- TypeScript strict mode enabled
- No `any` types allowed
- ESLint configured for code quality
- Prettier for code formatting
- Request logger for debugging
