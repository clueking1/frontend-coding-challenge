'use client';

import Image from "next/image";
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';

export default function Home() {
  const [secondsLeft, setSecondsLeft] = useState(10);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['cmc'],
    queryFn: async () => {
        const res = await fetch('/api/crypto', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load prices');
        return res.json();
    },
    refetchInterval: 10_000,
    retry: 1,
  });

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsLeft((prev) => (prev > 1 ? prev-- : 10));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

  return (
    <div className='flex justify-center items-center w-full p-6 flex-col gap-6'>
      <div className='flex-col text-center'>
        <h1 className='font-bold text-3xl'>Crypto Prices</h1>
        <span>Next update in: {secondsLeft}s</span>
      </div>

      <div className="flex flex-row border-2 p-10 justify-between gap-4 items-center rounded-lg">
        Buy
        <input className="border px-2" />
        of
        <input className="border px-2" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Buy
        </button>
      </div>

      <div className="flex flex-col items-center justify-center border-2 rounded-xl p-6 w-64 h-40 shadow-md">
        <h2 className="text-xl font-semibold">Product Name</h2>
        <p className="text-lg mt-2">$49.99</p>
      </div>
    </div>
  );
}
