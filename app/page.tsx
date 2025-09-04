'use client';
import {useGetCryptoPrices} from '~/app/Hooks/useGetCryptoPrices';
import {TokenCard} from '~/app/Components/TokenCard';
import {BuyForm} from '~/app/Components/BuyForm';

export default function Home() {

  const { data, isFetching, secondsLeft } = useGetCryptoPrices()

  return (
    <div className='flex justify-center items-center w-full p-6 flex-col gap-6'>
      <div className='flex-col text-center'>
        <h1 className='font-bold text-3xl'>Crypto Prices</h1>
        <span>{isFetching ? 'Updating...' : `Next update in: ${secondsLeft}s`}</span>
      </div>

      <BuyForm tokenNames={data?.data.map(t => t.name) ?? []} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.data.map((token) => (
            <TokenCard key={token.id} isFetching={isFetching} token={token} />
        ))}
      </div>
    </div>
  );
}
