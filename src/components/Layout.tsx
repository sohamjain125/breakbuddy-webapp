import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChefHat, User, LogOut, Home } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface LayoutProps {
  children: ReactNode;
  userType?: 'user' | 'chef' | null;
}

const Layout = ({ children, userType }: LayoutProps) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Determine user type from Redux state if not provided
  const currentUserType = userType || (user?.role === 'employee' ? 'user' : user?.role === 'chef' ? 'chef' : null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary to-background">
      {/* Header */}
      <header className="bg-background border-b border-border shadow-[var(--shadow-soft)]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-[var(--gradient-primary)] bg-clip-text text-transparent">
                BreakBuddy
              </span>
            </Link>

            <nav className="flex items-center space-x-4">
              {currentUserType === 'user' && (
                <>
                  <Link to="/user/dashboard">
                    <Button variant="ghost" size="sm">
                      <Home className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/user/profile">
                    <Button variant="ghost" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                </>
              )}

              {currentUserType === 'chef' && (
                <Link to="/chef/dashboard">
                  <Button variant="ghost" size="sm">
                    <ChefHat className="h-4 w-4 mr-2" />
                    Chef Dashboard
                  </Button>
                </Link>
              )}

              {currentUserType && (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-background border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                © 2024 BreakBuddy. Making breakfast booking simple.
              </span>
            </div>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <span>Booking closes at 4 PM daily</span>
              <span>•</span>
              <span>Need help? Contact your admin</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;