import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaEllipsisV } from 'react-icons/fa';
import './index.css';
import ModalComponent from './ModalComponent';
import PostModalComponent from './PostModalComponent';
import { Dropdown } from 'react-bootstrap';

const formatData = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const fetchPost = async (num) => {
  try {
    const response = await fetch(`/.netlify/functions/getPostD?num=${num}`);
    if (!response.ok) {
      throw new Error('Post not found');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

const fetchTags = async (num) => {
  try {
    const response = await fetch(`/.netlify/functions/getPostT?num=${num}`);
    if (!response.ok) {
      throw new Error('Tags not found');
    }
    const data = await response.json();
    return data.tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

const fetchReply = async (num) => {
  try {
    const response = await fetch(`/.netlify/functions/getPostR?num=${num}`);
    if (!response.ok) {
      throw new Error('댓글 없음');
    }
    const data = await response.json();
    return data.replies;
  } catch (error) {
    console.error('Error fetching replies:', error);
    throw error;
  }
};

const BoardDetail = () => {
  const { num } = useParams();
  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState('');
  const [writer, setWriter] = useState('');
  const [showModal, setShowModal] = useState(false); // 모달 상태
  const [showPostModal, setShowPostModal] = useState(false); // 모달 상태
  const [replyToDelete, setReplyToDelete] = useState(null); // 삭제할 댓글 ID
  const [postNumToDelete, setPostNumToDelete] = useState(null);
  const [postWriterToDelete, setPostWriterToDelete] = useState(null);
  const [dropdownStates, setDropdownStates] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      const sessionName = window.sessionStorage.getItem('nickname');
      if (sessionName) {
        setWriter(sessionName);
      }
      try {
        const postData = await fetchPost(num);
        setPost(postData);

        const tagData = await fetchTags(num);
        setTags(tagData.split(',').map((tag) => tag.trim()));

        const replyData = await fetchReply(num);
        setReplies(replyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPostData();
  }, [num]);

  const writeReply = async () => {
    if (replyContent.trim() === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/writeReply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_num: num,
          contents: replyContent,
          writer: writer,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to write reply');
      }

      const result = await response.json();
      console.log('Reply written successfully:', result);
      alert('댓글 작성 완료, 새로고침을 해주세요');
      setReplyContent('');
    } catch (error) {
      console.error('Error writing reply:', error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    }
  };

  const deleteReply = async (replyID) => {
    try {
      const response = await fetch('/.netlify/functions/deleteReply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          replyId: replyID,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete reply');
      }

      const result = await response.json();
      console.log('Reply deleted successfully:', result);
      // 댓글 삭제 후 상태 업데이트
      setReplies(replies.filter((reply) => reply.replyID !== replyID));
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  const deletePost = async (postNum, postWriter) => {
    try {
      const response = await fetch('/.netlify/functions/deletePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          num: postNum,
          writer: postWriter,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete reply');
      }

      const result = await response.json();
      console.log('Reply deleted successfully:', result);
      // 댓글 삭제 후 상태 업데이트
      navigate('/');
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    }
  };

  const toggleDropdown = (replyID) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [replyID]: !prevStates[replyID],
    }));
  };

  const posttoggleDropdown = (postWriter) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [postWriter]: !prevStates[postWriter],
    }));
  };

  const openModal = (replyID, replyWriter) => {
    console.log(writer);
    if (writer !== replyWriter) {
      alert('댓글 작성자만 관리할 수 있습니다.');
      handleCloseModal();
      return;
    }
    setReplyToDelete(replyID);
    setShowModal(true);
  };

  const openPostModal = (postNum, postWriter) => {
    console.log(writer);
    if (writer !== postWriter) {
      alert('게시글 작성자만 관리할 수 있습니다.');
      handleClosePostModal();
      return;
    }
    setPostNumToDelete(postNum);
    setPostWriterToDelete(postWriter);
    setShowPostModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReplyToDelete(null);
    navigate(`/post/${num}`);
  };

  const handleClosePostModal = () => {
    setShowPostModal(false);
    setPostNumToDelete(null);
    setPostWriterToDelete(null);
    navigate(`/`);
  };

  const handleConfirmDelete = async () => {
    await deleteReply(replyToDelete);
    handleCloseModal();
  };

  const handleConfirmPostDelete = async () => {
    await deletePost(postNumToDelete, postWriterToDelete);
    handleClosePostModal();
  };

  if (!post) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <div className="parent">
        <div className="F1000004037">
          <div className="F1000004369">
            <div className="F1000004361">
              <div className="F1000004368">
                <div className="F1000004370">
                  <div className="F1000004357">
                    <div className="chevron">
                      <FaChevronLeft
                        className="Vector"
                        onClick={() => navigate('/')}
                      />
                    </div>
                    <p className="Posttitle">{post.title}</p>
                  </div>
                  <div className="CllipsisIcon0_d">
                    <FaEllipsisV
                      className="Vector0_d"
                      onClick={() => posttoggleDropdown(post.num)}
                    />
                    {dropdownStates[post.num] && (
                      <Dropdown className="dropdownMenu">
                        {
                          <>
                            <div className="Assets1_drop">
                              <div className="item1_drop">
                                <p className="option1">수정</p>
                              </div>
                            </div>
                            <div className="Assets2_drop">
                              <div
                                className="item2_drop"
                                onClick={() =>
                                  openPostModal(post.num, post.writer)
                                }
                              >
                                <p className="option2">삭제</p>
                              </div>
                            </div>
                          </>
                        }
                      </Dropdown>
                    )}
                  </div>
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
                <p className="FileName_d">{post.file}</p>
              </div>
              <div className="F1000004359">
                {tags.map((tag, index) => (
                  <div key={index} className="F1000004353">
                    <p className="tag_d">{tag}</p>
                  </div>
                ))}
              </div>
              <div className="F1000004363">
                <input
                  type="text"
                  id="contents"
                  className="Rectangle474_d"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <div className="F1000004325">
                  <div className="contents2_d" onClick={writeReply}>
                    <p className="replyBtn_d">댓글작성</p>
                  </div>
                </div>
              </div>
              <br />
              {replies.map((reply, index) => (
                <div key={index} className="F1000004366_d">
                  <p className="vector122_d"></p>
                  <div className="F1000004371_d">
                    <p className="replyWriter_d">{reply.writer}</p>
                    <div className="EllipsisIcon_d">
                      <FaEllipsisV
                        className="EllipVector_d"
                        onClick={() => toggleDropdown(reply.replyID)}
                      />
                      {dropdownStates[reply.replyID] && (
                        <Dropdown className="dropdownMenu">
                          {
                            <>
                              <div className="Assets1_drop">
                                <div className="item1_drop">
                                  <p className="option1">수정</p>
                                </div>
                              </div>
                              <div className="Assets2_drop">
                                <div
                                  className="item2_drop"
                                  onClick={() =>
                                    openModal(reply.replyID, reply.writer)
                                  }
                                >
                                  <p className="option2">삭제</p>
                                </div>
                              </div>
                            </>
                          }
                        </Dropdown>
                      )}
                    </div>
                  </div>
                  <p className="replyContent_d">{reply.contents}</p>
                  <p className="replyTime_d">{formatData(reply.created_at)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PostModalComponent
        show={showPostModal}
        handleClose={handleClosePostModal}
        handleConfirm={handleConfirmPostDelete}
      />
      <ModalComponent
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default BoardDetail;
