import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import DeepContext from '../../context/DeepContext';
import { API_URL } from '../../apiConfig';
import { Building, Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react';
import "./style.css";

const LoginCompany = () => {
  const { showAlert, LoginC, setUser } = useContext(DeepContext);
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
      const res = await axios.post(`${API_URL}/LoginCompany`, {
        email: formData.email,
        password: formData.password
      });

      if (res.data.success) {
        showAlert(res.data.message || "Logged in successfully!", 'success');
        setUser(res.data.data);
        localStorage.setItem("userLogin", JSON.stringify(res.data.data));
        LoginC(res.data.data, 'true');
        navigate('/CompanyHome');
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
          <span className="auth-role-badge badge-company">
            <Building size={14} /> Buyer / Industry Portal
          </span>
          <h1 className="auth-title">Industry Sign In</h1>
          <p className="auth-subtitle">Access live auctions and procure agro-residue</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label className="form-label">Corporate Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="name@company.com"
                className="auth-input"
                value={formData.email}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Password</span>
              <Link to="/Forget" style={{ fontSize: '12.5px', color: '#d97706', textDecoration: 'none' }}>
                Forgot?
              </Link>
            </label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter account password"
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
            className="auth-submit-btn btn-company"
            disabled={loading}
          >
            <LogIn size={18} />
            <span>{loading ? "Signing in..." : "Sign In to Buyer Portal"}</span>
          </button>
        </form>

        <div className="auth-footer">
          <div>
            Need a buyer account?{" "}
            <Link to="/SignUpCompany" style={{ color: '#d97706' }}>Register as Company</Link>
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

export default LoginCompany;
