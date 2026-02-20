# Task Management Dashboard - Frontend

A secure, modern task management application built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── hooks/          # Custom React hooks
├── services/       # API service functions
├── types/          # TypeScript type definitions
├── contexts/       # React context providers
└── utils/          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on http://localhost:3000

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your backend API URL:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at http://localhost:5173

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Features

### Core Features
- 🔐 JWT-based authentication
- ✅ Complete CRUD operations for tasks
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔄 Real-time data updates with React Query
- 📱 Mobile-friendly design
- 🚀 Fast development with Vite HMR
- 💪 Type-safe with TypeScript strict mode

### Bonus Features (High Score)
- 🌙 **Dark Mode** - Full dark theme support with persistence
- 🔍 **Search Tasks** - Real-time search by title and description
- 🏷️ **Filter Tabs** - All / Pending / Completed task views
- 📊 **Server-side Filtering** - Efficient task filtering via API
- ⚡ **Optimized Performance** - Smart caching and query management

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000/api` |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Code Quality

- **TypeScript** strict mode enabled
- **ESLint** configured with React and TypeScript rules
- **Prettier** for consistent code formatting
- Zero `any` types policy
- Unused variables and imports warnings

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

