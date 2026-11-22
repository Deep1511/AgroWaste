import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DeepContext from '../../context/DeepContext';
import { Mail, KeyRound, ArrowLeft, Send } from 'lucide-react';
import './style.css';

const Forget = () => {
  const { showAlert } = useContext(DeepContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      if (showAlert) showAlert("Please enter your registered email address.", "warning");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (showAlert) showAlert("Password recovery instructions sent to your email address.", "success");
      navigate('/OptionLogin');
    }, 700);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: '#ecfdf5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto'
          }}>
            <KeyRound size={28} />
          </div>
          <h1 className="auth-title">Password Recovery</h1>
          <p className="auth-subtitle">
            Enter your account email to receive a password reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Registered Account Email</label>
            <div className="input-wrapper">
              <span className="input-icon-left"><Mail size={18} /></span>
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit-btn btn-farmer"
            disabled={loading}
          >
            <Send size={18} />
            <span>{loading ? "Sending..." : "Send Reset Link"}</span>
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/OptionLogin" className="auth-switch-role">
            <ArrowLeft size={14} />
            <span>Back to Portal Selection</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forget;
