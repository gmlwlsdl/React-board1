import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../css/globalCss.css';
import './index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const navigate = useNavigate();

  const loginSubmit = async (event) => {
    event.preventDefault(); // 기본 동작 방지

    if (email === '' || pw === '') {
      alert('이메일 또는 비밀번호를 입력해주세요');
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/loginCheck', {
        method: 'POST',
        body: JSON.stringify({ userEmail: email, userPW: pw }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      alert(data.message);

      if (res.status === 200) {
        if (data.userEmail && data.userPW && data.nickname) {
          sessionStorage.setItem('email', data.userEmail);
          sessionStorage.setItem('pw', data.userPW);
          sessionStorage.setItem('nickname', data.nickname);
          sessionStorage.setItem('login', '1');
          navigate('/board');
          window.location.reload('/Nav');
        } else {
          console.error('Data 객체에 필요한 속성이 없습니다.');
        }
      } else {
        setEmail('');
        setPw('');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const moveSignin = () => {
    navigate('/Signin');
  };

  return (
    <div>
      <div>
        <form onSubmit={loginSubmit}>
          <div className="parent">
            <div className="login">로그인</div>
            <div>
              <div>
                <textarea
                  name="email"
                  id="email"
                  placeholder="이메일 주소"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></textarea>
              </div>
              <div>
                <textarea
                  name="pw"
                  id="pw"
                  placeholder="비밀번호 입력"
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div>
              <button className="logbtn" type="submit">
                로그인
              </button>
            </div>
            <div className="bottom">
              <p>아이디 찾기 </p>
              <p> | </p>
              <p>비밀번호 찾기 </p>
              <p> | </p>
              <p onClick={moveSignin}>회원가입</p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
