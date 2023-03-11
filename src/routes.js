import { Navigate, Routes, Route, BrowserRouter } from 'react-router-dom';
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
import CreatePage from './pages/CreateUser';

// toastfy
import { Slide, toast } from 'react-toastify'; // eslint-disable-line
// ----------------------------------------------------------------------

const AppRoutes = () => {

  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);
    if (loading) {
      return <div className='loading'>Carregando ...</div>
    }
    if (!authenticated) {
      toast.warning('Você precisa estar logado para acessar essa página.', {
        position: "top-right",
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
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<ProductsPage />} />
        <Route path='/home' element={<ProductsPage />} />
        <Route path="/dashboard" element={<Private><DashboardLayout /></Private>}>
          <Route element={<Navigate to="/dashboard/app" />} />
          <Route path="app" element={<DashboardAppPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="blog" element={<BlogPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastrar" element={<CreatePage />} />
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
