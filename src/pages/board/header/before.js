import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../../../css/globalCss.css';
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

  return (
    <div className="NavBar">
      <div className="Menu0">
        <div className="Menu1">
          <div className="Menu2">
            <Link
              to={'/board'}
              style={{
                color: '#EE3918',
                fontWeight: 700,
                fontSize: '24px',
                marginRight: '20px',
              }}
            >
              Testsite
            </Link>
            <div className="Menu3">
              <div className="child1">
                <Link
                  to={'/board'}
                  style={{
                    width: '47px',
                    height: '24px',
                  }}
                >
                  게시판
                </Link>
              </div>
              <div className="child2">
                <Link
                  to={'/dashboard'}
                  style={{
                    width: '62px',
                    height: '24px',
                  }}
                >
                  대시보드
                </Link>
              </div>
            </div>
          </div>
          {sessionName ? (
            <div className="logout">
              {sessionName} 님
              <Button onClick={handleLogout} variant="outline-dark" size="sm">
                로그아웃
              </Button>
            </div>
          ) : (
            <div className="loginMenu">
              <button onClick={handleLogin} variant="outline-dark" size="sm">
                로그인
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
