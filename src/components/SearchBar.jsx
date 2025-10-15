// src/components/SearchBar.jsx
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    bhk: "",
    status: "",
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    onSearch(query, filters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
          className="flex-1 border rounded p-2"
        />
        <input
          type="number"
          name="bhk"
          placeholder="BHK"
          value={filters.bhk}
          onChange={handleFilterChange}
          className="w-24 border rounded p-2"
        />
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border rounded p-2"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>
    </div>
  );
}
