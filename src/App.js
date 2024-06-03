import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './pages/header/nav';
import Footer from './pages/footer/index';
import BoardList from './pages/board/list/freeList';
import QuestList from './pages/board/list/questList';
import BoardDetail from './pages/board/detail';
import BoardQuestDetail from './pages/board/detail/index2';
import Login from './pages/sign/login';
import Signin from './pages/sign/signIn';
import SigninDone from './pages/sign/signIn/done';
import WritePost from './pages/create/index';
import WriteQPost from './pages/create/index2';
import FindID from './pages/sign/find';
import FindPW from './pages/sign/find';
import D3 from './pages/dashboard';
import { WiDayThunderstorm } from 'react-icons/wi';

function App() {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div id="wrap">
          <Nav />
          <Routes>
            <Route path="/" element={<BoardList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/findID" element={<FindID />} />
            <Route path="/findPW" element={<FindPW />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/Done" element={<SigninDone />} />
            <Route path="/board" element={<BoardList />} />
            <Route path="/quest" element={<QuestList />} />
            <Route path="/dash" element={<D3 />} />
            <Route path="/create" element={<WritePost />} />
            <Route path="/createQ" element={<WriteQPost />} />
            <Route path="/post/:num" element={<BoardDetail />} />
            <Route path="/quest/:num" element={<BoardQuestDetail />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

//test!

// import React, { useEffect, useState } from 'react';

// function App() {
//   const [data, setData] = useState([]);

//   const fetchData = async () => {
//     const response = await fetch('/.netlify/functions/getData');
//     const result = await response.json();
//     setData(result);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Fetched Data</h1>
//       <ul>
//         {data.map((item, index) => (
//           <li key={index}>{item.email}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
