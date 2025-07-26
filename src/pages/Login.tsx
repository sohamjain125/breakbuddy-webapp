import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChefHat, User, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';
import Layout from '@/components/Layout';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { registerUser, loginUser, loginChef, clearError } from '@/store/slices/authSlice';
import { registerSchema, loginSchema, chefLoginSchema, RegisterFormData, LoginFormData, ChefLoginFormData } from '@/validations/auth';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Form hooks
  const loginForm = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: '',
      employeeId: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const chefLoginForm = useForm<ChefLoginFormData>({
    resolver: yupResolver(chefLoginSchema),
    defaultValues: {
      chefId: '',
      password: '',
    },
  });

  // Handle authentication success
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'employee') {
        navigate('/user/dashboard');
        toast.success('Welcome back!');
      } else if (user.role === 'chef') {
        navigate('/chef/dashboard');
        toast.success('Welcome to the kitchen!');
      }
    }
  }, [isAuthenticated, user, navigate]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleUserLogin = async (data: LoginFormData) => {
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (error) {
      // Error is handled by the slice
    }
  };

  const handleChefLogin = async (data: ChefLoginFormData) => {
    try {
      await dispatch(loginChef(data)).unwrap();
    } catch (error) {
      // Error is handled by the slice
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await dispatch(registerUser(data)).unwrap();
    } catch (error) {
      // Error is handled by the slice
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <ChefHat className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
              BreakBuddy
            </h1>
            <p className="text-muted-foreground mt-2">Your workplace breakfast companion</p>
          </div>

          <Tabs defaultValue="employee" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="employee">Employee</TabsTrigger>
              <TabsTrigger value="chef">Chef</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="employee">
              <Card className="shadow-[var(--shadow-medium)]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Employee Login
                  </CardTitle>
                  <CardDescription>Sign in to book your breakfast</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={loginForm.handleSubmit(handleUserLogin)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@company.com"
                          {...loginForm.register('email')}
                          className="pl-10"
                        />
                        {loginForm.formState.errors.email && (
                          <p className="text-sm text-red-500 mt-1">{loginForm.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          {...loginForm.register('password')}
                          className="pl-10"
                        />
                        {loginForm.formState.errors.password && (
                          <p className="text-sm text-red-500 mt-1">{loginForm.formState.errors.password.message}</p>
                        )}
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chef">
              <Card className="shadow-[var(--shadow-medium)]">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ChefHat className="h-5 w-5 mr-2" />
                    Chef Login
                  </CardTitle>
                  <CardDescription>Access the kitchen dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={chefLoginForm.handleSubmit(handleChefLogin)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="chef-id">Chef ID</Label>
                      <Input
                        id="chef-id"
                        placeholder="chef001"
                        {...chefLoginForm.register('chefId')}
                      />
                      {chefLoginForm.formState.errors.chefId && (
                        <p className="text-sm text-red-500 mt-1">{chefLoginForm.formState.errors.chefId.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chef-password">Password</Label>
                      <Input
                        id="chef-password"
                        type="password"
                        {...chefLoginForm.register('password')}
                      />
                      {chefLoginForm.formState.errors.password && (
                        <p className="text-sm text-red-500 mt-1">{chefLoginForm.formState.errors.password.message}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Accessing...' : 'Access Kitchen'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card className="shadow-[var(--shadow-medium)]">
                <CardHeader>
                  <CardTitle>Register</CardTitle>
                  <CardDescription>Create your employee account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        {...registerForm.register('fullName')}
                      />
                      {registerForm.formState.errors.fullName && (
                        <p className="text-sm text-red-500 mt-1">{registerForm.formState.errors.fullName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employee-id">Employee ID</Label>
                      <Input
                        id="employee-id"
                        {...registerForm.register('employeeId')}
                      />
                      {registerForm.formState.errors.employeeId && (
                        <p className="text-sm text-red-500 mt-1">{registerForm.formState.errors.employeeId.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input
                        id="reg-email"
                        type="email"
                        {...registerForm.register('email')}
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-red-500 mt-1">{registerForm.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reg-password">Password</Label>
                      <Input
                        id="reg-password"
                        type="password"
                        {...registerForm.register('password')}
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-red-500 mt-1">{registerForm.formState.errors.password.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        {...registerForm.register('confirmPassword')}
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Registering...' : 'Register'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Login;