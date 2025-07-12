# 🚀 Quick Start Guide for Remote Agents

## 30-Second Project Overview

**F1 Companion** is a comprehensive Formula 1 web application built with Next.js, TypeScript, and Tailwind CSS. 

- **Live App:** https://f1-companion-five.vercel.app/
- **GitHub:** https://github.com/omairaslam/F1-Companion
- **Progress:** 60% complete (Phase 1 & 2 done, Phase 3 needed)

---

## ⚡ Immediate Setup (5 minutes)

```bash
# 1. Clone and setup
git clone https://github.com/omairaslam/F1-Companion.git
cd F1-Companion
npm install

# 2. Start development
npm run dev
# App runs at http://localhost:3000

# 3. Verify everything works
npm run build
npm test
```

---

## 🎯 What You Need to Build: Phase 3 Statistics

### **Goal:** Add F1 statistics and analytics features

### **Priority Features (Start Here):**
1. **Championship Standings** (`/standings` page)
2. **Race Results Browser** (`/results` page)  
3. **Performance Charts** (using Recharts library)
4. **Historical Data Access** (previous seasons)

---

## 📁 Key Files to Know

### **Must Understand:**
- `src/lib/api/ergast.ts` - Main API service (extend this)
- `src/hooks/useUserPreferences.ts` - User preferences system
- `src/components/layout/Navigation.tsx` - Add new nav items here

### **Follow These Patterns:**
- `src/components/drivers/` - Example component structure
- `src/app/dashboard/page.tsx` - Example page structure
- `src/lib/api/mock-data.ts` - Add mock data here

---

## 🛠️ Step-by-Step Implementation

### **Step 1: Add Championship Standings (Start Here)**

1. **Extend API service:**
```typescript
// Add to src/lib/api/ergast.ts
async getDriverStandings(season?: number): Promise<DriverStanding[]> {
  try {
    const year = season || new Date().getFullYear();
    const data = await this.fetchData(`/${year}/driverStandings`);
    return data.MRData.StandingsTable?.StandingsLists[0]?.DriverStandings || [];
  } catch (error) {
    console.warn('Falling back to mock standings data:', error);
    return getMockDriverStandings();
  }
}
```

2. **Create standings component:**
```typescript
// Create src/components/statistics/StandingsTable.tsx
export function StandingsTable({ type }: { type: 'drivers' | 'constructors' }) {
  // Implementation here - follow existing component patterns
}
```

3. **Create standings page:**
```typescript
// Create src/app/standings/page.tsx
import { StandingsTable } from '@/components/statistics/StandingsTable';

export default function StandingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <StandingsTable type="drivers" />
      </div>
    </div>
  );
}
```

4. **Update navigation:**
```typescript
// Add to src/components/layout/Navigation.tsx
import { Trophy } from 'lucide-react';

const navigation = [
  // ... existing items
  { name: 'Standings', href: '/standings', icon: Trophy },
];
```

### **Step 2: Add Charts Library**
```bash
npm install recharts @types/recharts
```

### **Step 3: Test & Deploy**
```bash
npm run build  # Must pass
npm test       # Must pass
git add .
git commit -m "feat: add championship standings"
git push origin main  # Auto-deploys to Vercel
```

---

## 📋 Development Checklist

### **Before Starting:**
- [ ] Clone repo and verify `npm run dev` works
- [ ] Check live app at https://f1-companion-five.vercel.app/
- [ ] Read `docs/AGENT_HANDOFF.md` for full context
- [ ] Review existing components in `src/components/`

### **For Each Feature:**
- [ ] Extend API service in `src/lib/api/ergast.ts`
- [ ] Add mock data in `src/lib/api/mock-data.ts`
- [ ] Create components following existing patterns
- [ ] Add new pages in `src/app/`
- [ ] Update navigation if needed
- [ ] Test thoroughly (`npm run build` && `npm test`)
- [ ] Commit with conventional commit messages

### **Quality Standards:**
- [ ] TypeScript strict mode (no `any` types)
- [ ] Responsive design (mobile-first)
- [ ] Error handling and loading states
- [ ] Follow existing design patterns
- [ ] Clean build with no linting errors

---

## 🎨 Design System Quick Reference

### **Colors:**
- Primary: `bg-red-600`, `text-red-600`
- Secondary: `bg-gray-600`, `text-gray-600`
- Success: `bg-green-600`, `text-green-600`

### **Layout:**
- Container: `container mx-auto px-4 py-8`
- Cards: `bg-white rounded-lg border border-gray-200 p-4`
- Buttons: `px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700`

### **Typography:**
- Headings: `text-3xl font-bold text-gray-900`
- Body: `text-gray-600`
- Small: `text-sm text-gray-500`

---

## 🆘 Common Issues & Solutions

### **Build Fails:**
- Check for unused imports (ESLint will catch these)
- Ensure all TypeScript types are properly defined
- Run `npm run lint` to see specific issues

### **API Issues:**
- Ergast API sometimes fails - that's why we have mock data
- Always implement fallback to mock data
- Test both API and mock data scenarios

### **Styling Issues:**
- Use existing component patterns as reference
- Stick to Tailwind CSS classes
- Ensure mobile responsiveness

---

## 📞 Need Help?

### **Documentation:**
- **Full Context:** `docs/AGENT_HANDOFF.md`
- **Technical Spec:** `docs/PHASE3_SPECIFICATION.md`
- **Project History:** `docs/development-journey.md`

### **Code Examples:**
- **API Patterns:** `src/lib/api/ergast.ts`
- **Component Patterns:** `src/components/drivers/`
- **Page Patterns:** `src/app/dashboard/page.tsx`
- **Hook Patterns:** `src/hooks/useUserPreferences.ts`

### **External Resources:**
- **Ergast API Docs:** https://ergast.com/mrd/
- **Recharts Docs:** https://recharts.org/
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## 🎯 Success Criteria

### **Phase 3 Complete When:**
- [ ] Championship standings working (drivers & constructors)
- [ ] Race results browser functional
- [ ] Performance charts displaying data
- [ ] Historical data accessible
- [ ] All pages responsive and error-free
- [ ] Clean build and passing tests
- [ ] Live deployment successful

### **Estimated Timeline:** 2-3 weeks for complete Phase 3

---

## 🚀 Ready to Start?

1. **Set up environment** (5 minutes)
2. **Read full handoff docs** (15 minutes)
3. **Start with championship standings** (Day 1 goal)
4. **Follow the step-by-step guide above**

The project is well-structured and ready for immediate continuation. All foundations are in place - just extend the existing patterns!
