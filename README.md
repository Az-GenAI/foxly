# 🦊 Foxly — Language Learning for Kids

> Learn Spanish, French, German, Japanese & Arabic through magical adventures with Finn the Fox.
> **100% free. Zero ads. Built for kids aged 8–13.**

---

## 🚀 Getting Started in 5 Minutes

### Step 1 — Clone & Install

```bash
# Copy the foxly folder to your machine, then:
cd foxly
npm install
```

### Step 2 — Set Up Firebase (Free)

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"** → name it `foxly`
3. Go to **Project Settings → Web App** → click `</>` to add a web app
4. Copy the config values

Now enable these Firebase services:
- **Authentication** → Sign-in methods → Enable **Google** and **Email/Password**
- **Firestore Database** → Create database → Start in **test mode**

### Step 3 — Add Environment Variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your Firebase values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Step 4 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see the Foxly landing page! 🎉

---

## 🌐 Deploy to Vercel (Free)

### Option A — Vercel CLI (Fastest)

```bash
npm install -g vercel
vercel
```

Follow the prompts. When asked about environment variables, add all your `NEXT_PUBLIC_FIREBASE_*` values.

### Option B — GitHub + Vercel (Recommended)

1. Push your code to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import Project → select your repo
3. Add environment variables in the Vercel dashboard
4. Click **Deploy** — live in 2 minutes ✅

Your app will be live at `https://foxly.vercel.app` (or your custom domain).

---

## 🔥 Firestore Security Rules

Once ready to go live, replace test mode rules with these in Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /lessons/{lessonId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

---

## 📁 Project Structure

```
foxly/
├── src/
│   ├── app/
│   │   ├── page.tsx          ← Landing page (redirects to /map if signed in)
│   │   ├── auth/page.tsx     ← Sign In / Sign Up / Guest (3-step signup)
│   │   ├── map/page.tsx      ← World Map (5 kingdoms, Finn navigation)
│   │   ├── lesson/page.tsx   ← Lesson Engine (MCQ, Flashcard, Drag, Speak)
│   │   ├── profile/page.tsx  ← User Profile (XP, badges, streak, settings)
│   │   ├── parent/page.tsx   ← Parent Dashboard (progress, controls)
│   │   ├── layout.tsx        ← Root layout (fonts, auth provider, toasts)
│   │   └── globals.css       ← Global styles & design tokens
│   ├── components/
│   │   └── auth/
│   │       └── AuthProvider.tsx  ← Firebase auth state → Zustand store
│   ├── hooks/
│   │   └── useAuth.ts        ← All auth logic (signIn, signUp, Google, guest)
│   ├── lib/
│   │   ├── firebase.ts       ← Firebase initialization
│   │   ├── db.ts             ← All Firestore CRUD operations
│   │   └── store.ts          ← Zustand global state
│   ├── data/
│   │   └── lessons.ts        ← All lesson content (5 languages × 5 categories)
│   └── types/
│       └── index.ts          ← TypeScript types for everything
├── .env.example              ← Environment variable template
├── next.config.mjs           ← Next.js configuration
├── tailwind.config.ts        ← Tailwind + Foxly design system
└── package.json              ← All dependencies
```

---

## 🎮 Features Built

| Feature | Status | Notes |
|---|---|---|
| Landing Page | ✅ | Animated, Finn mascot, 5 worlds |
| Sign In | ✅ | Email + Google OAuth |
| Sign Up | ✅ | 3-step flow, avatar picker, age group |
| Guest Mode | ✅ | Local storage, no account needed |
| World Map | ✅ | 5 kingdoms, locked/unlocked, Finn movement |
| MCQ Lessons | ✅ | 4 options, audio, instant feedback |
| Flashcard Lessons | ✅ | 3D flip animation, self-assessment |
| Drag & Drop | ✅ | Sentence builder, word bank |
| Pronunciation | ✅ | Web Speech API, % score |
| XP System | ✅ | Firestore-backed, level calculation |
| Streak Tracking | ✅ | Daily streak, longest streak |
| Badges | ✅ | 12 badges, auto-award on milestone |
| Parent Dashboard | ✅ | Progress, activity feed, controls |
| User Profile | ✅ | XP bar, badges, streak calendar |

---

## 🗺️ Roadmap

### Phase 2 (Month 2–3)
- [ ] AI conversation practice (OpenAI API)
- [ ] More lesson categories per language (50 total per language)
- [ ] Push notifications (Firebase Cloud Messaging)
- [ ] Offline mode (PWA)

### Phase 3 (Month 4–6)
- [ ] React Native mobile app (iOS + Android)
- [ ] School/classroom mode
- [ ] Foxly Plus premium tier
- [ ] Leaderboard between friends

---

## 🛡️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Auth | Firebase Auth (Google + Email) |
| Database | Firebase Firestore |
| State | Zustand |
| Hosting | Vercel |
| TTS/Speech | Web Speech API (free) |
| Toasts | React Hot Toast |

**Total monthly cost at launch: $0** 🎉

---

## 🦊 Brand Assets

- **App name:** Foxly
- **Mascot:** Finn the Fox
- **Tagline:** Learn Languages Through Adventure
- **Primary color:** `#f9c846` (Foxly Gold)
- **Accent:** `#3dd9c8` (Foxly Mint)
- **Background:** `#06101f` (Deep Ocean)

---

## 📄 License

Private — All rights reserved. © 2025 Foxly.

---

*Built with 🦊 by the Foxly team.*
