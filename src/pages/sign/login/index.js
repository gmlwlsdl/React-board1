import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaCircleExclamation } from 'react-icons/fa6';
import '../../../css/globalCss.css';
import './index.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [hover, setIsHovering] = useState(false);
  const [showPW, setshowPW] = useState(false);

  const [validEmail, setValidEmail] = useState('');
  const [validPW, setValidPW] = useState('');

  const navigate = useNavigate();

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*[0-9]|.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const ShowPW = () => {
    showPW ? setshowPW(false) : setshowPW(true);
  };

  const emailCheck = (username) => {
    if (!emailRegEx.test(username)) {
      setValidEmail('올바르지 않은 이메일 형식입니다.');
      return false;
    } else {
      setValidEmail('');
      return true;
    }
  };

  const passwordCheck = (password) => {
    if (password.match(passwordRegEx) === null) {
      setValidPW('올바르지 않은 비밀번호 형식입니다.');
      return false;
    } else {
      setValidPW('');
      return true;
    }
  };

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

  const findID = () => {
    navigate('/findID');
  };

  const findPW = () => {
    navigate('/findPW');
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
                              placeholder="이메일 입력"
                              onChange={(e) => {
                                setEmail(e.target.value);
                                emailCheck(e.target.value);
                              }}
                              className="placeholder_l"
                              style={{ border: 'none' }}
                            />
                          </div>
                        </div>
                        {validEmail && (
                          <div className="Aeets1_s">
                            <div className="Frame467_s">
                              <div className="ErrIcon_s">
                                <FaCircleExclamation
                                  className="Vector3_s"
                                  style={{ color: '#ec2c38' }}
                                />
                              </div>
                            </div>
                            <p className="errorMessage">{validEmail}</p>
                          </div>
                        )}
                      </div>
                      <div className="input2_l">
                        <div className="autoField2_l">
                          <div className="autoIcon2_l">
                            <input
                              type={showPW ? 'text' : 'password'}
                              value={pw}
                              onChange={(e) => {
                                setPw(e.target.value);
                                passwordCheck(e.target.value);
                              }}
                              placeholder="비밀번호 입력"
                              className="placeholder2_l"
                              style={{ border: 'none' }}
                            />
                            <button className="eye_l" onClick={ShowPW}>
                              <FaEye className="vector_1" />
                            </button>
                          </div>
                        </div>
                        {validPW && (
                          <div className="Aeets1_s">
                            <div className="Frame467_s">
                              <div className="ErrIcon_s">
                                <FaCircleExclamation
                                  className="Vector3_s"
                                  style={{ color: '#ec2c38' }}
                                />
                              </div>
                            </div>
                            <p className="errorMessage">{validPW}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      className={hover ? 'color' : 'button_l'}
                      onClick={loginSubmit}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <div className="content_l">
                        <p className="buttonText_l">로그인</p>
                      </div>
                    </button>
                  </div>
                  <div className="Frame195_l">
                    <button className="findID_l" onClick={findID}>
                      아이디 찾기
                    </button>
                    <div className="Line3_l"></div>
                    <button className="findPW_l" onClick={findPW}>
                      비밀번호 찾기
                    </button>
                    <div className="Line4_l"></div>
                    <button className="Signin_l" onClick={moveSignin}>
                      회원가입
                    </button>
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
