import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import SearchUserList from "./SearchUserList";

const SearchBar = () => {
  const { request } = useApi();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const handleChange = (e) => setQuery(e.target.value);

  const searchUser = async () => {
    if (query.trim().length === 0) {
      setUsers([]);
      return;
    }
    const response = await request({
      endPoint: `/user?search=${query}`,
    });
    setUsers(response?.users || []);
  };

  useEffect(() => {
    const timeout = setTimeout(searchUser, 300); // debounce typing
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative w-full">
      <div className="flex items-center bg-gray-800 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
        <svg
          className="h-5 w-5 text-gray-400 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
        </svg>
        <input
          value={query}
          onChange={handleChange}
          type="search"
          placeholder="Search users..."
          className="bg-transparent outline-none text-gray-200 w-full placeholder-gray-500"
        />
      </div>

      {query.length > 0 && (
        <div className="absolute top-12 left-0 w-full bg-gray-800 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
          <SearchUserList users={users} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
