import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom'; // 1. Import Outlet

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Login from './pages/Login';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import Photography from './pages/Photography';
// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute'; 

// 2. Define a "Public Layout" Component
// This wrapper holds the Navbar and Footer
const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet /> {/* <--- This is where Home, Blog, etc. will appear */}
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <>
      <ScrollToTop />
      
      <Routes>
        {/* 3. GROUP 1: Public Routes (Wrapped in Layout) */}
        {/* All routes inside here will have Navbar & Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* 4. GROUP 2: Admin Routes (No Layout) */}
        {/* These routes will typically look different and won't show the public Nav/Footer */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

      </Routes>
    </>
  );
}

export default App;

// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Blog from './pages/Blog';
// import BlogPost from './pages/BlogPost';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Admin from './pages/Admin';

// // 1. ScrollToTop Component
// const ScrollToTop = () => {
//   const { pathname } = useLocation();
//   React.useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);
//   return null;
// };

// function App() {
//   return (
//     <Router>
//       <ScrollToTop /> {/* <--- ACTIVATE SCROLL FIX HERE */}
//       <div className="flex flex-col min-h-screen font-sans text-slate-800">
//         <Navbar />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/admin" element={<Admin />} />
//             <Route path="/" element={<Home />} />
//             <Route path="/blog" element={<Blog />} />
//             <Route path="/blog/:id" element={<BlogPost />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;