import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation';
import Footer from './components/footer';
import Home from './pages/home';
import MusicGroup from './pages/music-group';
import MusicGroupDetail from './components/music-group-detail';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navigation />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music-groups" element={<MusicGroup />} />
          <Route path="/music-groups/:id" element={<MusicGroupDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
    
  );
}

export default App;
