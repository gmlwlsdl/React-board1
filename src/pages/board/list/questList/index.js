import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../css/globalCss.css';
import { FaChevronLeft } from 'react-icons/fa';
import './index.css';
import TableRow from './TableRow';

const QuestList = () => {
  const [posts, setPosts] = useState([]);
  const [sessionName, setSessionName] = useState('');
  const Navigate = useNavigate();

  useEffect(() => {
    const sessionName = window.sessionStorage.getItem('nickname');
    if (sessionName) {
      setSessionName(sessionName);
    }
    const fetchData = async () => {
      const response = await fetch('/.netlify/functions/getQPost');
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
      Navigate('/createQ');
    }
  };

  return (
    <div>
      <div className="parent_q">
        <div className="F1000004037_q">
          <div className="F1000004356_q">
            <div className="F1000004327_q">
              <p className="Login_q">board</p>
              <p className="Login2_q">질문게시판</p>
            </div>
            <div className="F1000004355_q">
              <div className="F1000004353_q">
                <button className="F10000043242_q">
                  <p className="ButtonText0_q" onClick={handleBoard}>
                    자유 게시판
                  </p>
                </button>
                <button className="F10000043532_q">
                  <p className="ButtonText1_q" onClick={handleQuest}>
                    질문 게시판
                  </p>
                </button>
                <button className="F1000004354_q">
                  <p className="ButtonText2_q" onClick={handleQuest}>
                    질문 게시판
                  </p>
                </button>
              </div>
              <div className="F1000004351_q">
                <div className="F1000004340_q">
                  <div className="F1000004338_q">
                    <div className="F1000004333_q">
                      <div className="No_q">No</div>
                    </div>
                    <div className="F1000004337_q">
                      <p className="Title_q">제목</p>
                    </div>
                    <div className="F1000004334_q">
                      <p className="Writer_q">글쓴이</p>
                    </div>
                    <div className="F1000004335_q">
                      <p className="Time_q">작성시간</p>
                    </div>
                    <div className="F1000004336_q">
                      <p className="Views_q">조회수</p>
                    </div>
                  </div>
                  {/* <div className="F1000004339_q"> */}
                  {posts.map((post, index) => (
                    <TableRow key={index} post={post} />
                  ))}
                </div>
                <div className="F1000004349_q">
                  <div className="Frame41_q">
                    <div className="Chevron_q">
                      <FaChevronLeft className="Vector_q" />
                    </div>
                    <div className="Frame40_q">
                      <p className="num1_q">1</p>
                      <p className="num2_q">2</p>
                      <p className="numdot_q">...</p>
                      <p className="num5_q">5</p>
                    </div>
                    <div className="Chevron2_q">
                      <FaChevronLeft className="Vector2_q" />
                    </div>
                  </div>
                  <button className="F1000004325_q">
                    <div className="Content2_q" onClick={write}>
                      <p className="ButtonText3_q">글쓰기</p>
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

export default QuestList;
