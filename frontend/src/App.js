import Header from "./components/header/Header";
import Register from "./pages/Register/Register";
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom'
import Index from "./pages/index/Index";
import Products from "./pages/products/Products";
import NotFound from "./pages/notFound/NotFound";
import ProductProfile from "./pages/productProfile/ProductProfile";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import ForgetPass from "./pages/forget_pass/Forget_pass";
import CustomerProfile from "./pages/customer/CustomerProfile";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import SuccessPaymentPage from "./pages/after_payment/Success";
import axios from 'axios';

function App() {
  const path = useLocation()
  const Hide = path.pathname === '/register' || 
  path.pathname === '/login' || 
  path.pathname === '/forget-password' || 
  path.pathname.includes('/reset-password');
  
  axios.defaults.withCredentials = true;

  return (
    <div className="App">
      {!Hide && <Header />}
      <Routes>
        <Route exact path='/' element={<Index/>} />
        <Route path='/forget-password' element={<ForgetPass/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/my-account' element={<CustomerProfile />} />
        <Route path='/success-payment' element={<SuccessPaymentPage />} />
        <Route path='/product-category/:category' element={<Products />} />
        <Route path='/product-profile/:id' element={<ProductProfile />} />
        <Route path='/reset-password/:UserID/:token' element={<ResetPassword/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      {!Hide && path.pathname !== '/success-payment' && path.pathname !== '/failed-payment' && <Footer />}
    </div>
  );
}

export default App;
