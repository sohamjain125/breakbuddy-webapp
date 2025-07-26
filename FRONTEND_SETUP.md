# BreakBuddy Frontend

A modern React TypeScript frontend for the BreakBuddy breakfast booking system with Redux state management, form validation, and API integration.

## 🚀 Features

- **Modern React** - Built with React 18 and TypeScript
- **Redux Toolkit** - Centralized state management
- **Form Validation** - Yup schemas with React Hook Form
- **API Integration** - Axios with automatic token management
- **Protected Routes** - Role-based access control
- **JWT Authentication** - Secure token-based sessions
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **UI Components** - Shadcn/ui component library
- **Toast Notifications** - User feedback with Sonner
- **TypeScript** - Full type safety throughout the application

## 🏗️ Architecture

```
breakbuddy-app/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Shadcn/ui components
│   │   ├── Layout.tsx   # Main layout component
│   │   └── ProtectedRoute.tsx
│   ├── pages/           # Page components
│   │   ├── Login.tsx
│   │   ├── UserDashboard.tsx
│   │   ├── UserProfile.tsx
│   │   ├── ChefDashboard.tsx
│   │   └── NotFound.tsx
│   ├── store/           # Redux store
│   │   ├── index.ts
│   │   └── slices/
│   │       └── authSlice.ts
│   ├── hooks/           # Custom hooks
│   │   ├── redux.ts
│   │   └── useAuth.ts
│   ├── config/          # Configuration files
│   │   └── api.ts
│   ├── validations/     # Yup validation schemas
│   │   └── auth.ts
│   └── lib/             # Utility functions
├── public/              # Static assets
├── package.json
└── README.md
```

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **BreakBuddy Backend** running on port 5000

## 🔧 Installation & Setup

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd breakbuddy-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
VITE_BACKEND_URL=http://localhost:5000
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔐 Authentication System

### User Types
- **Employee** - Can register, login, and access user dashboard
- **Chef** - Can login and access chef dashboard

### Authentication Flow

#### 1. Employee Registration
```typescript
// Form validation with Yup
const registerSchema = yup.object({
  fullName: yup.string().required().min(2).max(50),
  employeeId: yup.string().required().min(3).max(20),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  confirmPassword: yup.string().oneOf([yup.ref('password')])
});

// Redux action
dispatch(registerUser(formData));
```

#### 2. Employee Login
```typescript
const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required()
});

dispatch(loginUser(formData));
```

#### 3. Chef Login
```typescript
const chefLoginSchema = yup.object({
  chefId: yup.string().required(),
  password: yup.string().required()
});

dispatch(loginChef(formData));
```

## 🛡️ Protected Routes

### Route Protection
```typescript
<ProtectedRoute allowedRoles={['employee']}>
  <UserDashboard />
</ProtectedRoute>
```

### Available Routes
- `/` - Login/Register page
- `/user/dashboard` - Employee dashboard (protected)
- `/user/profile` - Employee profile (protected)
- `/chef/dashboard` - Chef dashboard (protected)
- `/*` - 404 Not Found page

## 📝 Form Validation

### Registration Form Rules
- **Full Name:** Required, 2-50 characters
- **Employee ID:** Required, 3-20 characters
- **Email:** Required, valid email format
- **Password:** Required, minimum 6 characters, must contain uppercase, lowercase, and number
- **Confirm Password:** Must match password

### Login Form Rules
- **Email/Chef ID:** Required
- **Password:** Required

### Error Display
```typescript
{form.formState.errors.email && (
  <p className="text-sm text-red-500 mt-1">
    {form.formState.errors.email.message}
  </p>
)}
```

## 🔄 State Management

### Redux Store Structure
```typescript
interface AuthState {
  user: User | Chef | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}
```

### Redux Actions
- `registerUser` - Employee registration
- `loginUser` - Employee login
- `loginChef` - Chef login
- `logout` - Clear authentication
- `clearError` - Clear error messages

### Using Redux Hooks
```typescript
// Typed hooks for better TypeScript support
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

const dispatch = useAppDispatch();
const { user, loading, error } = useAppSelector(state => state.auth);
```

## 🎯 Custom Hooks

