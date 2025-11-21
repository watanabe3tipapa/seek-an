import Database from 'better-sqlite3';
import path from 'path';

// Singleton connection
let db: Database.Database | undefined;

export function getDb() {
    if (!db) {
        const dbPath = path.join(process.cwd(), 'NoteStore.sqlite');
        try {
            db = new Database(dbPath, { readonly: true });
        } catch (error) {
            console.error('Failed to open database:', error);
            // Fallback or re-throw depending on desired behavior
            throw new Error('Could not open NoteStore.sqlite. Please ensure the file exists in the project root.');
        }
    }
    return db;
}

export interface Note {
    id: string;
    title: string;
    snippet: string;
    modificationDate: number;
    creationDate: number;
    folderId: number;
}

export function getAllNotes(search?: string): Note[] {
    const database = getDb();

    // ZICCLOUDSYNCINGOBJECT is the main table for notes in Apple Notes SQLite
    // ZNOTE = 1 usually indicates a note object (not a folder or attachment)
    // ZTITLE1 is title, ZSNIPPET is snippet
    let query = `
    SELECT 
      ZIDENTIFIER as id,
      ZTITLE1 as title,
      ZSNIPPET as snippet,
      ZMODIFICATIONDATE1 as modificationDate,
      ZCREATIONDATE1 as creationDate,
      ZFOLDER as folderId
    FROM ZICCLOUDSYNCINGOBJECT
    WHERE ZNOTE IS NOT NULL
  `;

    const params: (string | number)[] = [];

    if (search) {
        query += ` AND (ZTITLE1 LIKE ? OR ZSNIPPET LIKE ?)`;
        params.push(`%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY ZMODIFICATIONDATE1 DESC`;

    try {
        const stmt = database.prepare(query);
        return stmt.all(...params) as Note[];
    } catch (error) {
        console.error('Query error:', error);
        return [];
    }
}
