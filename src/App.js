import './App.css';
import Payment from './Components/Payment';
import Home from './Components/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router';
import Products from './Components/Products';
import Product from './Components/Product';
import Cart from './Components/Cart';
import Login from './Components/Login';
import Register from './Components/Register';
import Checkout from './Components/Checkout';
import { useState } from 'react';
import ManageOrders from './Components/ManageOrders';

function App() {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/products/:id' element={<Product />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/checkout' element={<Checkout setEmail={setEmail} setAddress={setAddress}/>}/>
        <Route path='/payment' element={<Payment email={email} address={address}/>}/>
        <Route path='/manageorders' element={<ManageOrders />}/>
      </Routes>
    </>
    
  );
}

export default App;
