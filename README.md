# Bookish

**Bookish** is a modern, full-stack storytelling and blog platform built with **React**, **Vite**, and **Tailwind CSS**. It features a sleek public-facing website for readers and a secure, comprehensive admin dashboard for content management.

---

## 🚀 Features

### Public Website
* **Dynamic Home Page**: Displays a featured hero post and a grid of the latest writings with custom loading skeletons.
* **Newsletter Subscription**: Integrated signup system using Firestore that checks for duplicate subscribers and provides instant feedback via modals.
* **Categorized Content**: Support for multiple content types including Articles, Poems, Stories, and Image-based posts.
* **Contact System**: Dedicated contact form that saves messages directly to a "messages" collection in Firestore.
* **Seamless Navigation**: Includes a responsive Navbar, Footer, and automatic "Scroll to Top" functionality on route changes.

### Admin Dashboard
* **Secure Authentication**: Protected routes using Firebase Auth and a `ProtectedRoute` wrapper to restrict access to the `/admin` path.
* **Article Management (CRUD)**: A complete interface to write, update, and delete posts with real-time data refreshing.
* **Advanced Image Uploads**: Supports uploading files directly via Cloudinary or using external URLs, with specific logic to handle Google Drive image links.
* **Inbox Management**: An admin-only tab to read, mark as read, delete, and directly reply to reader inquiries.
* **Interactive Notifications**: Uses a custom `ConfirmModal` for dangerous actions like deletions and to confirm successful publications.

---

## 🛠️ Tech Stack

* **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS 4](https://tailwindcss.com/).
* **State & Routing**: [React Router 7](https://reactrouter.com/), [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction).
* **Backend/Database**: [Firebase (Firestore & Auth)](https://firebase.google.com/).
* **Media Storage**: [Cloudinary](https://cloudinary.com/) (integrated via the API service).
* **Icons**: [Lucide React](https://lucide.dev/).

---

## 📁 Project Structure

```text
bookish-frontend/
├── src/
│   ├── components/         # Reusable UI elements
│   │   ├── admin/          # Dashboard tabs (ArticlesTab, InboxTab)
│   │   └── ...             # Navbar, Footer, Modal, Skeleton, ArticleCard
│   ├── pages/              # Main route components (Home, Blog, Admin, Login, etc.)
│   ├── services/           # API and Firebase logic (api.js, firebase-config.js)
│   ├── App.jsx             # Route definitions and Public/Admin layouts
│   └── main.jsx            # Entry point
├── firebase.json           # Hosting and rewrite rules
└── package.json            # Dependencies and scripts

⚙️ Setup & Installation
1. Prerequisites
Node.js (LTS version)

A Firebase project with Firestore and Authentication enabled

A Cloudinary account for media uploads

2. Installation

git clone <your-repo-url>
cd bookish-frontend
npm install


3. Environment Configuration
Update your Firebase credentials in src/firebase-config.js:

Configure your Firebase credentials in src/firebase-config.js. You will need your:

apiKey

authDomain

projectId

storageBucket

messagingSenderId

appId

4. Start the development server:

npm run dev

📜 Available Scripts
npm run dev: Runs the app in development mode with HMR.

npm run build: Builds the app for production to the dist folder.

npm run lint: Runs ESLint to check for code quality issues.

npm run preview: Locally previews the production build.


🔒 Security
Admin routes are protected via a ProtectedRoute component that verifies the user's authentication status through Firebase Auth before allowing access to the /admin path.
