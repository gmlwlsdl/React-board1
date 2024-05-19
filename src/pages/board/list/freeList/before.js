import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../../../css/globalCss.css';
import './before.css';
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

  return (
    <div className="parent" style={{ margin: '100px, 388px, 100px, 388px' }}>
      <div style={{ fontWeight: '700' }}>
        <p style={{ color: '#EE3918', fontSize: '20px' }}>board</p>
        <p style={{ color: '#040404', fontSize: '32px' }}>자유게시판</p>
      </div>

      <div className="tableContainer">
        <div className="tableCss">
          <table>
            <colgroup>
              <col width={'5%'} />
              <col width={'50%'} />
              <col width={'15%'} />
              <col width={'15%'} />
              <col width={'15%'} />
            </colgroup>

            <thead>
              <tr>
                <th>No</th>
                <th>제목</th>
                <th>글쓴이</th>
                <th>작성시간</th>
                <th>조회수</th>
              </tr>
            </thead>

            <tbody>
              {posts.map((post) => (
                <TableRow post={post} />
              ))}
            </tbody>
          </table>
          <p>페이지 넘기기</p>
        </div>
      </div>

      <div>
        <Link to="/list/create">
          <Button children="Write" variant="primary" />
        </Link>
      </div>
    </div>
  );
};

export default BoardList;
