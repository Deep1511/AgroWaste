import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Tractor, Building, ShieldCheck, ArrowRight, LogIn } from 'lucide-react';
import "./Option.css";

const OptionLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="role-select-wrapper">
      <div className="role-header">
        <span className="role-header-tag">
          <LogIn size={14} /> Account Portal
        </span>
        <h1 className="role-title">Select Your Login Role</h1>
        <p className="role-subtitle">
          Choose the portal that corresponds to your account to sign in and manage residue operations.
        </p>
      </div>

      <div className="role-cards-grid">
        {/* Farmer Portal */}
        <div
          className="role-card-item card-farmer"
          onClick={() => navigate('/LoginFarmer')}
          role="button"
          tabIndex={0}
        >
          <div className="role-icon-box">
            <Tractor size={36} strokeWidth={2.2} />
          </div>
          <h2 className="role-card-title">Farmer Portal</h2>
          <p className="role-card-desc">
            Book residue collection, schedule harvesting services, track field clearance, and earn fair market value.
          </p>
          <div className="role-btn-action">
            <span>Continue as Farmer</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Buyer / Industry Portal */}
        <div
          className="role-card-item card-buyer"
          onClick={() => navigate('/LoginCompany')}
          role="button"
          tabIndex={0}
        >
          <div className="role-icon-box">
            <Building size={36} strokeWidth={2.2} />
          </div>
          <h2 className="role-card-title">Buyer / Industry</h2>
          <p className="role-card-desc">
            Source high-grade raw biomass, participate in real-time auction bidding, and procure sustainable agro-waste.
          </p>
          <div className="role-btn-action">
            <span>Continue as Buyer</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Administrator Portal */}
        <div
          className="role-card-item card-admin"
          onClick={() => navigate('/LoginAdmin')}
          role="button"
          tabIndex={0}
        >
          <div className="role-icon-box">
            <ShieldCheck size={36} strokeWidth={2.2} />
          </div>
          <h2 className="role-card-title">Administrator</h2>
          <p className="role-card-desc">
            Manage live auction rooms, review and clear pending farmer service requests, and oversee platform activity.
          </p>
          <div className="role-btn-action">
            <span>Continue as Admin</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>

      <div className="role-footer-link">
        Don't have an account yet?
        <Link to="/OptionSignup">Register your account here</Link>
      </div>
    </div>
  );
};

export default OptionLogin;
