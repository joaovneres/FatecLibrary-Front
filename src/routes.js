import { Navigate, Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
// layouts
import DashboardLayout from './layouts/dashboard';
//
import BookPage from './pages/BookPage';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import { AuthProvider, AuthContext } from './sections/auth/context/auth';
import CreatePage from './pages/CreateUser';

// toastfy
import { Slide, toast } from 'react-toastify';
import PublishingPage from './pages/PublishingPage';
// ----------------------------------------------------------------------

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div className="loading">Carregando ...</div>;
    }
    if (!authenticated && !['/', '/home', '/login', '/cadastrar'].includes(window.location.pathname)) {
      toast.warning('Você precisa estar logado para acessar essa página.', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        transition: Slide,
      });
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastrar" element={<CreatePage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route
          path="/dashboard"
          element={
            <Private>
              <DashboardLayout />
            </Private>
          }
        >
          <Route element={<Navigate to="/dashboard/app" />} />
          <Route path="app" element={<DashboardAppPage />} />
          <Route path="books" element={<BookPage />} />
          <Route path="publishers" element={<PublishingPage />} />
          <Route path="products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
export default AppRoutes;
