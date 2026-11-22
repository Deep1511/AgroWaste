import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import DeepContext from '../../context/DeepContext';
import { API_URL } from '../../apiConfig';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react';
import "./style.css";

const LoginAdmin = () => {
  const { showAlert, LoginA, setUser } = useContext(DeepContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/LoginAdmin`, {
        email: formData.email,
        password: formData.password
      });

      if (res.data.success) {
        showAlert(res.data.message || "Admin authenticated successfully!", 'success');
        setUser(res.data.data);
        localStorage.setItem("userLogin", JSON.stringify(res.data.data));
        LoginA('true');
        navigate('/AdminHome');
      } else {
        showAlert(res.data.message || "Invalid credentials", 'danger');
      }
    } catch (err) {
      console.error(err);
      showAlert(err.response?.data?.message || "Failed to sign in. Please verify your connection.", 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-role-badge badge-admin">
            <ShieldCheck size={14} /> Administrator Portal
          </span>
          <h1 className="auth-title">Admin Console</h1>
          <p className="auth-subtitle">Platform supervision, auctions & verification</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label className="form-label">Admin Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="admin@agrowaste.org"
                className="auth-input"
                value={formData.email}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Security Password</span>
            </label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter admin password"
                className="auth-input"
                value={formData.password}
                onChange={handleInput}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit-btn btn-admin"
            disabled={loading}
          >
            <LogIn size={18} />
            <span>{loading ? "Authenticating..." : "Sign In to Admin Center"}</span>
          </button>
        </form>

        <div className="auth-footer">
          <div>
            Registering a new administrator?{" "}
            <Link to="/SignUpAdmin" style={{ color: '#2563eb' }}>Create Admin Account</Link>
          </div>
          <Link to="/OptionLogin" className="auth-switch-role">
            <ArrowLeft size={14} />
            <span>Select another portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
