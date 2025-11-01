import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/Header.jsx';
import ProductCard from './components/ProductCard.jsx'
import './App.css'

function App() {
  const appTitle = "Product List";
  const year = new Date().getFullYear();

  return (
    <>
      <Header title={appTitle} />
      <div className="product-list">
        <ProductCard name="Wireless Mouse" price="25.99" status="In Stock" />
        <ProductCard name="Keyboard" price="45.5" status="Out of Stock" />
        <ProductCard name="Monitor" price="199.99" status="In Stock" />
      </div>
    </>
  )
}

export default App
