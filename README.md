# Role-Based Dashboard Application

A production-ready, role-based dashboard built with Next.js, React, Clerk Authentication, and TypeScript. This application demonstrates proper authentication, authorization, protected routes, and full CRUD operations with an admin and user role system.

## Features

### Authentication & Authorization
- **Clerk Authentication** - Secure user authentication with email/password
- **Role-Based Access Control** - Admin and User roles with different permissions
- **Protected Routes** - Middleware and client-side route protection
- **User Session Management** - Secure session handling with Clerk

### Admin Features (Admin Role Only)
- Full CRUD operations on users
- Admin dashboard with system statistics
- User management interface
- Create, edit, and delete users
- Role and status management

### User Features (All Users)
- Personal dashboard with analytics
- Read-only data browsing
- Product catalog viewing
- Limited access to admin features

### Technical Features
- **Search with Debounce** - Real-time search with 300ms debounce
- **Pagination** - Client-side pagination with customizable page size
- **Responsive Design** - Mobile-first design with sidebar navigation
- **Server & Client Components** - Optimized rendering with Next.js 16
- **Type Safety** - Full TypeScript implementation
- **Mock Data Layer** - Easily replaceable with real API

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Authentication**: Clerk
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React Hooks
- **Icons**: Lucide React

## Project Structure

\`\`\`
src/
├── app/
│   ├── actions/            # Server actions for mutations
│   ├── admin/              # Admin-only pages
│   │   ├── users/          # User management CRUD
│   │   └── page.tsx        # Admin dashboard
│   ├── dashboard/          # User dashboard pages
│   │   ├── data/           # Data browsing page
│   │   └── page.tsx        # Main dashboard
│   ├── sign-in/            # Sign-in page
│   ├── sign-up/            # Sign-up page
│   └── layout.tsx          # Root layout with Clerk provider
├── components/
│   ├── admin/              # Admin-specific components
│   │   ├── user-form.tsx   # User create/edit form
│   │   └── user-table.tsx  # User management table
│   ├── user/               # User-specific components
│   │   └── data-list.tsx   # Product browsing list
│   ├── ui/                 # shadcn UI components
│   ├── dashboard-layout.tsx # Shared dashboard layout
│   ├── protected-route.tsx  # Client-side route protection
│   ├── pagination.tsx       # Reusable pagination component
│   └── search-input.tsx     # Search input component
├── hooks/
│   ├── use-debounce.ts     # Debounce hook
│   ├── use-pagination.ts   # Pagination hook
│   └── use-user-role.ts    # Client-side role checking
├── lib/
│   ├── get-user-role.ts    # Server-side role checking
│   ├── mock-data.ts        # Mock database layer
│   └── utils.ts            # Utility functions
└── middleware.ts           # Route protection middleware
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Clerk account (free tier available)

### Installation

1. Clone and install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Set up Clerk:
   - Create a free account at [clerk.com](https://clerk.com)
   - Create a new application
   - Copy your API keys

3. Add environment variables:
   - Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in the v0 Vars section
   - Add `CLERK_SECRET_KEY` in the v0 Vars section

4. Configure user roles in Clerk:
   - Go to your Clerk Dashboard
   - Navigate to Users
   - Select a user
   - Add "role" to public metadata with value "admin" or "user"

Example metadata:
\`\`\`json
{
  "role": "admin"
}
\`\`\`

### Running the Application

The app runs automatically in v0's preview environment. To deploy:

1. Click "Publish" in the top right
2. Deploy to Vercel
3. Add your Clerk environment variables in Vercel project settings

## Usage Guide

### For Regular Users

1. Sign in with your credentials
2. View the main dashboard with your analytics
3. Browse the data catalog (read-only)
4. Search and filter products
5. View detailed product information

### For Admin Users

1. Sign in with admin credentials
2. Access all user features PLUS:
   - Admin panel with system statistics
   - User management interface
   - Create new users
   - Edit existing users
   - Delete users
   - Search and paginate through users

### Setting Admin Role

To make a user an admin:

1. Go to Clerk Dashboard
2. Select the user
3. Add to public metadata:
\`\`\`json
{
  "role": "admin"
}
\`\`\`

## Key Components

### Authentication Flow

- Users land on home page
- Redirected to sign-in if not authenticated
- Middleware protects `/dashboard` and `/admin` routes
- Role checked on every protected page load

### Role Checking

**Server-side** (use in Server Components and Server Actions):
\`\`\`typescript
import { getUserRole, isAdmin } from '@/lib/get-user-role'

const role = await getUserRole() // 'admin' | 'user'
const adminAccess = await isAdmin() // boolean
\`\`\`

**Client-side** (use in Client Components):
\`\`\`typescript
import { useUserRole, useIsAdmin } from '@/hooks/use-user-role'

const role = useUserRole() // 'admin' | 'user'
const isAdmin = useIsAdmin() // boolean
\`\`\`

### CRUD Operations

All CRUD operations use Server Actions for type-safe mutations:

\`\`\`typescript
import { createUserAction, updateUserAction, deleteUserAction } from '@/app/actions/user-actions'

// Create
await createUserAction({ name, email, role, status })

// Update
await updateUserAction(id, { name, status })

// Delete
await deleteUserAction(id)
\`\`\`

### Search & Pagination

Both features are implemented with reusable hooks:

\`\`\`typescript
// Debounced search
const debouncedSearch = useDebounce(searchQuery, 300)

// Pagination
const { currentPage, totalPages, paginatedItems, goToPage } = usePagination({
  items: filteredData,
  itemsPerPage: 5
})
\`\`\`

## Replacing Mock Data with Real API

To connect to a real database:

1. Replace mock functions in `lib/mock-data.ts` with API calls
2. Update Server Actions in `app/actions/` to call your API
3. Add proper error handling
4. Implement loading states

Example:
\`\`\`typescript
// Before (Mock)
export function getUsers(): User[] {
  return [...mockUsers]
}

// After (Real API)
export async function getUsers(): Promise<User[]> {
  const response = await fetch('/api/users')
  return response.json()
}
\`\`\`

## Environment Variables

Required for Clerk:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

The app is production-ready and follows all Next.js and React best practices.

## Architecture Decisions

- **Server Components First**: Use Server Components by default for better performance
- **Client Components Only When Needed**: Use "use client" only for interactivity
- **Server Actions for Mutations**: Type-safe, secure mutations without API routes
- **Middleware for Auth**: Protection at the edge before page loads
- **Mock Data Pattern**: Easily swap for real database without changing UI code
- **Reusable Hooks**: Shared logic in custom hooks (debounce, pagination, roles)

## Future Enhancements

- Add real database (Supabase, PostgreSQL)
- Implement product CRUD for admins
- Add email notifications
- Create audit logs
- Add data export functionality
- Implement advanced filtering
- Add charts and analytics
- Create API documentation

## License

MIT

## Support

For issues or questions about this implementation, refer to the documentation:
- [Next.js Docs](https://nextjs.org/docs)
- [Clerk Docs](https://clerk.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
