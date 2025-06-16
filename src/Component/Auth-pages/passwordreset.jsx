import React, { useState } from 'react';
import './CSS/Passwordreset.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { FaBusAlt } from 'react-icons/fa';

const Passwordreset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Reset link sent ✅ Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="reset">
        <h1>Forgot Password</h1>
        <p>Enter your email to reset your password</p>

        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="bnt">
            <button type="submit" disabled={loading}>
                {loading ? (
                    <span className="bus-spin">
                    <FaBusAlt /> Sending...
                    </span>
                ) : (
                    'Reset Password'
                )}
                </button>
          </div>
        </form>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Passwordreset;
