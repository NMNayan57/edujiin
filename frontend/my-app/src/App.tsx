import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Universities from './pages/Universities';
import Scholarships from './pages/Scholarships';
import Documents from './pages/Documents';
import Visa from './pages/Visa';
import Cultural from './pages/Cultural';
import Career from './pages/Career';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import './styles/App.css';

// Auth context
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <PrivateRoute>
                <div className="app-container">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <div className="content-container">
                    <Sidebar isOpen={sidebarOpen} />
                    <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                      <Dashboard />
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <div className="app-container">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <div className="content-container">
                    <Sidebar isOpen={sidebarOpen} />
                    <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                      <Profile />
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            } />
            <Route path="/universities" element={
              <PrivateRoute>
                <div className="app-container">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <div className="content-container">
                    <Sidebar isOpen={sidebarOpen} />
                    <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                      <Universities />
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            } />
            <Route path="/scholarships" element={
              <PrivateRoute>
                <div className="app-container">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <div className="content-container">
                    <Sidebar isOpen={sidebarOpen} />
                    <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                      <Scholarships />
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            } />
            <Route path="/documents" element={
              <PrivateRoute>
                <div className="app-container">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <div className="content-container">
                    <Sidebar isOpen={sidebarOpen} />
                    <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                      <Documents />
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            } />
            <Route path="/visa" element={
              <PrivateRoute>
                <div className="app-container">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <div className="content-container">
                    <Sidebar isOpen={sidebarOpen} />
                    <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                      <Visa />
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            } />
            <Route path="/cultural" element={
              <PrivateRoute>
                <div className="app-container">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <div className="content-container">
                    <Sidebar isOpen={sidebarOpen} />
                    <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                      <Cultural />
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            } />
            <Route path="/career" element={
              <PrivateRoute>
                <div className="app-container">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <div className="content-container">
                    <Sidebar isOpen={sidebarOpen} />
                    <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                      <Career />
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            } />
            <Route path="/chat" element={
              <PrivateRoute>
                <div className="app-container">
                  <Navbar toggleSidebar={toggleSidebar} />
                  <div className="content-container">
                    <Sidebar isOpen={sidebarOpen} />
                    <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                      <Chat />
                    </main>
                  </div>
                </div>
              </PrivateRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
