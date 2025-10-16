import React from 'react';
import ProductList from './components/ProductList.js';
import Cart from './components/cart.js';

function App() {
  return (
    <div className="App">
      <h1>My Shop</h1>
      <ProductList />
      <Cart />
    </div>
  );
}

export default App;