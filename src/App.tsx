import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./store";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import ChefDashboard from "./pages/ChefDashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route 
              path="/user/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <UserDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/user/profile" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chef/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['chef']}>
                  <ChefDashboard />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
