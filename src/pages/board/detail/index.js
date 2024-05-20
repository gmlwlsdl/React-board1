import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaEllipsisV } from 'react-icons/fa';
import './index.css';

const formatData = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const BoardDetail = () => {
  const { num } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // loading 상태 추가
  const [error, setError] = useState(null); // error 상태 추가
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/post/${num}`);
        const responseTag = await fetch(
          `http://localhost:3001/api/post/${num}/tags`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPost(data);
        if (!responseTag.ok) {
          throw new Error('Network response was not ok');
        }
        const dataTag = await responseTag.json();
        setTags(dataTag);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [num]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <div className="parent">
        <div className="F1000004037">
          <div className="F1000004369">
            <div className="F1000004361">
              <div className="F1000004368">
                <div className="F1000004357">
                  <div className="chevron">
                    <FaChevronLeft
                      className="Vector"
                      onClick={() => navigate('/')}
                    />
                  </div>
                  <p className="Posttitle">{post.title}</p>
                </div>
                <div className="F816639">
                  <p className="writer_d">{post.writer}</p>
                  <p className="Vector119_d"></p>
                  <p className="time_d">{formatData(post.created_at)}</p>
                  <p className="Vector120_d"></p>
                  <p className="views_d">{post.views}</p>
                </div>
                <div></div>
              </div>
              <div className="contents">{post.contents}</div>
              <div className="F1000004372">
                <p className="UploadFile_d">첨부된 파일</p>
                <p className="FileName_d">파일이름.pdf</p>
              </div>
              <div className="F1000004359">
                {tags.map((tag, index) => (
                  <div key={index} className="F1000004353">
                    <p className="tag_d">#{tag.name}</p>
                  </div>
                ))}
              </div>
              <div className="F1000004363">
                <input type="text" className="Rectangle474_d" />
                <div className="F1000004325">
                  <div className="contents2_d">
                    <p className="replyBtn_d">댓글작성</p>
                  </div>
                </div>
                <div className="vector121_d"></div>
              </div>
              <br></br>
              <div className="F1000004366_d">
                <div className="F1000004371_d">
                  <p className="replyWriter_d">댓글작성자</p>
                  <div className="EllipsisIcon_d">
                    <FaEllipsisV className="EllipVector_d" />
                  </div>
                </div>
                <p className="replyContent_d">댓글내용</p>
                <p className="replyTime_d">댓글작성시간</p>
              </div>
              <p className="vector122_d"></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
