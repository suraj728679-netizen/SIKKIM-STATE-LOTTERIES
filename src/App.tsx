import React, { useState, useEffect } from 'react';
import { PageView, LotteryResultRecord, AdminUser } from './types/lottery';
import { getCachedAdminUser, verifyAdminSession, adminLogout } from './services/api';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CheckResultPage } from './pages/CheckResultPage';
import { PreviousResultsPage } from './pages/PreviousResultsPage';
import { WinningDetailsPage } from './pages/WinningDetailsPage';
import { CertificateView } from './components/CertificateView';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [adminUser, setAdminUser] = useState<AdminUser | null>(getCachedAdminUser());
  const [selectedRecordForCertificate, setSelectedRecordForCertificate] = useState<LotteryResultRecord | null>(null);

  // Check URL path or hash on initial mount (supports direct /admin navigation)
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (path.includes('/admin') || hash.includes('admin')) {
      if (adminUser) {
        setCurrentPage('admin-dashboard');
      } else {
        setCurrentPage('admin-login');
      }
    }

    // Verify session in background
    verifyAdminSession().then((isValid) => {
      if (!isValid) {
        setAdminUser(null);
      }
    });
  }, []);

  const handleLoginSuccess = (user: AdminUser) => {
    setAdminUser(user);
    setCurrentPage('admin-dashboard');
  };

  const handleLogout = async () => {
    await adminLogout();
    setAdminUser(null);
    setCurrentPage('home');
  };

  const handleViewCertificate = (record: LotteryResultRecord) => {
    setSelectedRecordForCertificate(record);
    setCurrentPage('certificate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminView = currentPage === 'admin-dashboard';

  return (
    <div className="min-h-screen bg-[#051a0d] text-stone-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* If in Admin Dashboard, show dedicated admin layout */}
      {isAdminView && adminUser ? (
        <AdminDashboardPage
          adminUser={adminUser}
          onLogout={handleLogout}
          setCurrentPage={setCurrentPage}
          onViewCertificate={handleViewCertificate}
        />
      ) : (
        /* Public Website Layout */
        <>
          <Header
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            isAdminLoggedIn={!!adminUser}
          />

          <main className="flex-1">
            {currentPage === 'home' && (
              <HomePage
                setCurrentPage={setCurrentPage}
                onViewCertificate={handleViewCertificate}
              />
            )}

            {currentPage === 'check-result' && (
              <CheckResultPage
                setCurrentPage={setCurrentPage}
                onViewCertificate={handleViewCertificate}
              />
            )}

            {currentPage === 'previous-results' && (
              <PreviousResultsPage
                setCurrentPage={setCurrentPage}
                onViewCertificate={handleViewCertificate}
              />
            )}

            {currentPage === 'winning-details' && (
              <WinningDetailsPage setCurrentPage={setCurrentPage} />
            )}

            {currentPage === 'certificate' && (
              <CertificateView
                selectedRecord={selectedRecordForCertificate}
                onBackToHome={() => setCurrentPage('home')}
              />
            )}

            {currentPage === 'contact' && (
              <ContactPage setCurrentPage={setCurrentPage} />
            )}

            {currentPage === 'admin-login' && (
              <AdminLoginPage
                onLoginSuccess={handleLoginSuccess}
                setCurrentPage={setCurrentPage}
              />
            )}
          </main>

          <Footer
            setCurrentPage={setCurrentPage}
            isAdminLoggedIn={!!adminUser}
          />
        </>
      )}
    </div>
  );
}
