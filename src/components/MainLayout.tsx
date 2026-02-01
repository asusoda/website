import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarSection from './Navigation/Navbar';
import Footer from './Footer/Footer';

/**
 * MainLayout wraps all main site routes with the navbar and footer.
 * This reduces duplication and makes it easier to add new routes.
 */
const MainLayout: React.FC = () => {
  return (
    <>
      <NavbarSection />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
