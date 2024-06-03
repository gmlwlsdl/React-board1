import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircleExclamation } from 'react-icons/fa6';
import '../../../css/globalCss.css';
import './index.css';

const FindID = () => {
  const [nickname, setName] = useState('');
  const [validName, setValidName] = useState('');
  const [email, setEmail] = useState('');

  const [hover, setIsHovering] = useState(false);

  const navigate = useNavigate();

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const findSubmit = async (event) => {
    event.preventDefault(); // 기본 동작 방지

    if (nickname === '') {
      alert('닉네임을 입력해주세요');
      return;
    }

    try {
      const res = await fetch('/.netlify/functions/loginCheck', {
        method: 'POST',
        body: JSON.stringify({ nickname: nickname }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      alert(data.message);

      if (res.status === 200) {
        if (data.email) {
          setEmail(data.email);
          setValidName('존재하는 아이디');
        } else {
          console.error('Data 객체에 필요한 속성이 없습니다.');
        }
      } else {
        setName('');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const moveSignin = () => {
    navigate('/Signin');
  };

  const moveLogin = () => {
    navigate('/Login');
  };

  const findPW = () => {
    navigate('/findPW');
  };

  return (
    <div>
      <div className="parent_fID">
        <div className="F1000004037_fID">
          <div className="F1000004036_fID">
            <div className="F1000003250_fID">
              <div className="F1000003769_fID">
                <div className="login_fID">아이디 찾기</div>
                <div className="Frame37314_fID">
                  <div className="F1000003648_fID">
                    <div className="F1000003641_fID">
                      <div className="input_fID">
                        <div className="autoField_fID">
                          <div className="autoIcon_fID">
                            <input
                              type="text"
                              value={nickname}
                              placeholder="닉네임 입력"
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                              className="placeholder_fID"
                              style={{ border: 'none' }}
                            />
                          </div>
                        </div>

                        <div className="input2_fID">
                          <div className="autoField2_fID">
                            <div className="autoIcon2_fID">
                              <p
                              // type={email ? 'text' : 'password'}
                              // value={email}
                              // placeholder="비밀번호 입력"
                              // className="placeholder2_fID"
                              >
                                {email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      className={hover ? 'color' : 'button_fID'}
                      onClick={findSubmit}
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                    >
                      <div className="content_fID">
                        <p className="buttonText_fID">아이디 찾기</p>
                      </div>
                    </button>
                  </div>
                  <div className="Frame195_fID">
                    <button className="findID_fID" onClick={moveLogin}>
                      로그인
                    </button>
                    <div className="Line3_fID"></div>
                    <button className="findPW_fID" onClick={findPW}>
                      비밀번호 찾기
                    </button>
                    <div className="Line4_fID"></div>
                    <button className="Signin_fID" onClick={moveSignin}>
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

export default FindID;
