'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    console.log(searchQuery);
    const fetchSuggestions = async () => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(`/api/deputies?query=${encodeURIComponent(searchQuery)}`);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  return (
    <main className="p-8">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un député..."
            className="w-full p-2 border rounded-md"
          />
          
          {suggestions.length > 0 && (
            <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg">
              {suggestions.map((deputy, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchQuery(deputy.Prénom + ' ' + deputy.Nom);
                  }}
                >
                  {deputy.Prénom} {deputy.Nom}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
