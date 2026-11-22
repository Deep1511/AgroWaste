import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DeepContext from "../../context/DeepContext";
import { User, Mail, Phone, ShieldCheck, ArrowLeft, LogIn } from 'lucide-react';
import '../LoginPage/style.css';

const Profile = () => {
  const { user, setUser, loggedinF, loggedinC, loggedinA } = useContext(DeepContext);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("userLogin");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, [setUser]);

  const getRole = () => {
    if (loggedinF === 'true') return 'Farmer Account';
    if (loggedinC === 'true') return 'Buyer / Enterprise Account';
    if (loggedinA === 'true') return 'Administrator Account';
    return 'Registered Member';
  };

  if (!user) {
    return (
      <div className="auth-page-wrapper">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <User size={48} color="#94a3b8" style={{ margin: '0 auto 16px auto' }} />
          <h2 className="auth-title">No Active Session</h2>
          <p className="auth-subtitle" style={{ marginBottom: '24px' }}>
            Please sign in to your AgroWaste account to view your profile and management options.
          </p>
          <Link to="/OptionLogin" className="btn-emerald" style={{ width: '100%' }}>
            <LogIn size={18} />
            <span>Sign In to Your Account</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" style={{ maxWidth: '540px' }}>
        <div className="auth-header">
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            fontWeight: 800,
            margin: '0 auto 16px auto',
            boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)'
          }}>
            {user.name ? user.name.charAt(0).toUpperCase() : <User size={32} />}
          </div>
          <span className="auth-role-badge badge-farmer">
            <ShieldCheck size={14} /> {getRole()}
          </span>
          <h1 className="auth-title">{user.name || "User Profile"}</h1>
          <p className="auth-subtitle">Verified member on AgroWaste Sustainable Platform</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
          <div style={{ padding: '16px 20px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={18} />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Full Name</span>
              <p style={{ fontSize: '15px', color: '#0f172a', fontWeight: 700, margin: '2px 0 0 0' }}>{user.name}</p>
            </div>
          </div>

          <div style={{ padding: '16px 20px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={18} />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Registered Email</span>
              <p style={{ fontSize: '15px', color: '#0f172a', fontWeight: 700, margin: '2px 0 0 0' }}>{user.email || 'N/A'}</p>
            </div>
          </div>

          <div style={{ padding: '16px 20px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#fffbeb', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={18} />
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Phone / Contact</span>
              <p style={{ fontSize: '15px', color: '#0f172a', fontWeight: 700, margin: '2px 0 0 0' }}>{user.mobileno || 'N/A'}</p>
            </div>
          </div>
        </div>

        <button
          className="auth-submit-btn btn-farmer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
