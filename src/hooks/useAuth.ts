import { useAppSelector, useAppDispatch } from './redux';
import { logout, clearError } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, token, loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    logout: handleLogout,
    clearError: handleClearError,
  };
}; 