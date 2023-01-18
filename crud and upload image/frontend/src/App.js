import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsList, AddProduct, EditProduct } from "./components";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/edit/:productId" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
