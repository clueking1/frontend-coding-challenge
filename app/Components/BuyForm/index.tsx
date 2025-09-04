import { FormEvent, useState } from 'react';

interface Props {
    tokenNames: string[];
}

export const BuyForm = ({ tokenNames }: Props) => {
    const [amount, setAmount] = useState('');
    const [token, setToken] = useState(tokenNames[0] ?? '');

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        const amountNum = Number(amount);

        if (isNaN(amountNum) || amountNum <= 0 || amountNum > 5000) {
            alert('Amount must be between 0 and 5000');
            return;
        }

        console.log({ tokenName: token || tokenNames[0], amount: amountNum });
    }

    return (
        <form
            className="flex flex-col md:flex-row border-2 p-6 sm:p-10 justify-between gap-4 items-center rounded-lg"
            onSubmit={handleSubmit}
        >
            <span>Buy</span>
            <input
                className="border px-2"
                type="number"
                name="amount"
                max={5000}
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <span>of</span>
            <select
                className="border px-2 py-1"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                disabled={tokenNames[0] === 'Loading...'}
            >
                {tokenNames.map((name) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Buy
            </button>
        </form>
    );
};
