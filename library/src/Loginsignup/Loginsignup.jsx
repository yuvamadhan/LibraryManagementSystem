import React, { useState } from 'react';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import user_icon from '../Assets/person.png';
import './Loginsignup.css';

const Loginsignup = () => {
  const [action, setAction] = useState("login");
  

  const handleSubmit = () => {
    
    console.log("Form submitted!");
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "login" ? <div></div> : <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="NAME" />
        </div>}
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="EMAIL ID" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="PASSWORD" />
        </div>
      </div>
      {action === "sign up" ? <div></div> : <div className="forgot-password">forgot password? <span>click here!</span></div>}
      <div className="submit-container">
        <div className={action === "login" ? "submit gray" : "submit"} onClick={() => { setAction("sign up") }}>sign up</div>
        <div className={action === "sign up" ? "submit gray" : "submit"} onClick={() => { setAction("login") }}>login</div>
      </div>
      <div className="submit-container">
        <button className="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Loginsignup;
