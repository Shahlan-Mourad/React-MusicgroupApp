import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MusicGroup from '../pages/MusicGroup';
import MusicGroupDetail from '../components/music-group-detail';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/groups" element={<MusicGroup />} />
      <Route path="/groups/:id" element={<MusicGroupDetail />} />
    </Routes>
  );
};

export default AppRouter; 