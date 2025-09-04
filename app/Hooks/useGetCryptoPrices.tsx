import {useEffect, useRef, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {IResponse} from '~/app/api/crypto/route';

const interval = 10_000;

export const useGetCryptoPrices = () => {
    const [secondsLeft, setSecondsLeft] = useState(10);
    const lastCompletedAtRef = useRef<number>(Date.now());

    const { data, isFetching, isError } = useQuery({
        queryKey: ['cmc'],
        queryFn: async () => {
            const res = await fetch('/api/crypto', { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to load prices');
            return res.json() as Promise<IResponse>;
        },
        refetchInterval: interval,
        retry: 1,
    });

    useEffect(() => {
        if (!isFetching) {
            lastCompletedAtRef.current = Date.now();
            setSecondsLeft(10);
        }
    }, [isFetching]);

    useEffect(() => {
        if (isFetching) return;

        const tick = () => {
            const nextAt = lastCompletedAtRef.current + interval;
            const msLeft = nextAt - Date.now();

            let secs = Math.ceil(msLeft / 1000);

            if (secs < 1) secs = 1;
            if (secs > 10) secs = 10;

            setSecondsLeft(secs);
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [isFetching]);

    return { data, isFetching, isError, secondsLeft } as const
}