export default function CategorySidebar({ category, setCategory }) {
  const categories = [
    "ALL",
    "Mobiles",
    "Laptops",
    "Wearables",
    "Shoes",
    "Accessories"
  ];

  return (
    <div className="sidebar">
      <h3 style={{ marginBottom: "12px" }}>Categories</h3>
      {categories.map((c) => (
        <div
          key={c}
          className={`category-item ${category === c ? "active" : ""}`}
          onClick={() => setCategory(c)}
        >
          {c}
        </div>
      ))}
    </div>
  );
}
