import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa6';
import '../../../css/globalCss.css';
import './done.css';

const SigninDone = () => {
  const Navigate = useNavigate();

  const gotoLogin = () => {
    Navigate('/Login');
  };

  return (
    <div className="parent_done">
      <div className="F1000004037_done">
        <div className="F1000004356_done">
          <div className="F1000004327_done">
            <div className="F1000003256_done">
              <div className="Check_done">
                <FaCheck className="Vector_done" />
              </div>
              <div className="Ellipse8_done"></div>
            </div>
            <p className="msg1_done">회원가입이 완료되었습니다.</p>
            <p className="msg2_done">축하드려요!</p>
          </div>
          <div className="F1000004353_done">
            <button className="F1000004325_done">
              <div className="Content1_done" onClick={gotoLogin}>
                <p className="btnText_done">로그인</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninDone;
