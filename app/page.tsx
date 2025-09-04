'use client';
import {useGetCryptoPrices} from '~/app/Hooks/useGetCryptoPrices';
import {TokenCard} from '~/app/Components/TokenCard';
import {BuyForm} from '~/app/Components/BuyForm';
import {Header} from '~/app/Components/Header';

export default function Home() {

  const { data, isFetching, secondsLeft } = useGetCryptoPrices()

  const sortedTokens = data?.data
    ? [...data.data].sort((a, b) => a.name.localeCompare(b.name))
    : [];

  return (
    <div className='flex justify-center items-center w-full p-6 flex-col gap-6'>
      <Header isFetching={isFetching} secondsLeft={secondsLeft} />

      <BuyForm tokenNames={sortedTokens.map(t => t.name) ?? []} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedTokens.map((token) => (
            <TokenCard key={token.id} isFetching={isFetching} token={token} />
        ))}
      </div>
    </div>
  );
}
