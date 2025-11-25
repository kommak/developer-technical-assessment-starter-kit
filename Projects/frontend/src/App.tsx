import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import LandingPage from './pages/LandingPage';
import PropertyDetails from './pages/propertySlice';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Header from './components/Header/Header'; 
import Footer from './components/Footer/Footer'; 

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header /> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/property/:type/:id" element={<PropertyDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer /> 
      </Router>
    </Provider>
  );
};

export default App;
