# NOCHILL ContentOS™ - MVP
**The AI Operating System That Turns Creators Into Contentpreneurs**

A comprehensive SaaS platform for contentpreneurs, built with React, TypeScript, and powered by AI.

---

## 🚀 **Features (MVP - Phase 1)**

### ✨ **AI Content Studio** (Killer Feature)
- **AI-Powered Script Generation** - Generate high-performing video scripts in seconds
- **SEEDS Framework Integration** - Scripts optimized for your funnel stage (Signal → Engagement → Education → Decision → Success)
- **Performance Predictions** - See estimated hook rate, completion rate, CTR, and revenue BEFORE you film
- **Production Package** - Get B-roll suggestions, music recommendations, thumbnail ideas
- **Voice Matching** - AI learns your unique voice and style (future: personalized models)
- **SEEDS Scoring** - Each script rated across all 5 funnel stages

### 📊 **SEEDS Funnel Tracker**
- **Contact Management** - Track leads through your entire funnel
- **5-Stage Pipeline** - Signal → Engagement → Education → Decision → Success
- **Conversion Tracking** - See conversion rates between each stage
- **Funnel Visualization** - Beautiful visual representation of your pipeline
- **Stage Movement** - Easily move contacts between stages
- **Low Conversion Alerts** - Get warned when conversion rates drop

### 💰 **Revenue Dashboard (PAIDS Framework)**
- Track revenue across 5 streams: **Products, Ads, Information, Deals, Services**
- Automatic diversification warnings
- Monthly targets and progress tracking
- **Tithe calculator** (10% of gross)
- Performance charts and trends

### 🗓️ **90-Day Sprint Tracker**
- 12-week sprint planning with pre-populated tasks
- Track completion progress
- Add custom tasks per week
- Filter by status

### 📦 **Product Roadmap**
- Kanban board with 5 stages (Idea → Planning → Production → Launched → Evergreen)
- Pre-populated with blueprint products
- Track pricing, launch dates, and revenue

### 🎯 **Dashboard (Command Center)**
- Weekly overview
- Revenue summary
- Quick stats
- Upcoming tasks

---

## 🛠️ **Tech Stack**

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **AI**: Claude API (Anthropic) - Sonnet 4.5
- **State Management**: Zustand with persistence
- **Charts**: Recharts
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL) - optional for cloud sync
- **Deployment**: Vercel

---

## 📦 **Quick Start**

### 1. Clone and Install

```bash
git clone <repository-url>
cd contentprenuer-system
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

**Required for AI Content Studio:**
- Get your Anthropic API key from https://console.anthropic.com/
- Add to `.env`: `ANTHROPIC_API_KEY=sk-ant-your-key-here`

**Optional (for cloud sync):**
- Create Supabase project at https://supabase.com/
- Add credentials to `.env`

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser

### 4. Start Creating!

1. Navigate to **AI Studio** in the sidebar
2. Enter a problem your audience faces
3. Select SEEDS stage (Education recommended for first try)
4. Click "Generate Script with AI"
5. Watch the magic happen! ✨

---

## 🎯 **MVP Features Checklist**

- ✅ **AI Content Studio** - Generate scripts with Claude API
- ✅ **SEEDS Funnel** - Track contacts through 5 stages
- ✅ **Revenue Dashboard** - PAIDS framework tracking
- ✅ **90-Day Sprint** - Pre-populated task management
- ✅ **Product Roadmap** - Kanban-style product planning
- ✅ **Dark Mode** - System-wide theme toggle
- ✅ **Local Data Persistence** - Zustand + localStorage
- ✅ **Mobile Responsive** - Works on all devices
- ⏳ **Multi-Tenant** - Coming in Phase 2
- ⏳ **Authentication** - Coming in Phase 2 (Clerk)
- ⏳ **Payments** - Coming in Phase 2 (Stripe)
- ⏳ **Voice Interface** - Coming in Phase 3
- ⏳ **Mobile Apps** - Coming in Phase 3

---

## 💡 **How to Use AI Content Studio**

### Example: Generate an Education-Stage Script

1. **Problem**: "Creators getting views but making R0 in revenue"
2. **SEEDS Stage**: Education
3. **Duration**: 60 seconds
4. **Optional Story**: Add "R23K in one day" story for impact

**The AI will generate:**
- Full script with timestamps
- Hook (0-3s), Problem (3-15s), Story (15-40s), Solution (40-50s), CTA (50-58s)
- SEEDS score (shows how well it hits each stage)
- Performance predictions (hook rate, completion rate, CTR, revenue)
- Production notes (B-roll ideas, music suggestions, thumbnail concepts)

**Then you can:**
- Copy the script
- Save to Content Calendar
- Edit and regenerate
- Film and publish!

---

## 🏗️ **Build for Production**

```bash
npm run build
```

The build will create an optimized production bundle in the `dist` folder.

---

## 📤 **Deploy to Vercel** (Recommended)

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to https://vercel.com/
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `ANTHROPIC_API_KEY`
   - (Optional) Supabase credentials
6. Deploy!

Your app will be live at `https://your-project.vercel.app`

---

## 🎨 **Customization**

### Colors
Edit `tailwind.config.js` to customize the color scheme.

### Branding
- Update `NOCHILL` to your brand name in components
- Add your logo to the navigation
- Customize the primary color

---

## 📊 **Data Persistence**

**Current (MVP):**
- All data stored locally using Zustand + localStorage
- Data persists across browser sessions
- No server required
- Works offline

**Coming in Phase 2:**
- Cloud sync with Supabase
- Multi-device access
- Team collaboration
- Backup and restore

---

## 🚀 **Roadmap**

### Phase 1: MVP (Current) ✅
- AI Content Studio
- SEEDS Funnel
- Revenue Dashboard
- Basic features

### Phase 2: SaaS (Next 2-3 months)
- Multi-tenant architecture
- Clerk authentication
- Stripe subscriptions
- User invitations
- Cloud sync

### Phase 3: Scale (Months 4-6)
- Voice interface ("Hey NOCHILL")
- Mobile apps (iOS + Android)
- Predictive analytics
- Advanced ML models
- Marketplace v1

### Phase 4: Enterprise (Months 7-12)
- White-label capability
- API + webhooks
- SSO integration
- Advanced permissions
- $4.4M valuation 🎯

---

## 💰 **Pricing (Future)**

**Beta Launch:**
- Starter: $47/month (beta price)
- Pro: $147/month (beta price)

**Full Launch:**
- Starter: $97/month
- Professional: $297/month
- Business: $797/month
- Enterprise: $2,997+/month

---

## 🐛 **Troubleshooting**

### AI Studio not generating scripts?

1. Check your `ANTHROPIC_API_KEY` in `.env`
2. Ensure you have API credits in your Anthropic account
3. Check browser console for errors

### Build errors?

1. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
2. Clear Vite cache: `rm -rf .vite`
3. Rebuild: `npm run build`

### Dark mode not working?

1. Check local storage in browser dev tools
2. Toggle dark mode in the sidebar
3. Refresh the page

---

## 📝 **License**

MIT

---

## 🙏 **Acknowledgments**

Built for contentpreneurs building their empire - "For children's children"

Powered by:
- [Anthropic Claude](https://www.anthropic.com/) - AI Script Generation
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://github.com/pmndrs/zustand) - State management

---

## 📞 **Support**

For issues, questions, or feedback:
- Open an issue on GitHub
- Email: support@nochillcontentos.com (coming soon)

---

**"You understand? Because you understand."** 💪

*Start creating. Start earning. Start building your empire.*
