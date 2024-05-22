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
          <div className="Content3_n">
            {sessionName ? (
              <div className="logout_n">
                {sessionName} 님
                <p className="ButtonText3_n" onClick={handleLogout}>
                  로그아웃
                </p>
              </div>
            ) : (
              <p className="ButtonText3_n" onClick={handleLogin}>
                로그인
              </p>
            )}
          </div>
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
