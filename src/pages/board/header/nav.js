import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
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
    navigate('/board');
  };

  const handleDash = () => {
    navigate('/dash');
  };

  return (
    <div>
      <div className="gnb">
        <div className="F1000004324">
          <div className="Content3">
            {sessionName ? (
              <div className="logout">
                {sessionName} 님
                <p className="ButtonText3" onClick={handleLogout}>
                  로그아웃
                </p>
              </div>
            ) : (
              <p className="ButtonText3" onClick={handleLogin}>
                로그인
              </p>
            )}
          </div>
        </div>
        <div className="F1000003051">
          <p className="Testsite">Testsite</p>
          <div className="F1000003053">
            <div className="GNB_Button">
              <div className="Content">
                <p className="ButtonText" onClick={handleBoard}>
                  게시판
                </p>
              </div>
            </div>
            <div className="GNB_Button2">
              <div className="Content2">
                <p className="ButtonText2" onClick={handleDash}>
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
