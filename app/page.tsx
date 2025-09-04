'use client';
import {useGetCryptoPrices} from '~/app/Hooks/useGetCryptoPrices';
import {TokenCard} from '~/app/Components/TokenCard';
import {BuyForm} from '~/app/Components/BuyForm';
import {Header} from '~/app/Components/Header';
import {useEffect} from 'react';
import {TToken} from '~/app/api/crypto/route';

export default function Home() {

  const { data, isFetching, isError, secondsLeft } = useGetCryptoPrices()

  useEffect(() => {
      if (!isFetching && isError) {
          alert('Failed to get prices')
      }
  }, [isFetching, isError]);

  const sortedTokens: TToken[] = data?.data
    ? [...data.data].sort((a, b) => a.name.localeCompare(b.name))
      : [];
  const fetchingSkeleton = Array.from({ length: 10 })

  const name = sortedTokens.map(t => t.name)
  const tokenNames = name.length > 0 ? name : ['Loading...']

  return (
    <div className='flex justify-center items-center w-full p-6 flex-col gap-6'>
      <Header isFetching={isFetching} secondsLeft={secondsLeft} />

      <BuyForm key={`${tokenNames[0]}key`} tokenNames={tokenNames} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isFetching ? (
              <>
                  {fetchingSkeleton.map((token, index) => (
                      <TokenCard key={index} isFetching={isFetching} token={undefined} />
                  ))}
              </>
          ) : (
              <>
                  {sortedTokens.map((token) => (
                      <TokenCard key={token.id} isFetching={isFetching} token={token} />
                  ))}
              </>
          )}
        {sortedTokens.map((token) => (
            <TokenCard key={token?.id} isFetching={isFetching} token={token} />
        ))}
      </div>
    </div>
  );
}
