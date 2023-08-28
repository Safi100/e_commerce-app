import Header from "./components/header/Header";
import Register from "./pages/Register/Register";
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom'
import Index from "./pages/index/Index";
import Products from "./pages/products/Products";
import NotFound from "./pages/notFound/NotFound";
import ProductProfile from "./pages/productProfile/ProductProfile";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";

function App() {
  const path = useLocation()
  const isLoginPageOrRegisterPage = path.pathname === '/register' || path.pathname === '/login';
  return (
    <div className="App">
      {!isLoginPageOrRegisterPage && <Header />}
      <Routes>
        <Route exact path='/' element={<Index/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/product-category/:category' element={<Products />} />
        <Route path='/product-profile/:id' element={<ProductProfile />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      {!isLoginPageOrRegisterPage && <Footer />}
      
    </div>
  );
}

export default App;
