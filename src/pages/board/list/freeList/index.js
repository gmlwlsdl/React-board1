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
      <div className="parent_f">
        <div className="F1000004037_f">
          <div className="F1000004356_f">
            <div className="F1000004327_f">
              <p className="Login_f">board</p>
              <p className="Login2_f">자유게시판</p>
            </div>
            <div className="F1000004355_f">
              <div className="F1000004353_f">
                <div className="F10000043242_f">
                  <p className="ButtonText0_f" onClick={handleBoard}>
                    자유 게시판
                  </p>
                </div>
                <div className="F10000043532_f">
                  <p className="ButtonText1_f" onClick={handleQuest}>
                    질문 게시판
                  </p>
                </div>
                <div className="F1000004354_f">
                  <p className="ButtonText2_f" onClick={handleQuest}>
                    질문 게시판
                  </p>
                </div>
              </div>
              <div className="F1000004351_f">
                <div className="F1000004340_f">
                  <div className="F1000004338_f">
                    <div className="F1000004333_f">
                      <div className="No_f">No</div>
                    </div>
                    <div className="F1000004337_f">
                      <div className="Title_f">제목</div>
                    </div>
                    <div className="F1000004334_f">
                      <div className="Writer_f">글쓴이</div>
                    </div>
                    <div className="F1000004335_f">
                      <div className="Tiem_f">작성시간</div>
                    </div>
                    <div className="F1000004336_f">
                      <div className="Views_f">조회수</div>
                    </div>
                  </div>
                  {/* <div className="F1000004339_f"> */}
                  {posts.map((post) => (
                    <TableRow post={post} />
                  ))}
                  {/* </div> */}
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
