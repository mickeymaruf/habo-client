# 🟢 Habo — Community Habit Challenge Platform

**Habo** is a **community-driven habit challenge platform** where users can create, join, and track daily habits while engaging with a supportive community. It includes both **free and premium challenges**, daily progress tracking, social interactions, and admin moderation.

---

## 🔥 Core Concept

- Users create habit challenges with:
  - Title & Description
  - Duration (in days)
  - Category (Fitness, Mental Health, Productivity, Learning, Sustainability, etc.)
  - Optional attachments (images, videos, PDFs)
  - Free or Premium toggle

- Community Interaction:
  - Join challenges
  - Track daily progress
  - Upvote/downvote challenges
  - Comment and discuss strategies
  - Replicate successful habits
  - Access premium content (paid)

- Admin Role:
  - Approve or reject challenges
  - Moderate comments
  - Feature top challenges on homepage

---

## 🎯 Features

### **User**
- Register / Login (JWT authentication)
- Update profile
- Browse challenges
- Join/leave challenges
- Track daily progress (checklist)
- View progress % and streaks
- Comment and vote on challenges
- Access premium challenges

### **Admin**
- Approve/reject challenges
- Moderate comments
- Feature challenges
- Manage users

### **Challenge**
- CRUD for challenges
- Category-based filtering
- Premium toggle & payment
- Track participation & completion
- Daily progress tracking
- Voting & commenting system

### **Participation**
- Links a user to a challenge
- Tracks progress percentage
- Marks challenge completed automatically
- Optional notes per day

### **Progress**
- Tracks daily progress
- Allows optional notes
- Ensures only one entry per day per participation
- Updates participation progress % automatically

### **Payment**
- Stripe / SSLCommerz integration
- Handles premium challenge payments
- Tracks status (Pending, Success, Failed)

---

## 🛠️ Technology Stack

### **Frontend**
- Next.js 14 (App Router)
- Tailwind CSS
- React Components + Server Actions for mutations
- Services for fetching APIs
- Client caching with `next/cache` tags

### **Backend**
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT-based Authentication
- Role-Based Access Control (Admin/User)

### **Other Tools**
- Zod for schema validation
- Error handling middleware
- Deployment via Vercel / Render / Railway

---

## 📦 Project Structure
```
habo/
├─ frontend/
│ ├─ app/
│ │ ├─ challenges/
│ │ ├─ dashboard/
│ │ ├─ profile/
│ │ └─ components/
│ ├─ services/
│ │ ├─ challenge.service.ts
│ │ ├─ participation.service.ts
│ │ └─ progress.service.ts
│ ├─ actions/
│ │ ├─ challenge.ts
│ │ ├─ participation.ts
│ │ └─ progress.ts
│ └─ env.ts
└─ README.md
```


---

## 🔑 Prisma Schema Overview

### **User**
- `id, name, email, role, status, image, createdAt`
- Relations: `sessions, accounts, participations, comments, votes, payments, challenges`

### **Challenge**
- `id, title, description, durationDays, category, isPremium, featured, price, status, createdAt`
- Relations: `creator, participations, comments, votes, payments`

### **Participation**
- `id, userId, challengeId, joinedAt, progress, completed`
- Relations: `progressLogs`

### **Progress**
- `id, participationId, day, note, completed, createdAt`

### **Comment**
- `id, content, userId, challengeId, createdAt`

### **Vote**
- `id, value (+1/-1), userId, challengeId`

### **Payment**
- `id, userId, challengeId, amount, status, provider, transactionId, createdAt`

---

## ⚡ APIs Implemented

### **Auth**
- `GET /auth/me` → Fetch user profile

### **Challenges**
- `GET /challenges` → Fetch all challenges
- `GET /challenges/:id` → Fetch single challenge
- `POST /challenges` → Create challenge
- `PATCH /challenges/:id` → Update challenge
- `DELETE /challenges/:id` → Delete challenge

### **Participation**
- `POST /participations` → Join challenge
- `DELETE /participations/:id` → Leave challenge
- `GET /participations/me` → Fetch user participations

### **Progress**
- `POST /progress` → Add daily progress
- `GET /progress/:participationId` → Fetch participation progress

### **Comments & Votes**
- `POST /comments` → Add comment
- `POST /votes` → Upvote / downvote challenge

### **Payments**
- `POST /payments` → Create payment for premium challenge
- `GET /payments/me` → Fetch user payments

---

## 🖥️ Frontend Pattern

- **Services** → GET requests + cacheable, reusable
- **Actions** → Mutations (POST, PATCH, DELETE) + revalidate tags
- **Checklist UI** → Render days as checkboxes, mark completed via actions
- **Progress Bar** → Auto-calculated from progress logs
- **Real-time updates** → via `revalidateTag("progress")`

---

## 🎯 Next Steps / Features to Build

1. Challenge list page + filters  
2. Challenge details page with comments, votes, progress  
3. Dashboard with joined challenges & progress %  
4. Daily progress checklist & note input  
5. Leaderboards & streaks (optional)  
6. Premium challenge payments  

---

## 💡 Notes for AI / Developers

- Services + Actions are **separated** for reusability and cache management.
- Zod schemas validate all user inputs before hitting backend.
- Participation + Progress module is **core feature**: every user interaction revolves around it.
- Use Prisma types wherever possible to keep payload type-safe.
- All APIs follow **REST + standard HTTP status codes**.

