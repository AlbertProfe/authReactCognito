// ForgotPassword.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, confirmForgotPassword } from "./authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setStep(2);
    } catch (error) {
      alert(`Failed to send code: ${error}`);
    }
  };

  const handleConfirmPassword = async (e) => {
    e.preventDefault();
    try {
      await confirmForgotPassword(email, code, newPassword);
      alert(
        "Password reset successfully!\nYou can now log in with your new password."
      );
      navigate("/login");
    } catch (error) {
      alert(`Failed to reset password: ${error}`);
    }
  };

  return (
    <div className="forgotPasswordForm">
      <h2>Forgot Password</h2>
      {step === 1 ? (
        <form onSubmit={handleSendCode}>
          <div>
            <input
              className="inputText"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <button type="submit">Send Code</button>
        </form>
      ) : (
        <form onSubmit={handleConfirmPassword}>
          <div>
            <input
              className="inputText"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Confirmation Code"
              required
            />
          </div>
          <div>
            <input
              className="inputText"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
