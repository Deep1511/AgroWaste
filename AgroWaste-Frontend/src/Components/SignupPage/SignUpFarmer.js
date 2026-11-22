import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import DeepContext from '../../context/DeepContext';
import { API_URL } from '../../apiConfig';
import { Tractor, User, Mail, Phone, Lock, Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';
import "./style1.css";

const SignUpFarmer = () => {
  const { showAlert } = useContext(DeepContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobileno: "",
    email: "",
    password: "",
    cpassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      showAlert("Passwords do not match. Please verify and try again.", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/SignUpFarmer`, {
        name: formData.name,
        mobileno: formData.mobileno,
        email: formData.email,
        password: formData.password
      });

      if (res.data === "Email exist") {
        showAlert("An account with this email already exists.", "danger");
      } else if (res.data.success) {
        showAlert(res.data.msg || res.data.message || "Farmer account created successfully!", "success");
        navigate('/LoginFarmer');
      } else {
        showAlert(res.data.msg || res.data.message || "Failed to create account", "danger");
      }
    } catch (err) {
      console.error(err);
      showAlert(err.response?.data?.msg || "Registration failed. Please check network connection.", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" style={{ maxWidth: '520px' }}>
        <div className="auth-header">
          <span className="auth-role-badge badge-farmer">
            <Tractor size={14} /> Farmer Registration
          </span>
          <h1 className="auth-title">Create Farmer Account</h1>
          <p className="auth-subtitle">Monetize crop residue and book mechanized harvesting</p>
        </div>

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-wrapper">
              <span className="input-icon-left"><User size={18} /></span>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Ramesh Kumar"
                className="auth-input"
                value={formData.name}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Phone size={18} /></span>
                <input
                  type="tel"
                  name="mobileno"
                  required
                  placeholder="10-digit number"
                  className="auth-input"
                  value={formData.mobileno}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Mail size={18} /></span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="ramesh@gmail.com"
                  className="auth-input"
                  value={formData.email}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Lock size={18} /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Create password"
                  className="auth-input"
                  value={formData.password}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Lock size={18} /></span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="cpassword"
                  required
                  placeholder="Repeat password"
                  className="auth-input"
                  value={formData.cpassword}
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
          </div>

          <button
            type="submit"
            className="auth-submit-btn btn-farmer"
            disabled={loading}
          >
            <UserPlus size={18} />
            <span>{loading ? "Registering..." : "Create Farmer Account"}</span>
          </button>
        </form>

        <div className="auth-footer">
          <div>
            Already registered?{" "}
            <Link to="/LoginFarmer">Sign In here</Link>
          </div>
          <Link to="/OptionSignup" className="auth-switch-role">
            <ArrowLeft size={14} />
            <span>Select another role</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpFarmer;
