import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavbarSection from "./Navigation/Navbar";
import Footer from "./Footer/Footer";
import "./OfficerBanner.css";

const MainLayout: React.FC = () => {
  return (
    <>
      <NavbarSection />
      <aside aria-label="Officer applications" className="officer-banner">
        <details className="officer-banner-disclosure" open>
          <summary className="officer-banner-toggle">
            <span className="officer-banner-dot" aria-hidden="true" />
            Officer applications are live
            <svg
              className="officer-banner-chevron"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="officer-banner-inner">
            <div className="officer-banner-art" aria-hidden="true">
              <span>&lt;/&gt;</span>
              <span className="officer-banner-spark">✳</span>
            </div>
            <div className="officer-banner-copy">
              <h2>
                Don’t just join the community.
                <br />
                Help <em>build it.</em>
              </h2>
              <p className="officer-banner-description">
                Your ideas. Your people. Your next chapter at SoDA.
              </p>
            </div>
            <Link to="/apply" className="officer-banner-cta">
              Join the team <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </details>
      </aside>
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
