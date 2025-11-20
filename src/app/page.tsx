'use client';

import { useState } from 'react';
import NoteList from '@/components/NoteList';
import NoteView from '@/components/NoteView';

interface Note {
  id: string;
  title: string;
  snippet: string;
  modificationDate: number;
  creationDate: number;
  folderId: number;
}

export default function Home() {
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  return (
    <main className="flex h-screen w-full bg-white text-gray-900 font-sans antialiased overflow-hidden">
      <NoteList onSelectNote={setSelectedNote} />
      <div className="flex-1 h-full">
        <NoteView note={selectedNote} />
      </div>
    </main>
  );
}
