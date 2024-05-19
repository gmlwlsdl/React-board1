import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './pages/board/header/nav';
import BoardList from './pages/board/list/freeList';
import QuestList from './pages/board/list/questList';
import BoardDetail from './pages/board/detail';
import BoardQuestDetail from './pages/board/detail/index2';
import Login from './pages/sign/login';
import Signin from './pages/sign/signIn';
import SigninDone from './pages/sign/signIn/done';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/Done" element={<SigninDone />} />
          <Route path="/board" element={<BoardList />} />
          <Route path="/quest" element={<QuestList />} />
          <Route path="/api/post/:num" element={<BoardDetail />} />
          <Route path="/quest/:num" element={<BoardQuestDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
