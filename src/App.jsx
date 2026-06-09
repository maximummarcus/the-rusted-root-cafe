import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { ThemeProvider } from '@/lib/ThemeContext';
import Layout from '@/components/Layout';
import ScrollToTop from '@/components/ScrollToTop';
// Add page imports here
import Home from '@/pages/Home';
import Menu from '@/pages/Menu';
import Order from '@/pages/Order';
import Catering from '@/pages/Catering';
import Specials from '@/pages/Specials';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import AdminDashboard from '@/pages/AdminDashboard';
import { ADMIN_PATH } from '@/lib/adminConfig';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* Secret admin — obscure URL slug + client-side password gate with a
          localStorage session (no backend functions on this plan; see
          src/lib/adminConfig.js). Self-contained, no site chrome. */}
      <Route path={ADMIN_PATH} element={<AdminDashboard />} />

      {/* Public site with shared layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/catering" element={<Catering />} />
        <Route path="/specials" element={<Specials />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* The Base44 auth scaffold (src/pages/Login & friends, ProtectedRoute) is
          dormant and intentionally unrouted — the token dashboard above is the
          only admin surface. */}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClientInstance}>
          <Router>
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>
          <Toaster />
          <SonnerToaster />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App