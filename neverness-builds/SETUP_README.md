# Neverness to Everness - Character Build Guide

A modern, responsive web application that aggregates character build information from Game8 and Neverness.gg for the game **Neverness to Everness**. Features a beautiful UI with character grid, search functionality, and detailed build comparisons.

![Tech Stack](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue)
![Vite](https://img.shields.io/badge/Vite-8.0-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-cyan)

## 🌟 Features

- **Character Grid**: Browse all playable characters with beautiful card layouts
- **Advanced Search**: Filter characters by name, element, and role
- **Dual Source Builds**: View recommended builds from both Game8 and Neverness.gg
- **Detailed Information**: 
  - Weapon recommendations with rarity and descriptions
  - Artifact set suggestions with main/sub stats
  - Team composition recommendations
  - Skill priority guides
- **Modern UI**: Gradient backgrounds, smooth animations, and responsive design
- **Auto-scraping**: Automatically fetches latest build data from both sources

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- A **GitHub account** - [Sign up here](https://github.com/)
- A **Railway account** (optional, for Railway deployment) - [Sign up here](https://railway.app/)

## 🚀 Local Development Setup

### 1. Clone or Download the Project

If you have this project locally, navigate to the `neverness-builds` folder:

```bash
cd neverness-builds
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- React Router for navigation
- TailwindCSS for styling
- Lucide React for icons
- Axios for HTTP requests
- Cheerio for web scraping

### 3. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

Open your browser and navigate to the URL shown in the terminal.

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### 5. Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## 🌐 Deployment Options

### Option 1: Deploy to GitHub Pages

#### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com/) and sign in
2. Click the **+** icon in the top right → **New repository**
3. Name it `neverness-builds` (or any name you prefer)
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **Create repository**

#### Step 2: Initialize Git and Push Code

Open terminal in the `neverness-builds` folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Neverness to Everness build guide"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/neverness-builds.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy on every push to main

#### Step 4: Update Base Path (Important!)

In `vite.config.ts`, update line 7 to match your repository name:

```typescript
base: process.env.NODE_ENV === 'production' ? '/YOUR-REPO-NAME/' : '/',
```

Replace `YOUR-REPO-NAME` with your actual repository name.

Commit and push this change:

```bash
git add vite.config.ts
git commit -m "Update base path for GitHub Pages"
git push
```

#### Step 5: Access Your Site

After the GitHub Action completes (check the **Actions** tab), your site will be available at:

```
https://YOUR_USERNAME.github.io/YOUR-REPO-NAME/
```

### Option 2: Deploy to Railway

Railway provides free hosting with automatic deployments from GitHub.

#### Step 1: Push to GitHub

Follow Steps 1-2 from the GitHub Pages section above to push your code to GitHub.

#### Step 2: Deploy to Railway

1. Go to [Railway.app](https://railway.app/) and sign in with GitHub
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Choose your `neverness-builds` repository
5. Railway will automatically detect the configuration from `railway.json`
6. Click **Deploy**

#### Step 3: Configure Environment

Railway will automatically:
- Install dependencies
- Build the project
- Start the preview server

#### Step 4: Get Your URL

1. Go to your project in Railway
2. Click **Settings** → **Domains**
3. Click **Generate Domain**
4. Your site will be available at the generated URL (e.g., `your-app.up.railway.app`)

#### Step 5: Set Up Automatic Deployments

Railway automatically deploys when you push to your GitHub repository's main branch.

## 🔧 Configuration

### Customizing Character Data

Edit `src/data/characters.ts` to add or modify characters:

```typescript
{
  id: 'character-id',
  name: 'Character Name',
  rarity: 5, // 4 or 5 star
  element: 'Element Type',
  role: 'DPS', // DPS, Support, Healer, etc.
  imageUrl: '/characters/character-name.png'
}
```

### Adding Character Images

1. Place character portrait images in the `public/characters/` folder
2. Name them to match the `imageUrl` in your character data
3. Recommended size: 300x300px or larger
4. Supported formats: PNG, JPG, WebP

### Customizing Scraper URLs

Edit `api/scrape.ts` to modify the scraping sources:

```typescript
const GAME8_BASE_URL = 'https://game8.co/games/Neverness-to-Everness';
const NEVERNESS_GG_BASE_URL = 'https://neverness.gg';
```

**Note**: The scraper uses mock data by default. To enable real scraping, you'll need to:
1. Inspect the actual website structure
2. Update the CSS selectors in the scraping functions
3. Handle CORS issues (may require a backend proxy)

### Styling Customization

The app uses TailwindCSS. Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom color palette
      },
    },
  },
}
```

## 📁 Project Structure

```
neverness-builds/
├── api/
│   └── scrape.ts              # Web scraping logic for Game8 & Neverness.gg
├── public/
│   └── characters/            # Character portrait images
├── src/
│   ├── components/
│   │   ├── CharacterCard.tsx  # Character grid card component
│   │   └── SearchBar.tsx      # Search input component
│   ├── data/
│   │   └── characters.ts      # Character data array
│   ├── pages/
│   │   ├── Home.tsx           # Main page with character grid
│   │   └── CharacterDetail.tsx # Individual character build page
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── utils/
│   │   └── scraper.ts         # Scraper utility functions
│   ├── App.tsx                # Main app component with routing
│   ├── index.css              # Global styles with Tailwind
│   └── main.tsx               # App entry point
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages deployment workflow
├── package.json               # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── railway.json              # Railway deployment config
└── nixpacks.toml             # Railway build configuration
```

## 🛠️ Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🐛 Troubleshooting

### Build Fails on GitHub Actions

- Check that all dependencies are in `package.json`
- Verify the base path in `vite.config.ts` matches your repo name
- Check the Actions tab for detailed error logs

### Images Not Loading

- Ensure images are in the `public/characters/` folder
- Check that image paths in `characters.ts` match actual filenames
- Images should be relative to the `public` folder (e.g., `/characters/name.png`)

### Scraper Returns Mock Data

- The scraper uses fallback mock data when real scraping fails
- To enable real scraping, update CSS selectors to match actual website structure
- Consider implementing a backend proxy to handle CORS issues

### Railway Deployment Issues

- Ensure `railway.json` and `nixpacks.toml` are in the root directory
- Check Railway logs for build errors
- Verify Node.js version compatibility (v20+ required)

### Port Already in Use

If port 5173 is already in use:

```bash
# Kill the process using the port (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or change the port in vite.config.ts
server: {
  port: 3000, // Use a different port
}
```

## 🔄 Updating the Site

### Update Character Data

1. Edit `src/data/characters.ts`
2. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update character data"
   git push
   ```
3. GitHub Pages/Railway will automatically redeploy

### Update Builds

The scraper fetches data on each character page load. Mock data is currently used as fallback.

## 📝 Notes

- **Web Scraping**: The current implementation uses mock data. Real scraping requires:
  - Proper CSS selectors for target websites
  - CORS handling (backend proxy recommended)
  - Rate limiting to avoid being blocked
  
- **Images**: Character portraits are placeholders. Replace with actual game assets.

- **Data Accuracy**: Build recommendations are examples. Update with real data from the sources.

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available for personal use.

## 🙏 Credits

- Build data sourced from [Game8](https://game8.co) and [Neverness.gg](https://neverness.gg)
- Built with React, Vite, and TailwindCSS
- Icons from [Lucide React](https://lucide.dev)

## 📧 Support

If you encounter issues:

1. Check the Troubleshooting section above
2. Review GitHub Actions logs (for deployment issues)
3. Check Railway logs (for Railway deployment)
4. Ensure all prerequisites are installed correctly

---

**Enjoy building your perfect Neverness to Everness team! 🎮✨**
