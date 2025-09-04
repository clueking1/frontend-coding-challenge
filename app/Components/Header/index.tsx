
interface Props {
    isFetching: boolean
    secondsLeft: number
}

export const Header = ({isFetching, secondsLeft}: Props) => {
    return (
        <div className='flex-col text-center'>
            <h1 className='font-bold text-3xl'>Crypto Prices</h1>
            <span>{isFetching ? 'Updating...' : `Next update in: ${secondsLeft}s`}</span>
        </div>
    )
}