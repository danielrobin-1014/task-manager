# 🚀 Secure Task Management Dashboard

> A full-stack task management application built with React, TypeScript, Node.js, Express, and MongoDB. Features JWT authentication, real-time updates, and a modern UI.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Third-Party Libraries](#third-party-libraries)
- [Technical Decisions](#technical-decisions)
- [Known Limitations](#known-limitations)
- [Future Improvements](#future-improvements)

---

## 🎯 Overview

This project is a **secure, production-ready task management dashboard** that demonstrates modern full-stack development practices. It includes complete authentication, CRUD operations, state management, and a polished UI with dark mode support.

**Live Deployment:**
- Frontend: [https://task-manager-vitasoft.vercel.app](https://task-manager-vitasoft.vercel.app)
- Backend: [https://task-manager-ysb6.onrender.com](https://task-manager-ysb6.onrender.com)
- API Docs: [https://task-manager-ysb6.onrender.com/api/docs](https://task-manager-ysb6.onrender.com/api/docs)

---

## ✨ Features

### Core Features
- ✅ **JWT Authentication** - Secure login/register with token-based auth
- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete tasks
- ✅ **Protected Routes** - All API endpoints require valid JWT token
- ✅ **Type Safety** - Strict TypeScript on both frontend and backend (zero `any` types)
- ✅ **Input Validation** - Zod schemas for runtime validation
- ✅ **Error Handling** - Comprehensive error handling with custom error classes

### Bonus Features
- 🌙 **Dark Mode** - Full theme support with system preference detection
- 🔍 **Search & Filter** - Real-time search and status filtering
- 📊 **Server-side Pagination** - Efficient data handling for large datasets
- 🎨 **Responsive Design** - Mobile-first, works on all screen sizes
- ⚡ **Optimistic Updates** - Instant UI feedback with React Query
- 📚 **Swagger Documentation** - Interactive API docs at `/api/docs`
- 🔄 **Real-time Sync** - Automatic data refetching and cache invalidation

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library with latest features |
| **TypeScript** | Type-safe development |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS v4** | Utility-first styling with custom theme |
| **TanStack Query** | Data fetching, caching, and synchronization |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP client with interceptors |
| **React Hot Toast** | Beautiful toast notifications |
| **date-fns** | Date formatting and manipulation |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js + Express** | Server framework |
| **TypeScript** | Type-safe development |
| **MongoDB + Mongoose** | Database and ODM |
| **JWT** | Token-based authentication |
| **bcrypt** | Password hashing |
| **Zod** | Runtime schema validation |
| **Swagger** | API documentation |

---

## 📁 Project Structure

```
task-manager/
├── backend/                    # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/       # Request handlers
│   │   ├── services/          # Business logic
│   │   ├── models/            # Mongoose schemas
│   │   ├── middleware/        # Express middleware (auth, validation, error handling)
│   │   ├── routes/            # API routes
│   │   ├── config/            # Configuration (DB, Swagger)
│   │   ├── types/             # TypeScript interfaces
│   │   ├── utils/             # Utility functions
│   │   └── index.ts           # Entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── frontend/                   # React + TypeScript frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── contexts/          # React Context (Auth, Theme)
│   │   ├── hooks/             # Custom hooks (useTasks, useAuth)
│   │   ├── services/          # API service layer
│   │   ├── types/             # TypeScript interfaces
│   │   └── utils/             # Utility functions
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── README.md
│
└── README.md                   # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** (local or Atlas)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/danielrobin-1014/task-manager.git
   cd task-manager
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   # Start development server
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with backend API URL
   
   # Start development server
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api
   - Swagger Docs: http://localhost:5000/api/docs

### Environment Variables

**Backend (.env)**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Task Endpoints (All require authentication)

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/tasks` | Get all tasks | `status`, `sortBy`, `sortOrder`, `page`, `limit` |
| GET | `/api/tasks/:id` | Get task by ID | - |
| POST | `/api/tasks` | Create task | - |
| PUT | `/api/tasks/:id` | Update task | - |
| DELETE | `/api/tasks/:id` | Delete task | - |

### Query Parameters Example
```
GET /api/tasks?status=pending&sortBy=createdAt&sortOrder=desc&page=1&limit=10
```

**Interactive API Documentation:** Visit `/api/docs` when the server is running.

---

## 📦 Third-Party Libraries

### Why TanStack Query (React Query)?
- **Automatic caching** - Reduces unnecessary API calls
- **Background refetching** - Keeps data fresh automatically
- **Optimistic updates** - Instant UI feedback
- **Request deduplication** - Prevents duplicate requests
- **Built-in loading/error states** - Simplifies state management

### Why Tailwind CSS v4?
- **Utility-first** - Rapid UI development
- **Small bundle size** - Only includes used styles
- **Customizable** - Easy theming and dark mode
- **Responsive** - Mobile-first design system
- **Modern features** - Custom properties, @theme, @layer

### Why Zod?
- **Runtime validation** - Catches errors at runtime
- **Type inference** - Generates TypeScript types automatically
- **Schema reusability** - Share validation between frontend/backend
- **Clear error messages** - Better developer experience

### Why date-fns?
- **Lightweight** - Smaller than moment.js
- **Tree-shakeable** - Only bundle what you use
- **Immutable** - Functional programming approach
- **TypeScript support** - Full type definitions

---

## 🎯 Technical Decisions

### Architecture Choices

1. **Separation of Concerns**
   - Controllers handle HTTP requests
   - Services contain business logic
   - Models define data structure
   - Middleware handles cross-cutting concerns

2. **Type Safety**
   - Strict TypeScript mode enabled
   - No `any` types used (verified with ESLint)
   - Shared type definitions ensure consistency
   - Zod schemas provide runtime validation

3. **Security**
   - JWT tokens with secure secrets
   - Password hashing with bcrypt (10 rounds)
   - CORS configured for frontend origin
   - Protected routes with authentication middleware
   - Input validation on all endpoints

4. **State Management**
   - React Context for global state (Auth, Theme)
   - TanStack Query for server state
   - Local component state for UI state
   - No unnecessary Redux complexity

5. **Error Handling**
   - Custom error classes (AppError, ValidationError, etc.)
   - Global error handler middleware
   - User-friendly error messages
   - Proper HTTP status codes

---

## ⚠️ Known Limitations

1. **No Email Verification**
   - Users can register without email confirmation
   - *Future: Implement email verification service*

2. **Basic Task Model**
   - No subtasks, tags, or priorities
   - *Future: Add advanced task properties*

3. **Single User Tasks**
   - No task sharing or collaboration
   - *Future: Add team/sharing features*

4. **No File Attachments**
   - Tasks only support text
   - *Future: Add file upload capability*

5. **CSS Linter Warnings**
   - Tailwind v4 syntax (@theme, @layer) shows warnings in some editors
   - These are valid and work correctly at build/runtime

---

## 🚧 Future Improvements

### If I Had More Time...

**High Priority:**
- [ ] Add task categories/tags
- [ ] Implement task priorities (low, medium, high)
- [ ] Add due dates with reminders
- [ ] Task search with full-text search
- [ ] Bulk actions (delete, complete multiple tasks)

**Medium Priority:**
- [ ] User profile management
- [ ] Avatar/profile picture upload
- [ ] Export tasks (CSV, PDF)
- [ ] Task statistics dashboard
- [ ] Email notifications

**Low Priority:**
- [ ] Team collaboration features
- [ ] Task comments and activity log
- [ ] Recurring tasks
- [ ] Keyboard shortcuts
- [ ] Offline support with PWA

**Technical Improvements:**
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Add unit tests (Jest, React Testing Library)
- [ ] Implement rate limiting
- [ ] Add request logging (Winston/Morgan)
- [ ] Database indexing optimization
- [ ] Add Redis for caching
- [ ] Implement WebSockets for real-time updates

---

## ✅ Assessment Requirements Checklist

### Functional Requirements
- ✅ **Authentication** - JWT-based login/register flow
- ✅ **CRUD Operations** - Complete task management
- ✅ **Third-Party Integration** - Multiple libraries (React Query, date-fns, etc.)
- ✅ **State Management** - React Context + TanStack Query

### Technical Constraints
- ✅ **Type Safety** - Strict TypeScript, zero `any` types
- ✅ **Clean Code** - No console warnings (except server logs), linter-clean
- ✅ **Authentication** - All protected routes require JWT token
- ✅ **Styling** - Tailwind CSS with responsive design
- ✅ **Documentation** - Comprehensive README files

### Additional Marks
- ✅ **Swagger Implementation** - Available at `/api/docs`
- ✅ **Code Comments** - All files have JSDoc comments
- ✅ **Good UI/UX** - Modern, polished design with dark mode

---

## 📝 Scripts

### Backend
```bash
npm run dev          # Start development server with hot reload
npm run build        # Compile TypeScript to JavaScript
npm start            # Run production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types
```

### Frontend
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 🤝 Contributing

This is an assessment project, but contributions are welcome for learning purposes!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - feel free to use this project for learning or reference.

---

## 👤 Author

**Daniel Robin**
- GitHub: [@danielrobin-1014](https://github.com/danielrobin-1014)
- Email: vitasoft.it@gmail.com

---

## 🙏 Acknowledgments

- **Vitasoft** - For the technical assessment opportunity
- React, TypeScript, and Node.js communities for excellent tooling
- Tailwind Labs for the amazing CSS framework

---

**Built with ❤️ for the Vitasoft Technical Assessment**
