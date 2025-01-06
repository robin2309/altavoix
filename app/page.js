'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import slugify from 'slugify';

import ErrorBoundary from '@/components/ErrorBoundary';
import { useSearchDeputes } from '@/hooks/useSearchDeputes';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

import styles from './styles/Homepage.module.css';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebouncedValue(searchQuery);
  const { data: suggestions, resetData: resetSuggestions, execute: fetchSuggestions } = useSearchDeputes();

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

  const handleDeputySelect = async (depute) => {
    const name = `${depute.Prénom} ${depute.Nom}`;
    const slugifiedName = slugify(name, {lower: true});
    setSearchQuery(name);
    resetSuggestions([]); // Clear suggestions
    router.push(`/depute/${slugifiedName}`);
  };

  return (
    <ErrorBoundary>
      <main className={`px-6 ${styles.homepage}`}>
        <img
          src="https://i.postimg.cc/zGzhc6H6/Logo-Light-Primary-Web.webp"
          alt="Altavoix Logo"
          className={`pb-12 ${styles.homepage__img}`}
        />
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un député..."
            className={`w-full pr-2 py-4 pl-10 ${styles.homepage__input}`}
          />
          <span className={styles.homepage__inputIcon}>🔍</span>
        </div>
        {suggestions.length > 0 && (
          <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
            {suggestions.map((deputy, index) => {
              return index < suggestions.length - 1 ? (
                <div key={index}>
                  <div
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleDeputySelect(deputy)}
                  >
                    {deputy.Prénom} {deputy.Nom}
                  </div>
                  <div className={`mx-2 ${styles.homepage__suggestionsDivider}`} />
                </div>
              ) : (
                <div
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleDeputySelect(deputy)}
                  key={index}
                >
                  {deputy.Prénom} {deputy.Nom}
                </div>
              );
            })}
          </div>
        )}
        <h1 className={`mb-12 ${styles.homepage__text}`}>
          Suivez l'activité des députés à l'assemblée nationale 🏛️
        </h1>
      </main>
    </ErrorBoundary>
  );
}
