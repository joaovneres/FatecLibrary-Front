import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import AppRoutes from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
// context
import { AuthProvider } from './sections/auth/context/auth';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <AppRoutes />
        </ThemeProvider>
      </Router>
    </HelmetProvider >
  );
}
