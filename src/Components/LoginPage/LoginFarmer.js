import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import DeepContext from '../../context/DeepContext';
import { API_URL } from '../../apiConfig';
import { Tractor, Phone, Lock, Eye, EyeOff, LogIn, ArrowLeft } from 'lucide-react';
import "./style.css";

const LoginFarmer = () => {
  const { showAlert, LoginF, setUser } = useContext(DeepContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "", // Used as mobileno in backend
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
      const res = await axios.post(`${API_URL}/LoginFarmer`, {
        email: formData.email,
        password: formData.password
      });

      if (res.data.success) {
        showAlert(res.data.message || "Logged in successfully!", 'success');
        setUser(res.data.data);
        localStorage.setItem("userLogin", JSON.stringify(res.data.data));
        LoginF('true');
        navigate('/FarmerHome');
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
          <span className="auth-role-badge badge-farmer">
            <Tractor size={14} /> Farmer Portal
          </span>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to manage your crop residue & requests</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label className="form-label">Registered Mobile Number</label>
            <div className="input-wrapper">
              <span className="input-icon-left">
                <Phone size={18} />
              </span>
              <input
                type="text"
                name="email"
                required
                placeholder="Enter 10-digit mobile number"
                className="auth-input"
                value={formData.email}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <span>Password</span>
              <Link to="/Forget" style={{ fontSize: '12.5px', color: '#059669', textDecoration: 'none' }}>
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
                placeholder="Enter your account password"
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
            className="auth-submit-btn btn-farmer"
            disabled={loading}
          >
            <LogIn size={18} />
            <span>{loading ? "Signing in..." : "Sign In to Farmer Portal"}</span>
          </button>
        </form>

        <div className="auth-footer">
          <div>
            Don't have a farmer account?{" "}
            <Link to="/SignUpFarmer">Register as Farmer</Link>
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

export default LoginFarmer;
