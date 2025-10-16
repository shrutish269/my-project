// frontend/src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching products');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Product List</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {products.map((product, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button style={{ backgroundColor: 'blue', color: 'white' }}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;