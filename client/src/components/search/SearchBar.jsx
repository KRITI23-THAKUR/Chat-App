import { useState, useEffect, useRef } from "react";
import useApi from "../../hooks/useApi";
import SearchUserList from "./SearchUserList";
import { Search } from "lucide-react";

const SearchBar = () => {
  const { request } = useApi();
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const searchRef = useRef(null); // 👈 ref for detecting outside clicks

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
    const timeout = setTimeout(searchUser, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const clearSearch = () => {
    setQuery("");
    setUsers([]);
  };

  // 👇 Detect click outside the search bar/dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        clearSearch();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="relative w-full px-2">
      <div className="flex items-center px-4 gap-2 rounded-full py-1 focus-within:ring-1 focus-within:ring-primary/50 bg-accent-content/20">
        <Search className="text-neutral-100" size={18} />
        <input
          value={query}
          onChange={handleChange}
          type="search"
          placeholder="find the one"
          className="outline-none py-1 placeholder:text-xs w-full"
        />
      </div>

      {users.length > 0 && (
        <div className="absolute top-12 left-0 p-2 w-full rounded-lg shadow-lg bg-card z-50">
          <SearchUserList users={users} onSelect={clearSearch} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
