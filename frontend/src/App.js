import Header from "./components/header/Header";
import Register from "./pages/Register/Register";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Index from "./pages/index/Index";
import Products from "./pages/products/Products";
import NotFound from "./pages/notFound/NotFound";
import ProductProfile from "./pages/productProfile/ProductProfile";

function App() {
  return (
    <div className="App">
      
      {window.location.pathname !== '/register' && <Header />}
      <Routes>
        <Route exact path='/' element={<Index/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/product-category/:category' element={<Products />} />
        <Route path='/product-profile/:id' element={<ProductProfile />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      
    </div>
  );
}

export default App;
