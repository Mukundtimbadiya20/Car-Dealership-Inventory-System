export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by make, model or category..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="border rounded-lg p-3 w-full mb-6"
    />
  );
}