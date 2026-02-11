import React, { useState } from 'react';
import { User, Search, LayoutDashboard, LogOut } from 'lucide-react';
import ProfileTab from './ProfileTab';
// import SearchTab from './SearchTab';
import NotesTab from './NotesTab';

const SearchTab = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (val) => {
    setQuery(val);
    // API Call: GET /api/auth/search?name=val
    // setResults(data)
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Search Users</h2>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input 
          className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Search by name..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="bg-white rounded-xl border divide-y">
        {results.map(user => (
          <div key={user._id} className="p-4 flex justify-between items-center">
            <span>{user.name}</span>
            <span className="text-gray-400 text-sm">{user.email}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchTab;