import { BrowserRouter, Routes, Route } from "react-router-dom";
import Order from "./pages/order/order";
import Tracking from "./pages/tracking/tracking";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Set initial viewport height
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Initial set
    setVH();

    // Update on resize and orientation change
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);

    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Order />} />
        <Route path="/tracking" element={<Tracking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
