const SearchUserList = ({ users }) => {
  if (!users || users.length === 0) return null;

  return (
    <ul className="mt-2 w-full bg-base-100 border border-base-300 rounded-2xl shadow-md max-h-100 overflow-y-auto">
      {users.map((user) => (
        <li
          key={user._id}
          className="flex items-center gap-3 p-3 hover:bg-base-200 cursor-pointer transition-all duration-150"
        >
          {/* Avatar placeholder */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            {user.name?.[0]?.toUpperCase()}
          </div>

          {/* User info */}
          <div className="flex flex-col">
            <span className="font-medium text-base-content">{user.name}</span>
            {user.email && (
              <span className="text-sm text-base-content/60">{user.email}</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchUserList;
