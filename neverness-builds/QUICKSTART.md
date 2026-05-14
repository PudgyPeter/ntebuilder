# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Run Locally

```bash
cd neverness-builds
npm run dev
```

Open http://localhost:5173 in your browser.

### 2. Deploy to GitHub Pages

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/neverness-builds.git
git push -u origin main

# Enable GitHub Pages in repo Settings → Pages → Source: GitHub Actions
```

**Important**: Update `vite.config.ts` line 7 with your repo name:
```typescript
base: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME/' : '/',
```

Your site will be at: `https://YOUR_USERNAME.github.io/YOUR-REPO-NAME/`

### 3. Deploy to Railway

1. Push code to GitHub (see step 2)
2. Go to [Railway.app](https://railway.app)
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repository
5. Railway auto-deploys from `railway.json` config

## 📝 Common Tasks

### Add a New Character

Edit `src/data/characters.ts`:

```typescript
{
  id: 'new-character',
  name: 'New Character',
  rarity: 5,
  element: 'Pyro',
  role: 'DPS',
  imageUrl: '/characters/new-character.png'
}
```

Add image to `public/characters/new-character.png`

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#your-color',
  },
}
```

### Update Build Data

The scraper currently uses mock data. To customize:

Edit `api/scrape.ts` → `getMockGame8Build()` and `getMockNevernessGGBuild()`

## 🐛 Troubleshooting

**Port in use?**
```bash
# Change port in vite.config.ts
server: { port: 3000 }
```

**Build fails?**
```bash
npm install
npm run build
```

**Images not showing?**
- Place images in `public/characters/`
- Use format: `/characters/name.png`

## 📚 Full Documentation

See `SETUP_README.md` for complete setup instructions and deployment details.
