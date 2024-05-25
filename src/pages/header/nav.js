import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './nav.css';

function Nav() {
  const [sessionName, setSessionName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const sessionName = window.sessionStorage.getItem('nickname');

    if (sessionName) {
      setSessionName(sessionName);
    }
  }, []);

  const handleLogout = () => {
    // 세션 정보 삭제
    window.sessionStorage.removeItem('email');
    window.sessionStorage.removeItem('pw');
    window.sessionStorage.removeItem('nickname');
    window.sessionStorage.removeItem('login');

    navigate('/board');
    window.location.reload();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleBoard = () => {
    navigate('/');
  };

  const handleDash = () => {
    navigate('/dash');
  };

  return (
    <div>
      <div className="gnb_n">
        <div className="F1000004324_n">
          {sessionName ? (
            <button className="Content3_n" onClick={handleLogout}>
              <div style={{ width: '70px', height: '24px' }}>
                <p className="ButtonText3_n">로그아웃</p>
              </div>
            </button>
          ) : (
            <button className="Content3_n" onClick={handleLogin}>
              <div style={{ width: '70px', height: '24px' }}>
                <p className="ButtonText3_n">로그인</p>
              </div>
            </button>
          )}
        </div>
        <div className="F1000003051_n">
          <p className="Testsite_n">Testsite</p>
          <div className="F1000003053_n">
            <div className="GNB_Button_n">
              <div className="Content_n">
                <p className="ButtonText_n" onClick={handleBoard}>
                  게시판
                </p>
              </div>
            </div>
            <div className="GNB_Button2_n">
              <div className="Content2_n">
                <p className="ButtonText2_n" onClick={handleDash}>
                  대시보드
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
