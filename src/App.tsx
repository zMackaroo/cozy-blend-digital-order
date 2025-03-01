import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/layout";
import Order from "./pages/order/order";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
