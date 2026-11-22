import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Tractor, Building, ShieldCheck, ArrowRight, UserPlus } from 'lucide-react';
import "./Option.css";

const OptionSignup = () => {
  const navigate = useNavigate();

  return (
    <div className="role-select-wrapper">
      <div className="role-header">
        <span className="role-header-tag">
          <UserPlus size={14} /> New Account Registration
        </span>
        <h1 className="role-title">Join AgroWaste Network</h1>
        <p className="role-subtitle">
          Select how you want to participate in sustainable crop residue recycling and trading.
        </p>
      </div>

      <div className="role-cards-grid">
        {/* Farmer Registration */}
        <div
          className="role-card-item card-farmer"
          onClick={() => navigate('/SignUpFarmer')}
          role="button"
          tabIndex={0}
        >
          <div className="role-icon-box">
            <Tractor size={36} strokeWidth={2.2} />
          </div>
          <h2 className="role-card-title">Register as Farmer</h2>
          <p className="role-card-desc">
            Connect your farmland, stop stubble burning, book mechanized harvesting, and monetize your crop residue.
          </p>
          <div className="role-btn-action">
            <span>Register as Farmer</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Buyer / Industry Registration */}
        <div
          className="role-card-item card-buyer"
          onClick={() => navigate('/SignUpCompany')}
          role="button"
          tabIndex={0}
        >
          <div className="role-icon-box">
            <Building size={36} strokeWidth={2.2} />
          </div>
          <h2 className="role-card-title">Register as Buyer / Company</h2>
          <p className="role-card-desc">
            Gain verified access to agricultural biomass lots, bio-fuel raw materials, and transparent auction rooms.
          </p>
          <div className="role-btn-action">
            <span>Register as Company</span>
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Administrator Registration */}
        <div
          className="role-card-item card-admin"
          onClick={() => navigate('/SignUpAdmin')}
          role="button"
          tabIndex={0}
        >
          <div className="role-icon-box">
            <ShieldCheck size={36} strokeWidth={2.2} />
          </div>
          <h2 className="role-card-title">Register as Admin</h2>
          <p className="role-card-desc">
            Create and supervise agro-waste collection districts, manage verification workflows, and host live bidding.
          </p>
          <div className="role-btn-action">
            <span>Register as Admin</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>

      <div className="role-footer-link">
        Already registered on AgroWaste?
        <Link to="/OptionLogin">Sign in to your account</Link>
      </div>
    </div>
  );
};

export default OptionSignup;
