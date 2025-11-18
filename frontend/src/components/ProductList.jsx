import iphone from "../assets/iphone.jpg";
import samsung from "../assets/samsung.jpg";
import macbook from "../assets/macbook.jpg";
import watch from "../assets/watch.jpg";
import shoes from "../assets/shoes.jpg";
import headphones from "../assets/headphones.jpg";

export default function ProductList({ category, search, sort }) {
  const products = [
    { id: 1, name: "iPhone 15 Pro", price: 1299, category: "Mobiles", img: iphone },
    { id: 2, name: "Samsung S24", price: 1099, category: "Mobiles", img: samsung },
    { id: 3, name: "MacBook Air M2", price: 999, category: "Laptops", img: macbook },
    { id: 4, name: "Apple Watch", price: 399, category: "Wearables", img: watch },
    { id: 5, name: "Nike Shoes", price: 159, category: "Shoes", img: shoes },
    { id: 6, name: "Sony Headphones", price: 199, category: "Accessories", img: headphones }
  ];

  // Filter by category
  let filtered = category === "ALL" ? products : products.filter(p => p.category === category);

  // Search filter
  if (search.trim() !== "")
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  // Sorting
  if (sort === "PRICE_LOW") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "PRICE_HIGH") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "NAME_AZ") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "NAME_ZA") filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));

  // Add to cart
  const addToCart = (p) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(p);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${p.name} added to cart`);
  };

  return (
    <div className="product-container" style={{ marginLeft: "230px" }}>
      {filtered.map((p) => (
        <div className="product-card" key={p.id}>
          <img src={p.img} className="product-img" alt={p.name} />
          <h3>{p.name}</h3>
          <p className="price">₹ {p.price}</p>

          <button className="btn-primary" onClick={() => addToCart(p)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
