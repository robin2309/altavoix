'use client';

import { useState, useEffect } from 'react';

import Votes from '@/components/Votes';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useSearchDeputes } from '@/hooks/useSearchDeputes';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useDeputeData } from '@/hooks/useDeputeData';

import styles from './styles/Homepage.module.css';

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
    <main className={`px-8 pt-16 ${styles.homepage}`}>
      <div className="max-w-md mx-auto">
        <div className="mb-16 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un député..."
            className={`w-full px-2 py-4 rounded-md ${styles.homepage__input}`}
          />
          
          {suggestions.length > 0 && (
            <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
              {suggestions.map((deputy, index) => {
                const suggestionElement = (
                  <div
                  id="deputy-suggestion"
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDeputySelect(deputy)}
                >
                  {deputy.Prénom} {deputy.Nom}
                </div>
                );
                return index < suggestions.length - 1 ? (
                  <>
                    {suggestionElement}
                    <div className={`mx-2 ${styles.homepage__suggestionsDivider}`} />
                  </>
                ) : suggestionElement;
              })}
            </div>
          )}
        </div>
          <h1 className={`mb-12 ${styles.homepage__text}`}>
            Suivez l’activité des députés à l’assemblée nationale 🏛️
          </h1>
          <img className={styles.homepage__img} src="/images/heroImg.svg" alt="Hero" />
        <ErrorBoundary>
          {deputeData && (
            <div className="mt-8 p-4 border rounded-md bg-white shadow-md">
                <h2 className="text-xl font-bold mb-8">{`${deputeData.firstName} ${deputeData.lastName}`}</h2>
                <Votes votes={deputeData.votes} />
            </div>
          )}
        </ErrorBoundary>
      </div>
    </main>
  );
}
