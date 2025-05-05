import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import EventDetailPage from './pages/EventDetailPage';
import AddEventPage from './pages/AddEventPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import PrivateRoute from './components/auth/PrivateRoute';
import AdminRoute from './components/auth/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <EventProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="events/:eventId" element={<EventDetailPage />} />
                <Route path="login" element={<LoginPage />} />
                
                {/* Protected routes */}
                <Route 
                  path="add-event" 
                  element={
                    <PrivateRoute>
                      <AddEventPage />
                    </PrivateRoute>
                  } 
                />
                
                {/* Admin routes */}
                <Route 
                  path="admin/*" 
                  element={
                    <AdminRoute>
                      <AdminDashboardPage />
                    </AdminRoute>
                  } 
                />
                
                {/* 404 route */}
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </EventProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;