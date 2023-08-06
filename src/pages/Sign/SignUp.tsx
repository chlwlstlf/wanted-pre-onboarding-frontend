import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sign.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [emailOK, setEmailOK] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordOK, setPasswordOK] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  function onClickSave(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    setSignUp(true);
    if (!emailOK || !passwordOK) {
      console.log("fail");
    } else {
      postData(email, password);
    }
  }

  async function postData(email: string, password: string) {
    try {
      navigate("/signin");
      const response = await axios.post(
        process.env.REACT_APP_DB_HOST + `/auth/signup`,
        JSON.stringify({
          email: email,
          password: password,
        }),
        { headers }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  }

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailOK(e.target.value.includes("@"));
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordOK(e.target.value.length >= 8);
  };

  return (
    <div className="sign">
      <div className="title">
        <h1 style={{ fontSize: "18px" }}>회원가입</h1>
      </div>

      <div className="sign-warp">
        <div className="sign-items">
          <div className="sign-text">
            <span className={`text-bar ${!signUp ? "" : emailOK ? "success" : "fail"}`}>이메일</span>
          </div>
          <div className={`sign-content ${!signUp ? "" : emailOK ? "success" : "fail"}`}>
            <input
              data-testid="email-input"
              className="textinput"
              type="email"
              placeholder="email 형식"
              onChange={onChangeEmail}
              value={email}
            />
          </div>
          {!emailOK && signUp && <div className="warning">이메일 형식이어야 합니다.</div>}
        </div>

        <div className="sign-items">
          <div className="sign-text">
            <span className={`text-bar ${!signUp ? "" : passwordOK ? "success" : "fail"}`}>비밀번호</span>
          </div>
          <div className={`sign-content ${!signUp ? "" : passwordOK ? "success" : "fail"}`}>
            <input
              data-testid="password-input"
              className="textinput"
              type="password"
              placeholder="비밀번호(8자리 이상)"
              onChange={onChangePassword}
              value={password}
            />
          </div>
          {!passwordOK && signUp && <div className="warning">8자리 이상 입력해주세요.</div>}
        </div>

        <button
          data-testid="sign-button"
          className={`start-btn ${!signUp ? "" : emailOK && passwordOK ? "success" : "fail"}`}
          onClick={onClickSave}
        >
          회원가입
        </button>
        <Link
          to="/signin"
          className="link-black"
        >
          로그인하기
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
