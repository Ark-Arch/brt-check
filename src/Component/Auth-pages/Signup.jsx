import React, { useState } from 'react';
import './CSS/Signup.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const Signup = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user);
        setSuccess("Account created successfully! 🎉");
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        setSuccess("Logged in successfully! 🚀");
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  return (
    <div className="signup">
      <div className="flow">
        <h1>{isSignUp ? "Create Account" : "Welcome Back"}</h1>
        <form className="inputs" onSubmit={handleSubmit}>
          <p>Email</p>
          <input
            type="text"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <p>Password</p>
          <input
            type="password"
            placeholder={isSignUp ? "Create a password" : "Enter your password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {isSignUp && (
            <>
              <p>Confirm Password</p>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{
                  borderColor: confirmPassword && password !== confirmPassword ? 'red' : '',
                }}
              />
              {confirmPassword && password !== confirmPassword && (
                <p style={{ color: 'red', fontSize: '14px' }}>Passwords do not match</p>
              )}
            </>
          )}

          {!isSignUp && (
            <p className="forgot-link">
              <a href="/passwordreset">Forgot Password?</a>
            </p>
          )}

          <div className="btn">
            <button type="submit">
              {isSignUp ? "Create Account" : "Login"}
            </button>
          </div>

          {error && <p className="error" style={{ color: "red" }}>{error}</p>}
          {success && <p className="success" style={{ color: "green" }}>{success}</p>}

          <p>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span onClick={toggleMode} style={{ color: "blue", cursor: "pointer" }}>
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
