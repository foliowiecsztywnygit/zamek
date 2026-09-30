import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resend } from 'resend';
import db from './db.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3001;
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

// ─── API Routes ────────────────────────────────────────────────

// Get all cabins
app.get('/api/cabins', (req, res) => {
  const cabins = db.prepare('SELECT * FROM cabins').all();
  res.json(cabins);
});

// Get availability
app.get('/api/availability', (req, res) => {
  const availability = db.prepare('SELECT * FROM availability').all();
  res.json(availability);
});

// Submit inquiry
app.post('/api/inquiries', async (req, res) => {
  const { cabinId, name, email, phone, adults, children, message, startDate, endDate } = req.body;
  
  if (!cabinId || !name || !email || !phone || !adults || !startDate || !endDate) {
    return res.status(400).json({ error: 'Brakujące pola.' });
  }

  try {
    const insert = db.prepare(`
      INSERT INTO inquiries (cabinId, name, email, phone, adults, children, message, startDate, endDate)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    insert.run(cabinId, name, email, phone, adults, children, message, startDate, endDate);
    
    const cabin = db.prepare('SELECT name FROM cabins WHERE id = ?').get(cabinId);
    
    // Send email using Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_placeholder_123') {
      await resend.emails.send({
        from: 'Zamek Bukowiec <rezerwacje@brosystems.pl>',
        to: 'tabernus@o2.pl', // Adres właściciela
        subject: `Nowe zapytanie o nocleg od ${name}`,
        html: `
          <h1>Nowe zapytanie o rezerwację</h1>
          <p><strong>Imię i nazwisko:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Wybrany pokój:</strong> ${cabin ? cabin.name : cabinId}</p>
          <p><strong>Termin:</strong> Od ${startDate} do ${endDate}</p>
          <p><strong>Goście:</strong> ${adults} dorosłych, ${children || 0} dzieci</p>
          <p><strong>Wiadomość:</strong><br/>${message || 'Brak wiadomości'}</p>
        `
      });
    } else {
      console.log('Resend API key is missing or invalid. Email not sent, but inquiry saved.');
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera.' });
  }
});

// Admin verification
app.post('/api/admin/verify', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Nieprawidłowe hasło' });
  }
});

// Admin get inquiries
app.get('/api/admin/inquiries', (req, res) => {
  const password = req.headers.authorization;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Nieautoryzowany' });
  }
  
  const inquiries = db.prepare(`
    SELECT i.*, c.name as cabinName 
    FROM inquiries i 
    LEFT JOIN cabins c ON i.cabinId = c.id
    ORDER BY i.createdAt DESC
  `).all();
  
  res.json(inquiries);
});

// Admin: Add availability block (mark dates as unavailable)
app.post('/api/admin/availability', (req, res) => {
  const password = req.headers.authorization;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Nieautoryzowany' });
  }

  const { cabinId, startDate, endDate } = req.body;
  if (!cabinId || !startDate || !endDate) {
    return res.status(400).json({ error: 'Brakujące pola: cabinId, startDate, endDate' });
  }

  try {
    const insert = db.prepare('INSERT INTO availability (cabinId, startDate, endDate) VALUES (?, ?, ?)');
    const result = insert.run(cabinId, startDate, endDate);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// Admin: Delete availability block
app.delete('/api/admin/availability/:id', (req, res) => {
  const password = req.headers.authorization;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Nieautoryzowany' });
  }

  try {
    const del = db.prepare('DELETE FROM availability WHERE id = ?');
    del.run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// Admin: Delete inquiry
app.delete('/api/admin/inquiries/:id', (req, res) => {
  const password = req.headers.authorization;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Nieautoryzowany' });
  }

  try {
    const del = db.prepare('DELETE FROM inquiries WHERE id = ?');
    del.run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// ─── Static Files (Production) ─────────────────────────────────
// Serve the Vite build output from ../dist
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// SPA fallback: any non-API route serves index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
