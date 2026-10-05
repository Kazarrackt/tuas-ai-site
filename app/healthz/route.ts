import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json(
    { status: 'ok', service: 'tuas-ai-site' },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
