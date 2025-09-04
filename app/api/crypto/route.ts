import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10',
        {
          headers: { 'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY || '' },
        }
    );
    if (!res.ok) throw new Error(`CMC API error: ${res.status} ${res.statusText}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Could not get prices' }, { status: 500 });
  }
}
