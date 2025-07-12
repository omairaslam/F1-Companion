# 🏎️ F1 Companion

Your Ultimate Formula 1 Experience - Complete F1 race calendar with live countdowns, driver tracking, team stats, and more.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

## 🚀 Live Demo

**🏁 [View Live Application](https://f1-companion-five.vercel.app/)**

- **Homepage:** https://f1-companion-five.vercel.app/
- **Race Calendar:** https://f1-companion-five.vercel.app/calendar

Experience the full F1 Companion with live race countdowns, interactive calendar, and responsive design!

## ✨ Features

### 🏁 Phase 1: Race Calendar & Countdown (✅ Complete & Live)
- **Live Race Calendar** - Complete F1 race schedule with upcoming events
- **Real-time Countdowns** - Live countdown timers to next race, qualifying, and practice sessions
- **Circuit Information** - Detailed information about each circuit with location and track details
- **Responsive Design** - Perfect experience on desktop, tablet, and mobile devices
- **Race Status Indicators** - Visual indicators for upcoming, today, this weekend, and completed races
- **Multiple Views** - Grid and list view options for the calendar
- **Country Flags** - Visual country identification for each Grand Prix
- **Session Details** - Complete practice, qualifying, and race session times

### 👤 Phase 2: Favorite Driver & Team Tracker (✅ Complete & Live)
- **Driver Selection** - Choose and track your favorite F1 drivers
- **Team Following** - Follow your favorite F1 teams and constructors
- **Personalized Dashboard** - Customized view based on your preferences
- **Local Storage** - Persistent user preferences across sessions
- **Search & Filter** - Find drivers and teams with advanced filtering

### 📊 Phase 3: Statistics & Analytics (� Ready for Development)
- **Championship Standings** - Live driver and constructor standings
- **Race Results** - Comprehensive race results and analysis
- **Historical Data** - Access to historical F1 statistics and records
- **Performance Trends** - Visual charts and graphs of performance data
- **Data Visualization** - Interactive charts with Recharts library

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/omairaslam/F1-Companion.git
cd F1-Companion
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Force mock data usage (useful for development)
NEXT_PUBLIC_USE_MOCK_DATA=false
```

## 🤖 For Remote Agents & New Developers

This project is designed for seamless continuation by remote agents or new developers. **Complete documentation package available:**

### **📚 Start Here:**
- **[Quick Start Guide](./docs/QUICK_START_GUIDE.md)** - 5-minute setup and immediate next steps
- **[Agent Handoff Documentation](./docs/AGENT_HANDOFF.md)** - Complete project context and continuation guide
- **[Phase 3 Specification](./docs/PHASE3_SPECIFICATION.md)** - Detailed technical requirements for next phase

### **🎯 Current Status:**
- **Progress:** 60% complete (Phase 1 & 2 done)
- **Next Phase:** Statistics & Analytics (ready for development)
- **Estimated Timeline:** 2-3 weeks for Phase 3 completion
- **All foundations in place** for immediate development start

### **🚀 Ready to Continue?**
1. Read the [Quick Start Guide](./docs/QUICK_START_GUIDE.md)
2. Set up development environment (5 minutes)
3. Begin with championship standings implementation
4. Follow the comprehensive documentation for guidance

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
