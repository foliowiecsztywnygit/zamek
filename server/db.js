import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use DATA_DIR env var for persistent storage in Docker, default to current directory
const dataDir = process.env.DATA_DIR || __dirname;
const dbPath = path.join(dataDir, 'database.sqlite');

console.log(`Database path: ${dbPath}`);

const db = new Database(dbPath);

// Initialize DB schema
db.exec(`
  CREATE TABLE IF NOT EXISTS cabins (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    capacity TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cabinId TEXT NOT NULL,
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    FOREIGN KEY(cabinId) REFERENCES cabins(id)
  );
  
  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cabinId TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    adults INTEGER NOT NULL,
    children INTEGER,
    message TEXT,
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert initial cabins if empty
const count = db.prepare('SELECT COUNT(*) as count FROM cabins').get();
if (count.count === 0) {
  const insertCabin = db.prepare('INSERT INTO cabins (id, name, description, capacity, image) VALUES (?, ?, ?, ?, ?)');
  insertCabin.run('dwuosobowy-1', 'Pokój Dwuosobowy (nr 1)', 'Przestronny pokój dwuosobowy z bardzo dużym łóżkiem podwójnym, szafą i widokiem na góry.', '2 osoby', '/images/rooms/pokoj-chesterfield-lozko.jpeg');
  insertCabin.run('dwuosobowy-2', 'Pokój Dwuosobowy (nr 2)', 'Komfortowy pokój dwuosobowy z dużym łóżkiem. Patio z widokiem na rzekę.', '2 osoby', '/images/rooms/pokoj-granatowy-lozko.jpeg');
  insertCabin.run('dwuosobowy-3', 'Pokój Dwuosobowy (nr 3)', 'Przytulny pokój dwuosobowy w bieszczadzkim klimacie. Dostęp do kuchni i ogrodu z rzeką.', '2 osoby', '/images/rooms/salon-kanapa-widok1.jpeg');
  insertCabin.run('dwuosobowy-4', 'Pokój Dwuosobowy (nr 4)', 'Jasny pokój dwuosobowy zapewniający ciszę i odpoczynek. Posiada prywatną łazienkę oraz dostęp do dużego ogrodu i salonu kominkowego. Idealny dla par.', '2 osoby', '/images/rooms/pokoj-chesterfield-widok1.jpeg');
  insertCabin.run('jednoosobowy', 'Pokój Jednoosobowy', 'Przytulny pokój jednoosobowy, idealny dla osób ceniących ciszę i spokój.', '1 osoba', '/images/rooms/salon-kanapa-kominek-widok.jpeg');
}

export default db;
