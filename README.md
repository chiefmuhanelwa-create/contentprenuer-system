# NOCHILL Business OS

A comprehensive business management system for contentpreneurs, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Modules

1. **Dashboard** - Overview of all business metrics
2. **90-Day Sprint Tracker** - 12-week sprint planning with pre-populated tasks
3. **Revenue Dashboard** - PAIDS framework tracking (Products, Ads, Information, Deals, Services)
4. **Product Roadmap** - Kanban-style product management
5. **Content Calendar** - 4E framework content planning (Coming Soon)
6. **Student Pipeline** - Student journey tracking (Coming Soon)
7. **Decision Frameworks** - Business decision tools (Coming Soon)
8. **Faith Integration** - Tithing tracker and prayer journal (Coming Soon)
9. **Risk Mitigation** - Business risk management (Coming Soon)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand with persistence
- **Charts**: Recharts
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd contentprenuer-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
- Get them from https://app.supabase.com/project/_/settings/api

4. Run the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

## 🏗️ Build for Production

```bash
npm run build
```

## 📤 Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 🎯 Key Features

### Revenue Tracking (PAIDS Framework)
- Track revenue across 5 streams
- Automatic diversification warnings
- Monthly targets and progress tracking
- Tithe calculator (10% of gross)

### 90-Day Sprint
- Pre-populated with 12 weeks of tasks
- Track completion progress
- Add custom tasks per week
- Filter by status

### Product Roadmap
- Kanban board with 5 stages
- Pre-populated with default products from blueprint
- Track pricing and launch dates
- Monitor revenue per product

### Dark Mode
- System-wide dark mode toggle
- Persists across sessions

## 📊 Data Persistence

All data is stored locally using Zustand's persist middleware. Data persists across browser sessions.

For cloud sync, configure Supabase:
1. Create a Supabase project
2. Add credentials to `.env`
3. Run the SQL schema from the technical specification

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme.

### Business Name
Update in the Zustand store or add user settings.

## 📝 License

MIT

## 🙏 Acknowledgments

Built for contentpreneurs building their empire - "For children's children"

*"You understand? Because you understand."*
