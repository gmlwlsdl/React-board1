import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
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
      const res = await fetch('/.netlify/functions/loginCheck', {
        method: 'POST',
        body: JSON.stringify({ userEmail: email, userPW: pw }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      alert(data.message);

      if (res.status === 200) {
        if (data.userEmail && data.nickname) {
          sessionStorage.setItem('email', data.userEmail);
          sessionStorage.setItem('nickname', data.nickname);
          sessionStorage.setItem('login', '1');
          navigate('/');
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
      <div className="parent_l">
        <div className="F1000004037_l">
          <div className="F1000004036_l">
            <div className="F1000003250_l">
              <div className="F1000003769_l">
                <div className="login_l">로그인</div>
                <div className="Frame37314_l">
                  <div className="F1000003648_l">
                    <div className="F1000003641_l">
                      <div className="input_l">
                        <div className="autoField_l">
                          <div className="autoIcon_l">
                            <input
                              type="text"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="이메일 주소"
                              className="placeholder_l"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="input2_l">
                        <div className="autoField2_l">
                          <div className="autoIcon2_l">
                            <input
                              type="password"
                              value={pw}
                              onChange={(e) => setPw(e.target.value)}
                              placeholder="비밀번호 입력"
                              className="placeholder2_l"
                            />
                            <div className="eye_l">
                              <FaEye className="vector_1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="button_l" onClick={loginSubmit}>
                      <div className="content_l">
                        <p className="buttonText_l">로그인</p>
                      </div>
                    </button>
                  </div>
                  <div className="Frame195_l">
                    <p className="findID_l">아이디 찾기</p>
                    <div className="Line3_l"></div>
                    <p className="findPW_l">비밀번호 찾기</p>
                    <div className="Line4_l"></div>
                    <p className="Signin_l" onClick={moveSignin}>
                      회원가입
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
