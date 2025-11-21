'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Search, Folder } from 'lucide-react';

import { Note } from '@/lib/db';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NoteList({ onSelectNote }: { onSelectNote: (note: Note) => void }) {
    const [search, setSearch] = useState('');
    const { data: notes, error, isLoading } = useSWR<Note[]>(
        `/api/notes?search=${encodeURIComponent(search)}`,
        fetcher
    );

    return (
        <div className="flex flex-col h-full bg-gray-50 border-r border-gray-200 w-80">
            <div className="p-4 border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-9 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="p-4 text-center text-gray-400 text-sm">Loading...</div>
                ) : error ? (
                    <div className="p-4 text-center text-red-400 text-sm">Failed to load notes</div>
                ) : notes?.length === 0 ? (
                    <div className="p-4 text-center text-gray-400 text-sm">No notes found</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {notes?.map((note) => (
                            <button
                                key={note.id}
                                onClick={() => onSelectNote(note)}
                                className="w-full text-left p-4 hover:bg-yellow-50 active:bg-yellow-100 transition-colors group"
                            >
                                <h3 className="font-semibold text-gray-900 truncate mb-1 group-hover:text-yellow-700">
                                    {note.title || 'New Note'}
                                </h3>
                                <div className="flex items-center text-xs text-gray-400 mb-1 space-x-2">
                                    <span>{new Date(note.modificationDate * 1000 + 978307200000).toLocaleDateString()}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className="truncate">{note.snippet}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-400 mt-2">
                                    <Folder className="w-3 h-3 mr-1" />
                                    <span>Notes</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
