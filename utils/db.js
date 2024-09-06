import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node'; 

import { join } from 'path';

const filePath = join(process.cwd(), 'db/db.json');
const adapter = new JSONFile(filePath);
const db = new Low(adapter);

async function initDB() {
    try {
        console.log("Tentativo di lettura del database...");
        await db.read();
        if (!db.data) {
            console.log("Nessun dato trovato. Inizializzo i dati predefiniti...");
            db.data = { recensioni: [] }; 
            await db.write(); 
            console.log("Database inizializzato correttamente con dati predefiniti.");
        } else {
            console.log("Dati caricati correttamente dal database.");
        }
    } catch (error) {
        console.error("Errore durante l'inizializzazione del database:", error);
    }
}

export { db, initDB };
