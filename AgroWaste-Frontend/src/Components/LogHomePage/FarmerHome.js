import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeepContext from '../../context/DeepContext';
import {
  Tractor,
  Calendar,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Leaf
} from 'lucide-react';
import Contact from '../homeComponent/ContactUsPage/Contact';
import Aboutus from '../homeComponent/AboutUs/Aboutus';
import './Dashboard.css';

const FarmerHome = () => {
  const navigate = useNavigate();
  const { user } = useContext(DeepContext);

  const farmerName = user?.name || "Farmer Partner";

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="dash-welcome-banner">
        <div>
          <span className="dash-user-tag">
            <Tractor size={14} /> Registered Farmland
          </span>
          <h1 className="dash-heading">
            Welcome back, {farmerName}! 🌾
          </h1>
          <p className="dash-subheading">
            Easily request on-demand residue collection, avoid costly stubble burning fines, and monetize post-harvest crop biomass.
          </p>
        </div>

        <button
          className="btn-emerald"
          style={{ padding: '14px 28px', whiteSpace: 'nowrap' }}
          onClick={() => navigate('/Service')}
        >
          <Tractor size={18} />
          <span>New Collection Request</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="dash-stats-row">
        <div className="dash-stat-card">
          <div className="dash-stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="dash-stat-val">Active</div>
            <div className="dash-stat-lbl">Account Verification</div>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
            <Calendar size={24} />
          </div>
          <div>
            <div className="dash-stat-val">15 Days</div>
            <div className="dash-stat-lbl">Avg Harvest Window</div>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <Leaf size={24} />
          </div>
          <div>
            <div className="dash-stat-val">100% Green</div>
            <div className="dash-stat-lbl">Zero Soil Damage</div>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon" style={{ background: '#fdf2f8', color: '#db2777' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div className="dash-stat-val">₹ Fair Mkt</div>
            <div className="dash-stat-lbl">Residue Monetization</div>
          </div>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="dash-actions-grid">
        {/* Card 1: Request Service */}
        <div className="dash-action-card" onClick={() => navigate('/Service')}>
          <div>
            <div className="dash-card-header">
              <div className="dash-card-icon">
                <Tractor size={28} />
              </div>
              <span className="dash-card-badge" style={{ background: '#ecfdf5', color: '#059669' }}>
                On-Demand
              </span>
            </div>
            <h2 className="dash-card-title">Book Harvesting & Collection</h2>
            <p className="dash-card-desc">
              Submit your farm acreage, crop type (Wheat, Rice/Paddy, Cotton, Sugarcane), and preferred harvest date.
              Our mechanized baling team will clear your field.
            </p>
          </div>
          <button className="dash-btn-continue">
            <span>Book Residue Service Now</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Card 2: Biomass Prediction */}
        <div className="dash-action-card" onClick={() => navigate('/Research')}>
          <div>
            <div className="dash-card-header">
              <div className="dash-card-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <BarChart3 size={28} />
              </div>
              <span className="dash-card-badge" style={{ background: '#eff6ff', color: '#2563eb' }}>
                Analytics
              </span>
            </div>
            <h2 className="dash-card-title">Biomass Yield Estimator</h2>
            <p className="dash-card-desc">
              Calculate projected residue tonnage, soil organic nutrient retention, and expected market value
              before your harvest date arrives.
            </p>
          </div>
          <button className="dash-btn-continue" style={{ background: '#2563eb' }}>
            <span>Open Yield Estimator</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* About Us section */}
      <div id="about">
        <Aboutus />
      </div>

      {/* Contact Support */}
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default FarmerHome;
