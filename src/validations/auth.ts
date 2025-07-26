import * as yup from 'yup';

// Employee registration validation schema
export const registerSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters'),
  employeeId: yup
    .string()
    .required('Employee ID is required')
    .min(3, 'Employee ID must be at least 3 characters')
    .max(20, 'Employee ID must be less than 20 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

// Employee login validation schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .min(6, 'Email must be at least 6 characters')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required'),
});

// Chef login validation schema
export const chefLoginSchema = yup.object({
  chefId: yup
    .string()
    .required('Chef ID is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

// TypeScript types for the schemas
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type ChefLoginFormData = yup.InferType<typeof chefLoginSchema>; 