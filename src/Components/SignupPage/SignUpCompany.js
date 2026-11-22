import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import DeepContext from '../../context/DeepContext';
import { API_URL } from '../../apiConfig';
import { Building, Mail, Phone, Lock, Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';
import "./style1.css";

const SignUpCompany = () => {
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
      const res = await axios.post(`${API_URL}/SignUpCompany`, {
        name: formData.name,
        mobileno: formData.mobileno,
        email: formData.email,
        password: formData.password
      });

      if (res.data === "Email exist") {
        showAlert("An enterprise account with this email already exists.", "danger");
      } else if (res.data.success) {
        showAlert(res.data.msg || "Company account registered successfully!", "success");
        navigate('/LoginCompany');
      } else {
        showAlert(res.data.msg || "Registration failed", "danger");
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
          <span className="auth-role-badge badge-company">
            <Building size={14} /> Buyer / Industry Registration
          </span>
          <h1 className="auth-title">Register Company</h1>
          <p className="auth-subtitle">Source industrial bio-waste & bid in live auctions</p>
        </div>

        <form onSubmit={handleSignup} className="auth-form">
          <div className="form-group">
            <label className="form-label">Enterprise / Company Name</label>
            <div className="input-wrapper">
              <span className="input-icon-left"><Building size={18} /></span>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. GreenBio Energy Pvt Ltd"
                className="auth-input"
                value={formData.name}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label className="form-label">Contact Number</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Phone size={18} /></span>
                <input
                  type="tel"
                  name="mobileno"
                  required
                  placeholder="Official phone number"
                  className="auth-input"
                  value={formData.mobileno}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Corporate Email</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Mail size={18} /></span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="procurement@company.com"
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
            className="auth-submit-btn btn-company"
            disabled={loading}
          >
            <UserPlus size={18} />
            <span>{loading ? "Registering..." : "Register Enterprise"}</span>
          </button>
        </form>

        <div className="auth-footer">
          <div>
            Already have a buyer account?{" "}
            <Link to="/LoginCompany" style={{ color: '#d97706' }}>Sign In here</Link>
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

export default SignUpCompany;
