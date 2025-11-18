import { useState, useEffect } from "react";

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setItems(cart);
  }, []);

  const placeOrder = () => {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    setItems([]);
  };

  return (
    <div className="cart-box">
      <h3>Cart ({items.length})</h3>

      {items.map((item, i) => (
        <div key={i} style={{ marginTop: "8px" }}>
          {item.name} – ₹{item.price}
        </div>
      ))}

      <button className="btn-success" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}
