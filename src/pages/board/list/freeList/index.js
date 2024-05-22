import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import '../../../../css/globalCss.css';
import './index.css';
import TableRow from './TableRow';

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    // 서버로부터 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      const response = await fetch('/.netlify/functions/getPost');
      const result = await response.json();
      setPosts(result);
      // try {
      //   const response = await fetch('http://localhost:3001/api/getPost');
      //   const data = await response.json();
      //   setPosts(data);
      // } catch (error) {
      //   console.error('Error fetching data:', error);
      // }
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
    Navigate('/create');
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
                      <p className="Title_f">제목</p>
                    </div>
                    <div className="F1000004334_f">
                      <p className="Writer_f">글쓴이</p>
                    </div>
                    <div className="F1000004335_f">
                      <p className="Tiem_f">작성시간</p>
                    </div>
                    <div className="F1000004336_f">
                      <p className="Views_f">조회수</p>
                    </div>
                  </div>
                  {/* <div className="F1000004339_f"> */}
                  {posts.map((post, index) => (
                    <TableRow key={index} post={post} />
                  ))}
                  {/* {posts.map((post) => (
                    <TableRow post={post} />
                  ))} */}
                  {/* </div> */}
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
                  <div className="F1000004325_f">
                    <div className="Content2_f" onClick={write}>
                      <p className="ButtonText3_f">글쓰기</p>
                    </div>
                  </div>
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
