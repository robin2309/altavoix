'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';

import Votes from '@/components/Votes';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [deputyData, setDeputyData] = useState(null);

  useEffect(() => {
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

  const handleDeputySelect = async (deputy) => {
    setSearchQuery(`${deputy.Prénom} ${deputy.Nom}`);
    setSuggestions([]); // Clear suggestions

    try {
      const response = await fetch(
        `/api/deputies/data?firstname=${encodeURIComponent(deputy.Prénom)}&lastname=${encodeURIComponent(deputy.Nom)}`
      );
      const data = await response.json();
      setDeputyData(data);
    } catch (error) {
      console.error('Error fetching deputy data:', error);
      setDeputyData(null);
    }
  };

  return (
    <>
      <Head>
        <title>Altavoix</title>
        <meta name="description" content="Suivez l'activité des députés de l'Assemblée Nationale" />
      </Head>
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
            <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
              {suggestions.map((deputy, index) => (
                <div
                id="deputy-suggestion"
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDeputySelect(deputy)}
                >
                  {deputy.Prénom} {deputy.Nom}
                </div>
              ))}
            </div>
          )}
        </div>

        {deputyData && (
          <div className="mt-8 p-4 border rounded-md bg-white shadow-md">
              <h2 className="text-xl font-bold mb-8">{`${deputyData.firstName} ${deputyData.lastName}`}</h2>
              <Votes votes={deputyData.votes} />
          </div>
        )}
      </div>
    </main>
    </>
  );
}
