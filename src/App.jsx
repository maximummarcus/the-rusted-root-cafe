import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
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
import Vote from '@/pages/Vote';
// Deliberately NOT in src/pages: Base44's prerendered page index is generated from
// registered pages, and the admin must never appear in any public page list.
import AdminDashboard from '@/components/admin/AdminDashboard';
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
      {/* Admin — fixed path (no secret slug anymore), gated by Base44 sign-in.
          isAdminAuthorized() in src/lib/adminConfig.js currently admits any
          signed-in account (temporary, see that file); every write is enforced
          again by admin-only entity write RLS (see src/api/adminApi.js).
          Self-contained, no site chrome. */}
      <Route path={ADMIN_PATH} element={<AdminDashboard />} />

      {/* Public site with shared layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/catering" element={<Catering />} />
        <Route path="/specials" element={<Specials />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* /Home (any casing) is a common bookmark/typo for the root. React Router v6
          matches case-insensitively, so this single alias catches /home, /Home, /HOME. */}
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* The in-app Base44 auth scaffold (src/pages/Login & friends, ProtectedRoute)
          is dormant and intentionally unrouted — the admin above signs in inline via
          AdminLogin.jsx (base44.auth.loginWithProvider/loginViaEmailPassword), not
          redirectToLogin, since /login isn't registered here. It's the only admin
          surface. */}

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