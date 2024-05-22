import React from 'react';
import './index.css';

const WritePost = () => {
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
                      placeholder="첨부파일.pdf"
                      className="writeFile_w"
                    />
                  </div>
                </div>
                <div className="F1000004366_w">
                  <p className="tag_w">해시태그</p>
                  <div className="F1000004354_w">
                    <input
                      type="text"
                      placeholder="해시태그"
                      className="writeTag_w"
                    />
                  </div>
                </div>
              </div>
              <div className="F1000004326_w">
                <div className="Content2_w">
                  <p className="writeBtn_w">게시글 작성</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePost;
