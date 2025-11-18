import { useState } from "react";
import CategorySidebar from "../components/CategorySidebar";
import SortingBar from "../components/SortingBar";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

export default function Home() {
  const [category, setCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("NONE");

  return (
    <div className="home-container">
      <header className="navbar">💜 E-Commerce Store – Demo Frontend</header>

      <CategorySidebar category={category} setCategory={setCategory} />

      <SortingBar search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

      <ProductList category={category} search={search} sort={sort} />

      <Cart />
    </div>
  );
}
