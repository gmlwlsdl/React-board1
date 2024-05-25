import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import Checkbox from './Checkbox';
import '../../../css/globalCss.css';
import './index.css';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [re_pw, setRePw] = useState('');
  const [nickname, setName] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const SigninSubmit = async (event) => {
    event.preventDefault();

    if (email === '' || pw === '') {
      alert('아이디 또는 비밀번호를 입력해주시기 바랍니다');
      return;
    } else if (pw !== re_pw) {
      alert('비밀번호가 일치하지 않습니다.');
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
          // credentials: 'include',
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
          return;
        }
      } catch (err) {
        console.error(err);
        alert('클라이언트 측 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      }
    }
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
                <div className="input_l">
                  <div className="autoField_l">
                    <div className="autoIcon_l">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="placeholder_l"
                        style={{ border: 'none' }}
                      />
                    </div>
                  </div>
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
                        type="password"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        placeholder="8자 이상, 영문자, 숫자, 특수기호 중 2가지 조합"
                        className="placeholder1_s"
                        style={{ border: 'none' }}
                      />
                      <div className="eye_s">
                        <FaEye className="vector_s" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="input2_s">
                  <div className="autoField2_s">
                    <div className="autoIcon2_s">
                      <input
                        type="password"
                        value={re_pw}
                        onChange={(e) => setRePw(e.target.value)}
                        placeholder="비밀번호를 다시 입력해주세요"
                        className="placeholder2_s"
                        style={{ border: 'none' }}
                      />
                      <div className="eye2_s">
                        <FaEye className="vector2_s" />
                      </div>
                    </div>
                  </div>
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
                    {/* <FaCheck className="Vector2_s" />
                    <div className="Group193_s">
                      <div className="Rectangle197_s"></div>
                    </div> */}
                  </div>
                  <p className="agree_s">
                    개인정보 처리방침 동의 / 데이터 활용 동의
                  </p>
                  <div className="agree1_s">
                    <p className="agree2_s">(필수)</p>
                  </div>
                  {/* </Checkbox> */}
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
