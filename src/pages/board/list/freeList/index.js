import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import '../../../../css/globalCss.css';
import './index.css';
import TableRow from './TableRow';

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const [sessionName, setSessionName] = useState('');
  const Navigate = useNavigate();

  useEffect(() => {
    const sessionName = window.sessionStorage.getItem('nickname');
    if (sessionName) {
      setSessionName(sessionName);
    }
    const fetchData = async () => {
      const response = await fetch('/.netlify/functions/getPost');
      const result = await response.json();
      setPosts(result);
    };

    fetchData();
  }, []);

  const handleBoard = () => {
    Navigate('/');
  };

  const handleQuest = () => {
    Navigate('/quest');
  };

  const write = () => {
    if (!sessionName) {
      alert('로그인이 되어 있지 않습니다.');
      Navigate('/');
    } else {
      Navigate('/create');
    }
  };

  return (
    <div>
      <div className="parent_f">
        <div className="F1000004037_f">
          <div className="F1000004356_f">
            <div className="F1000004327_f">
              <p className="Login_f">board</p>
              <p className="Login2_f">자유게시판</p>
            </div>
            <div className="F1000004355_f">
              <div className="F1000004353_f">
                <button className="F10000043242_f" onClick={handleBoard}>
                  <p className="ButtonText0_f">자유 게시판</p>
                </button>
                <button className="F10000043532_f" onClick={handleQuest}>
                  <p className="ButtonText1_f">질문 게시판</p>
                </button>
                <button className="F1000004354_f" onClick={handleQuest}>
                  <p className="ButtonText2_f">질문 게시판</p>
                </button>
              </div>
              <div className="F1000004351_f">
                <div className="F1000004340_f">
                  <div className="F1000004338_f">
                    <div className="F1000004333_f">
                      <div className="No_f">No</div>
                    </div>
                    <div className="F1000004337_f">
                      <p className="Title_f">제목</p>
                    </div>
                    <div className="F1000004334_f">
                      <p className="Writer_f">글쓴이</p>
                    </div>
                    <div className="F1000004335_f">
                      <p className="Time_f">작성시간</p>
                    </div>
                    <div className="F1000004336_f">
                      <p className="Views_f">조회수</p>
                    </div>
                  </div>
                  {posts.map((post, index) => (
                    <TableRow key={index} post={post} />
                  ))}
                </div>
                <div className="F1000004349_f">
                  <div className="Frame41_f">
                    <div className="Chevron_f">
                      <FaChevronLeft className="Vector_f" />
                    </div>
                    <div className="Frame40_f">
                      <p className="num1_f">1</p>
                      <p className="num2_f">2</p>
                      <p className="numdot_f">...</p>
                      <p className="num5_f">5</p>
                    </div>
                    <div className="Chevron2_f">
                      <FaChevronLeft className="Vector2_f" />
                    </div>
                  </div>
                  <button className="F1000004325_f" onClick={write}>
                    <div className="Content2_f">
                      <p className="ButtonText3_f">글쓰기</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
