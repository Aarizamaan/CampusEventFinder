# 🎓 CampusEvents

**CampusEvents** is a modern web application designed to streamline event management in college campuses. Built with **React**, **TypeScript**, **Supabase**, and **TailwindCSS**, it provides both students and administrators a seamless experience to discover, add, and manage campus events.

---

## 🚀 Features

- 🔍 **Browse Events**: View all upcoming campus events in a clean, responsive layout.
- ➕ **Add Events**: Students or organizers can post new events with details like type, mode (online/offline), date, and description.
- 🔒 **Authentication**: Secure login system via Supabase Auth (email-based).
- 🛠 **Admin Dashboard**: View stats, manage users, and moderate events.
- 🌗 **Dark Mode Support**: Easily toggle between light and dark themes.
- 📱 **Mobile Responsive**: Fully responsive design for all screen sizes.

---

## 🛠 Tech Stack

| Layer        | Tech                          |
|--------------|-------------------------------|
| Frontend     | React + Vite + TypeScript     |
| Styling      | Tailwind CSS                  |
| Backend      | Supabase (PostgreSQL + Auth)  |
| State Mgmt   | React Context API             |
| Deployment   | GitHub + Vercel (or Netlify)  |

---

## 📂 Project Structure
campus-events/
├── src/                         # Source files
│   ├── components/              # Reusable UI components
│   ├── contexts/                # Context providers (Auth, Theme, Event)
│   ├── pages/                   # Route-based pages (Home, Add Event, Admin)
│   ├── utils/                   # Utility functions
│   └── main.tsx                 # Main entry point (App component)
├── public/                      # Public assets (images, favicon, etc.)
├── supabase/                    # SQL migrations and Supabase-related files
├── .env                         # Environment variables (API keys, URLs, etc.)
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite configuration

---

## 🧪 Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/subh9m/CampusEvents.git
cd CampusEvents
npm install
Create a .env file in the root with:
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
npm run dev






