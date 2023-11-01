import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import User from "./pages/User";
import Product from "./pages/Product";
import Order from "./pages/Order";
import PaymentHistory from "./pages/PaymentHistory";
import Category from "./pages/Category";
import Seller from "./pages/Seller";

function App() {
  return (
    <div style={styles.app}>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/seller" element={<Seller />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
// write style for app, set the background color to grey
const styles = {
  app: {
    backgroundColor: "#5f5f5f",
    height: "100vh",
    padding: "1rem",
  },
};
export default App;
