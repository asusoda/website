import "@fontsource/space-grotesk";
import "@fontsource/space-grotesk/700.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider
import NavbarSection from "./components/Navigation/Navbar";
import Home from "./pages/Home";
import Mentorship from "./pages/Mentorship";
import PointsSystem from "./pages/PointsSystem";
import Footer from "./components/Footer/Footer";
import Leaderboard from "./pages/LeaderBoard";
import Positions from "./pages/PositionOpenings";
import NotFound from "./pages/NotFound"; // Import the NotFound component
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <NavbarSection />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/sodapop" element={<PointsSystem />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/apply" element={<Positions />} />
          <Route path="*" element={<NotFound />} /> {/* Add the catch-all route */}
        </Routes>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}

export default App;
