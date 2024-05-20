import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import './index.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const BoardDetail = () => {
  const { num } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]); // 태그 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await fetch(
          `http://localhost:3001/api/post/${num}`,
        );
        if (!postResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const postData = await postResponse.json();
        setPost(postData);

        const tagResponse = await fetch(
          `http://localhost:3001/api/post/${num}/tags`,
        );
        if (!tagResponse.ok) {
          throw new Error('Network response was not ok (tags)');
        }
        const tagData = await tagResponse.json();
        setTags(tagData);
      } catch (error) {
        console.error('Error fetching post or tags:', error);
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
        <div className="container">
          <div className="header">
            <div className="header-left">
              <button onClick={() => navigate.goBack()} className="chevron">
                <FaChevronLeft className="vector" />
              </button>
              <p className="post-title">{post.title}</p>
            </div>
            <div className="post-details">
              <p className="writer">{post.writer}</p>
              <span className="separator"></span>
              <p className="time">{formatDate(post.created_at)}</p>
              <span className="separator"></span>
              <p className="views">{post.views}</p>
            </div>
          </div>
          <div className="contents">{post.contents}</div>
          <div className="attachments">첨부 파일</div>
          <div className="hashtags">
            {tags.map((tag, index) => (
              <div key={index} className="hashtag">
                #{tag.name}
              </div>
            ))}
          </div>
          <div className="comment-section">
            <div className="comment-button">댓글작성버튼</div>
          </div>
          <div className="comments">
            <div className="comment">닉네임, 댓글 내용, 작성시간</div>
            <div className="comment">닉네임, 댓글 내용, 작성시간</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetail;
