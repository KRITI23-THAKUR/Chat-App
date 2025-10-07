import { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import SearchUserList from "./SearchUserList";
import { Search } from "lucide-react";

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
    const timeout = setTimeout(searchUser, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative w-full p-2 ">
      <div className="flex items-center gap-2 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
        <Search color="purple" />
        <input
          value={query}
          onChange={handleChange}
          type="search"
          placeholder="find the one"
          className="outline-none py-2 placeholder:font-[Gilroy-Regular] text-primary w-full "
        />
      </div>

      {query.length > 0 && (
        <div className="absolute top-12 left-0 p-2 w-full  rounded-lg shadow-lg max-h-140 overflow-y-auto z-50">
          <SearchUserList users={users} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
