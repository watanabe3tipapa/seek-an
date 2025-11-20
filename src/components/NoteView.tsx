'use client';

import { Clock, Calendar } from 'lucide-react';

interface Note {
    id: string;
    title: string;
    snippet: string;
    modificationDate: number;
    creationDate: number;
}

export default function NoteView({ note }: { note: Note | null }) {
    if (!note) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-300 bg-white">
                <div className="w-16 h-16 mb-4 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                </div>
                <p>Select a note to view</p>
            </div>
        );
    }

    // Convert Apple Core Data timestamp to JS Date
    // Core Data reference date is 2001-01-01 00:00:00 UTC (978307200000 ms)
    const modDate = new Date(note.modificationDate * 1000 + 978307200000);
    const createDate = new Date(note.creationDate * 1000 + 978307200000);

    return (
        <div className="h-full flex flex-col bg-white">
            <div className="px-8 py-6 border-b border-gray-100">
                <div className="flex items-center space-x-4 text-xs text-gray-400 mb-4">
                    <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        Created {createDate.toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Edited {modDate.toLocaleString()}
                    </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">{note.title || 'New Note'}</h1>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
                <div className="prose prose-yellow max-w-none">
                    {/* In a real app, we would render HTML content here. 
              For now, we just show the snippet as a placeholder. */}
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                        {note.snippet}
                    </p>

                    <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-sm text-yellow-800">
                        <p className="font-semibold mb-1">Note Content Placeholder</p>
                        <p>
                            In the full implementation, this area would render the rich HTML content
                            extracted from the Apple Notes database or via AppleScript.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
