import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../../../css/globalCss.css';
import './index.css';
import TableRow from './TableRow';

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    // 서버로부터 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/getPost');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBoard = () => {
    Navigate('/board');
  };

  const handleQuest = () => {
    Navigate('/quest');
  };

  return (
    <div>
      <div className="parent">
        <div className="F1000004037">
          <div className="F1000004356">
            <div className="F1000004327">
              <p className="Login">board</p>
              <p className="Login2">자유게시판</p>
            </div>
            <div className="F1000004355">
              <div className="F1000004353">
                <div className="F1000004324">
                  <p className="ButtonText0" onClick={handleBoard}>
                    자유 게시판
                  </p>
                </div>
                <div className="F10000043532">
                  <p className="ButtonText1" onClick={handleQuest}>
                    질문 게시판
                  </p>
                </div>
                <div className="F1000004354">
                  <p className="ButtonText2" onClick={handleQuest}>
                    질문 게시판
                  </p>
                </div>
              </div>
              <div className="F1000004351">
                <div className="F1000004340">
                  <div className="F1000004338">게시물 속성 행</div>
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
