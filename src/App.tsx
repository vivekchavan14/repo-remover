import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Callback from './components/Callback';
import Repos from './components/Repos';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/repos" element={<Repos />} />
      </Routes>
    </Router>
  );
};

export default App;
