'use client';

import { useState, useEffect } from 'react';

import { useDeputeData } from '@/hooks/useDeputeData';
import ErrorBoundary from '@/components/ErrorBoundary';
import Votes from '@/components/Votes';

export default function Depute({ params }) {
  const { name } = params;
  const { data: deputeData, getDeputeData } = useDeputeData();

  useEffect(() => {
    if (name) {
      getDeputeData(name);
    }
  }, []);

  return (
    <ErrorBoundary>
      <main className="p-6 bg-white">
        {deputeData && (
          <div>
              <h1 className="text-xl font-bold mb-8">{`${deputeData.firstName} ${deputeData.lastName}`}</h1>
              <Votes votes={deputeData.votes} />
          </div>
        )}
      </main>
    </ErrorBoundary>
  );
};
