import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [file, setFile] = useState('');
  const [tag, setTag] = useState('');
  const [writer, setWriter] = useState('');
  const navigate = useNavigate();

  const uploadPost = async (event) => {
    event.preventDefault();
    const sessionName = window.sessionStorage.getItem('nickname');
    setWriter(sessionName);
    console.log(writer);

    try {
      const res = await fetch('/.netlify/functions/writePost', {
        method: 'POST',
        body: JSON.stringify({ title, contents, writer, file, tag }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      alert(data.message);

      if (res.status === 200) {
        setTitle('');
        setContents('');
        setWriter('');
        setFile('');
        setTag('');
        navigate('/');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <div className="parent_w">
        <div className="F1000004037_w">
          <div className="F1000004376_w">
            <div className="F1000004374_w">
              <p className="write_post">게시글 작성</p>
              <div className="F1000004375_w">
                <div className="F1000004363_w">
                  <p className="title_w">제목</p>
                  <div className="F1000004354_w">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="게시글 제목"
                      className="writeTitle_w"
                    />
                  </div>
                </div>
                <div className="F1000004364_w">
                  <p className="contents_w">내용</p>
                  <div className="F1000004354_w" style={{ height: '320px' }}>
                    <input
                      type="text"
                      value={contents}
                      onChange={(e) => setContents(e.target.value)}
                      placeholder="게시글 내용"
                      className="writeContents_w"
                    />
                  </div>
                </div>
                <div className="F1000004365_w">
                  <p className="file_w">파일 첨부</p>
                  <div className="F1000004354_w">
                    <input
                      type="text"
                      value={file}
                      onChange={(e) => setFile(e.target.value)}
                      placeholder="ex)첨부파일.pdf"
                      className="writeFile_w"
                    />
                  </div>
                </div>
                <div className="F1000004366_w">
                  <p className="tag_w">해시태그</p>
                  <div className="F1000004354_w">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => setTag(e.target.value)}
                      placeholder="ex)#유머, #유익함, #토론, #DB, #AI"
                      className="writeTag_w"
                    />
                  </div>
                </div>
              </div>
              <button className="F1000004326_w">
                <div className="Content2_w" onClick={uploadPost}>
                  <p className="writeBtn_w">게시글 작성</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
