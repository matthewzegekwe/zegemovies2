import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import './components/style.css';
import { AuthProvider } from "./components/context/AuthProvider.jsx";


const App = () => {
  
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
