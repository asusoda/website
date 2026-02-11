import "@fontsource/space-grotesk";
import "@fontsource/space-grotesk/700.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Mentorship from "./pages/Mentorship";
import PointsSystem from "./pages/PointsSystem";
import Leaderboard from "./pages/LeaderBoard";
import Positions from "./pages/PositionOpenings";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./lib/CartContext";

// Layout components
import MainLayout from "./components/MainLayout";
import ShopLayout from "./components/Shop/ShopLayout";

// Shop components
import ShopIndex from "./pages/Shop/ShopIndex";
import ProductDetail from "./pages/Shop/ProductDetail";
import Cart from "./pages/Shop/Cart";
import Checkout from "./pages/Shop/Checkout";
import Account from "./pages/Shop/Account";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Shop routes - wrapped with ClerkProvider and CartProvider via ShopLayout */}
          <Route
            path="/shop"
            element={
              <CartProvider>
                <ShopLayout />
              </CartProvider>
            }
          >
            <Route index element={<ShopIndex />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Main site routes - wrapped with navbar/footer via MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/mentorship" element={<Mentorship />} />
            <Route path="/sodapop" element={<PointsSystem />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/apply" element={<Positions />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
