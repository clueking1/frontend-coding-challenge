import {TToken} from '~/app/api/crypto/route';

interface Props {
    isFetching: boolean;
    token: TToken | undefined;
}

export const TokenCard = ({ isFetching, token }: Props) => {
    return (
        <div
            className="flex flex-col items-center justify-center border-2 rounded-xl p-6 w-64 h-40 shadow-md"
        >
            {(isFetching || !token )? (
                <>
                    <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mb-2" />
                    <div className="h-5 w-20 bg-gray-300 rounded animate-pulse" />
                </>
            ) : (
                <>
                    <h2 className="text-xl font-semibold">
                        {token.name} ({token.symbol})
                    </h2>
                    <p className="text-lg mt-2">
                        ${token.quote.USD.price.toFixed(2)}
                    </p>
                </>
            )}
        </div>
    );
};