### useAuth Hook
```typescript
import { useAuth } from '@/hooks/useAuth';

const { user, loading, error, logout, clearError } = useAuth();
```

### Features
- Access to authentication state
- Loading and error states
- Logout functionality
- Error clearing

## 🚨 Error Handling

### API Error Handling
```typescript
// Automatic error handling in Redux slice
.catch(error => {
  return rejectWithValue(error.response?.data?.error || 'Login failed');
})
```

### Form Validation Errors
- Inline error display
- Real-time validation
- User-friendly error messages

### Toast Notifications
```typescript
import { toast } from 'sonner';

// Success notification
toast.success('Welcome back!');

// Error notification
toast.error('Invalid credentials');
```

## 🎨 UI/UX Features

### Design System
- **Green and White Theme** - Consistent brand colors
- **Responsive Design** - Mobile-first approach
- **Loading States** - Disabled buttons during API calls
- **Error Messages** - Inline validation errors
- **Success Notifications** - Toast notifications
- **Protected Navigation** - Role-based menu items

### Component Library
- **Shadcn/ui** - Modern, accessible components
- **Tailwind CSS** - Utility-first styling
- **Lucide Icons** - Beautiful icon set
- **Sonner** - Toast notifications

## 🔒 Security Features

### JWT Token Management
- Automatic token storage in localStorage
- Token inclusion in API requests
- Automatic logout on token expiration
- Secure token removal on logout

### Role-based Access
- Route protection based on user roles
- Conditional navigation rendering
- Automatic redirects for unauthorized access

### Form Security
- Input validation and sanitization
- Password strength requirements
- CSRF protection via axios interceptors

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Environment Variables
```env
VITE_BACKEND_URL=http://localhost:5000
```

### API Configuration
```typescript
// src/config/api.ts
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
```

## 📋 Testing the Application

### 1. Start Backend Server
```bash
cd breakbuddy-api
npm run dev
```

### 2. Start Frontend Server
```bash
cd breakbuddy-app
npm run dev
```

### 3. Test Credentials

#### Default Chef Account
- **Chef ID:** `chef001`
- **Password:** `chef123`

#### Test Employee Registration
```json
{
  "fullName": "Test Employee",
  "employeeId": "EMP1001",
  "email": "test@company.com",
  "password": "TestPass123",
  "confirmPassword": "TestPass123"
}
```

### 4. Test Scenarios
1. **Employee Registration** - Create new employee account
2. **Employee Login** - Login with registered credentials
3. **Chef Login** - Login with chef credentials
4. **Protected Routes** - Verify role-based access
5. **Logout** - Test logout functionality
6. **Error Handling** - Test validation errors

## 🧪 Testing Features

### Manual Testing Checklist
- [ ] Employee registration with valid data
- [ ] Employee registration with invalid data (validation errors)
- [ ] Employee login with correct credentials
- [ ] Employee login with incorrect credentials
- [ ] Chef login with correct credentials
- [ ] Chef login with incorrect credentials
- [ ] Protected route access (employee routes)
- [ ] Protected route access (chef routes)
- [ ] Unauthorized route access (redirects)
- [ ] Logout functionality
- [ ] Token expiration handling
- [ ] Responsive design on mobile/tablet

## 📚 Technologies Used

### Core Technologies
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### State Management
- **Redux Toolkit** - State management
- **React Redux** - React bindings

### Form Handling
- **React Hook Form** - Form state management
- **Yup** - Schema validation
- **@hookform/resolvers** - Form validation integration

### API Communication
- **Axios** - HTTP client
- **JWT** - Authentication tokens

### UI Components
- **Shadcn/ui** - Component library
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

#### 1. Backend Connection Error
- Ensure backend server is running on port 5000
- Check `VITE_BACKEND_URL` in `.env` file
- Verify CORS configuration in backend

#### 2. Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`
- Verify all dependencies are installed

#### 3. Authentication Issues
- Clear localStorage: `localStorage.clear()`
- Check JWT token expiration
- Verify backend authentication endpoints

#### 4. Form Validation Errors
- Check Yup schema configuration
- Verify form field names match schema
- Ensure proper error handling in components

---

**Note:** This frontend is designed to work with the BreakBuddy backend API. Make sure the backend is running and properly configured before testing the frontend application. 