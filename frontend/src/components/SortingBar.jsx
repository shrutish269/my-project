export default function SortingBar({ search, setSearch, sort, setSort }) {
  return (
    <div className="sort-bar">
      <input
        className="search-input"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="sort-select"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="NONE">Sort By</option>
        <option value="PRICE_LOW">Price: Low → High</option>
        <option value="PRICE_HIGH">Price: High → Low</option>
        <option value="NAME_AZ">Name: A → Z</option>
        <option value="NAME_ZA">Name: Z → A</option>
      </select>
    </div>
  );
}
