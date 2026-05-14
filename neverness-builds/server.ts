import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapeGame8, scrapeNevernessGG } from './api/scrape.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// API routes
app.get('/api/scrape/game8/:character', async (req: Request, res: Response) => {
  try {
    const characterName = decodeURIComponent(req.params.character);
    const build = await scrapeGame8(characterName);
    res.json(build);
  } catch (error) {
    console.error('Game8 scrape error:', error);
    res.status(500).json({ error: 'Failed to fetch Game8 build data' });
  }
});

app.get('/api/scrape/neverness/:character', async (req: Request, res: Response) => {
  try {
    const characterName = decodeURIComponent(req.params.character);
    const build = await scrapeNevernessGG(characterName);
    res.json(build);
  } catch (error) {
    console.error('Neverness.gg scrape error:', error);
    res.status(500).json({ error: 'Failed to fetch Neverness.gg build data' });
  }
});

// Serve static files from the built Vite app
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback - serve index.html for all non-API routes
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
