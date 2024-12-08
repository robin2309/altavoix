'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';

import Votes from '@/components/Votes';
import { useSearchDeputes } from '@/hooks/useSearchDeputes';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useDeputeData } from '@/hooks/useDeputeData';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebouncedValue(searchQuery);
  const { data: suggestions, resetData: resetSuggestions, execute: fetchSuggestions } = useSearchDeputes();
  const { data: deputeData, getDeputeData } = useDeputeData();

  useEffect(() => {
    if (debouncedSearchQuery.length < 2) {
      return;
    }
    const debounceTimer = setTimeout(() => {
      console.log('RUN FECTCH');
      fetchSuggestions(debouncedSearchQuery)
    }, 300);
    return () => {
      clearTimeout(debounceTimer);
    }
  }, [debouncedSearchQuery, fetchSuggestions]);

  const handleDeputySelect = async (deputy) => {
    setSearchQuery(`${deputy.Prénom} ${deputy.Nom}`);
    resetSuggestions([]); // Clear suggestions
    getDeputeData(deputy.Prénom, deputy.Nom);
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

        {deputeData && (
          <div className="mt-8 p-4 border rounded-md bg-white shadow-md">
              <h2 className="text-xl font-bold mb-8">{`${deputeData.firstName} ${deputeData.lastName}`}</h2>
              <Votes votes={deputeData.votes} />
          </div>
        )}
      </div>
    </main>
    </>
  );
}
