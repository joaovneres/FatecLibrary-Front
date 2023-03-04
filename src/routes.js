import { Navigate, Routes, useRoutes, Route, BrowserRouter } from 'react-router-dom';
import React, { useContext } from "react";
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import { AuthProvider, AuthContext } from './sections/auth/context/auth';

// ----------------------------------------------------------------------

const AppRoutes = () => {

  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div className='loading'>Carregando ...</div>
    }
    if (!authenticated) {
      return <Navigate to="/" />;
    }
    return children;
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<ProductsPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<Navigate to="/dashboard/app" />} />
          <Route path="app" element={<DashboardAppPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="blog" element={<BlogPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route element={<SimpleLayout />}>
          <Route element={<Navigate to="/" index="true" />} />
          <Route path="404" element={<Page404 />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
        <Route path='*' element={<Navigate to="/404" replace />} />
      </Routes>
    </AuthProvider>
  )
}
export default AppRoutes;


// export default function Router() {
//   const routes = useRoutes([
//     {
//       path: '/dashboard',
//       element: <DashboardLayout />,
//       children: [
//         { element: <Navigate to="/dashboard/app" />, index: true },
//         { path: 'app', element: <DashboardAppPage /> },
//         { path: 'user', element: <UserPage /> },
//         { path: 'products', element: <ProductsPage /> },
//         { path: 'blog', element: <BlogPage /> },
//       ],
//     },
//     {
//       path: 'login',
//       element: <LoginPage />,
//     },
//     {
//       element: <SimpleLayout />,
//       children: [
//         { element: <Navigate to="/dashboard/app" />, index: true },
//         { path: '404', element: <Page404 /> },
//         { path: '*', element: <Navigate to="/404" /> },
//       ],
//     },
//     {
//       path: '*',
//       element: <Navigate to="/404" replace />,
//     },
//   ]);

//   return routes;
// }
