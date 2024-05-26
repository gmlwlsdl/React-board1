import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaCircleExclamation } from 'react-icons/fa6';
import Checkbox from './Checkbox';
import '../../../css/globalCss.css';
import './index.css';
import { color } from 'd3';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [re_pw, setRePw] = useState('');
  const [nickname, setName] = useState('');
  const [agree, setAgree] = useState(false);
  const [showPW1, setshowPW1] = useState(false);
  const [showPW2, setshowPW2] = useState(false);

  const [validEmail, setValidEmail] = useState('');
  const [validPW, setValidPW] = useState('');
  const [validRePW, setValidRePW] = useState('');
  const navigate = useNavigate();

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx =
    /^(?=.*[A-Za-z])(?=.*[0-9]|.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

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

  const passwordDoubleCheck = (password, passwordChk) => {
    if (password !== passwordChk) {
      setValidRePW('비밀번호가 일치하지 않습니다.');
      return false;
    } else {
      setValidRePW('');
      return true;
    }
  };

  const SigninSubmit = async (event) => {
    event.preventDefault();

    if (!email || !pw || !nickname) {
      if (!email) setValidEmail('이메일을 입력해주세요.');
      if (!pw) setValidPW('비밀번호를 입력해주세요.');
      if (!nickname) setValidRePW('닉네임을 입력해주세요.');
      return;
    } else if (!emailCheck(email)) {
      return;
    } else if (!passwordCheck(pw)) {
      return;
    } else if (!passwordDoubleCheck(pw, re_pw)) {
      return;
    } else if (!agree) {
      alert('개인정보 처리방침 및 데이터 활용 동의에 체크해주세요.');
      return;
    } else {
      try {
        const res = await fetch('/.netlify/functions/Signin', {
          method: 'POST',
          body: JSON.stringify({
            userEmail: email,
            userPW: pw,
            nickname: nickname,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        alert(data.message);

        if (res.status === 200) {
          navigate('/Done');
        } else {
          alert(data.error);
          setEmail('');
          setPw('');
          setRePw('');
          setName('');
          return;
        }
      } catch (err) {
        console.error(err);
        alert('클라이언트 측 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    }
  };

  const ShowPW1 = () => {
    setshowPW1(!showPW1);
  };

  const ShowPW2 = () => {
    setshowPW2(!showPW2);
  };

  return (
    <div className="signin_s" style={{ height: '1129px' }}>
      <div className="F1000004037_s">
        <div className="F1000004036_s">
          <div className="F1000003413_s">
            <div className="login_s">회원가입</div>
            <div className="F1000004257_s">
              <div className="F1000003410_s">
                <div className="F1000004256_s">
                  <p className="id_s">이메일</p>
                </div>
                <div className="input_s">
                  <div className="autoField_s">
                    <div className="autoIcon_s">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          emailCheck(e.target.value);
                        }}
                        className="placeholder_s"
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
              </div>

              <div className="F1000004267_s">
                <div className="F1000004255_s">
                  <p className="pw_s">비밀번호</p>
                </div>
                <div className="input1_s">
                  <div className="autoField1_s">
                    <div className="autoIcon1_s">
                      <input
                        type={showPW1 ? 'text' : 'password'}
                        value={pw}
                        onChange={(e) => {
                          setPw(e.target.value);
                          passwordCheck(e.target.value);
                        }}
                        placeholder="8자 이상, 영문자, 숫자, 특수기호 중 2가지 조합"
                        className="placeholder1_s"
                        style={{ border: 'none' }}
                      />
                      <button className="eye_s" onClick={ShowPW1}>
                        <FaEye className="vector_s" />
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
                <div className="input2_s">
                  <div className="autoField2_s">
                    <div className="autoIcon2_s">
                      <input
                        type={showPW2 ? 'text' : 'password'}
                        value={re_pw}
                        onChange={(e) => {
                          setRePw(e.target.value);
                          passwordDoubleCheck(pw, e.target.value);
                        }}
                        placeholder="비밀번호를 다시 입력해주세요"
                        className="placeholder2_s"
                        style={{ border: 'none' }}
                      />
                      <button className="eye2_s" onClick={ShowPW2}>
                        <FaEye className="vector2_s" />
                      </button>
                    </div>
                  </div>
                  {validRePW && (
                    <div className="Aeets1_s">
                      <div className="Frame467_s">
                        <div className="ErrIcon_s">
                          <FaCircleExclamation
                            className="Vector3_s"
                            style={{ color: '#ec2c38' }}
                          />
                        </div>
                      </div>
                      <p className="errorMessage">{validRePW}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="F1000004268_s">
                <div className="F1000004255_s">
                  <p className="nickname_s">닉네임</p>
                </div>
                <div className="input3_l">
                  <div className="autoField3_l">
                    <div className="autoIcon3_l">
                      <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setName(e.target.value)}
                        className="placeholder3_l"
                        style={{ border: 'none' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="F1000004266_s">
                <div className="Frame816884_s">
                  <div className="Component5_s">
                    <Checkbox
                      checked={agree}
                      onChange={(checked) => setAgree(checked)}
                    />
                  </div>
                  <p className="agree_s">
                    개인정보 처리방침 동의 / 데이터 활용 동의
                  </p>
                  <div className="agree1_s">
                    <p className="agree2_s">(필수)</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="F1000004325_s" onClick={SigninSubmit}>
              <div className="Content_s">
                <p className="ButtonText_s">회원가입</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
