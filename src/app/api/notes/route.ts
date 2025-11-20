import { NextResponse } from 'next/server';
import { getAllNotes } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;

    try {
        const notes = getAllNotes(search);
        return NextResponse.json(notes);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
    }
}
