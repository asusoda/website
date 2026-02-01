import "@fontsource/space-grotesk";
import "@fontsource/space-grotesk/700.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import NavbarSection from "./components/Navigation/Navbar";
import Home from "./pages/Home";
import Mentorship from "./pages/Mentorship";
import PointsSystem from "./pages/PointsSystem";
import Footer from "./components/Footer/Footer";
import Leaderboard from "./pages/LeaderBoard";
import Positions from "./pages/PositionOpenings";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./lib/CartContext";

// Shop pages
import ShopIndex from "./pages/Shop/ShopIndex";
import ProductDetail from "./pages/Shop/ProductDetail";
import Cart from "./pages/Shop/Cart";
import Checkout from "./pages/Shop/Checkout";
import Account from "./pages/Shop/Account";

function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Shop routes - no navbar/footer */}
            <Route path="/shop" element={<ShopIndex />} />
            <Route path="/shop/product/:id" element={<ProductDetail />} />
            <Route path="/shop/cart" element={<Cart />} />
            <Route path="/shop/checkout" element={<Checkout />} />
            <Route path="/shop/account" element={<Account />} />

            {/* Main site routes - with navbar/footer */}
            <Route path="/" element={
              <>
                <NavbarSection />
                <Home />
                <Footer />
              </>
            } />
            <Route path="/mentorship" element={
              <>
                <NavbarSection />
                <Mentorship />
                <Footer />
              </>
            } />
            <Route path="/sodapop" element={
              <>
                <NavbarSection />
                <PointsSystem />
                <Footer />
              </>
            } />
            <Route path="/leaderboard" element={
              <>
                <NavbarSection />
                <Leaderboard />
                <Footer />
              </>
            } />
            <Route path="/apply" element={
              <>
                <NavbarSection />
                <Positions />
                <Footer />
              </>
            } />
            <Route path="*" element={
              <>
                <NavbarSection />
                <NotFound />
                <Footer />
              </>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}

export default App;
