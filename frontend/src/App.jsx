import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logout } from './redux/slices/authSlice';
import setAuthToken from './utils/setAuthToken';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import Profiles from './components/profiles/Profiles';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
}

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const authLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/posts">Posts</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li>
        <button className="btn-logout" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <Router>
      <nav className="navbar">
        <h1>
          <Link to="/">DevConnector</Link>
        </h1>
        {!loading && (isAuthenticated ? authLinks : guestLinks)}
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div className="landing">
              <div className="landing-inner">
                <h1>Developer Connector</h1>
                <p>Create a developer profile, share posts, and get help from other developers</p>
                {!isAuthenticated && (
                  <div>
                    <Link to="/register" className="btn btn-primary">Sign Up</Link>
                    <Link to="/login" className="btn btn-light">Login</Link>
                  </div>
                )}
              </div>
            </div>
          }
        />
        <Route
          path="/*"
          element={
            <div className="container">
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/create-profile"
                  element={
                    <PrivateRoute>
                      <ProfileForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit-profile"
                  element={
                    <PrivateRoute>
                      <ProfileForm />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/add-experience"
                  element={
                    <PrivateRoute>
                      <AddExperience />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/add-education"
                  element={
                    <PrivateRoute>
                      <AddEducation />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/posts"
                  element={
                    <PrivateRoute>
                      <Posts />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/posts/:id"
                  element={
                    <PrivateRoute>
                      <Post />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          }
        />
      </Routes>
      <footer className="footer">
        <p>DevConnector &copy; {new Date().getFullYear()} - Built with the MERN Stack</p>
      </footer>
    </Router>
  );
}

export default App;




// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
