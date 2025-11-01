function ProductCard({name, price, status}) {
    return (
        <div className="product-card">
            <h2>{name}</h2>
            <p>Price: ${price}</p>
            <p className={status === "In Stock" ? "in-stock" : "out-stock"}>
                Status: {status}
            </p>
        </div>
  );
}
export default ProductCard;