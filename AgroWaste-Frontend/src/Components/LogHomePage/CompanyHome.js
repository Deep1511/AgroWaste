import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeepContext from '../../context/DeepContext';
import {
  Building,
  Gavel,
  ShieldCheck,
  TrendingUp,
  PackageCheck,
  Flame,
  ArrowRight
} from 'lucide-react';
import Contact from '../homeComponent/ContactUsPage/Contact';
import Aboutus from '../homeComponent/AboutUs/Aboutus';
import './Dashboard.css';

const CompanyHome = () => {
  const navigate = useNavigate();
  const { user } = useContext(DeepContext);

  const companyName = user?.name || "Corporate Buyer";

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <div className="dash-welcome-banner" style={{ background: 'linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)' }}>
        <div>
          <span className="dash-user-tag" style={{ background: 'rgba(255, 255, 255, 0.25)', color: '#fde68a' }}>
            <Building size={14} /> Industrial Procurement Portal
          </span>
          <h1 className="dash-heading">
            Welcome, {companyName}! 🏭
          </h1>
          <p className="dash-subheading" style={{ color: '#fef3c7' }}>
            Bid in real-time on verified agricultural residue lots, secure renewable biomass feedstock, and meet sustainable green energy standards.
          </p>
        </div>

        <button
          className="btn-emerald"
          style={{ background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)', padding: '14px 28px', whiteSpace: 'nowrap' }}
          onClick={() => navigate('/Auction')}
        >
          <Gavel size={18} />
          <span>Enter Live Auctions</span>
        </button>
      </div>

      {/* Quick Stats */}
      <div className="dash-stats-row">
        <div className="dash-stat-card">
          <div className="dash-stat-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
            <Gavel size={24} />
          </div>
          <div>
            <div className="dash-stat-val">Real-time</div>
            <div className="dash-stat-lbl">Live Auction Engine</div>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon" style={{ background: '#ecfdf5', color: '#059669' }}>
            <PackageCheck size={24} />
          </div>
          <div>
            <div className="dash-stat-val">Verified</div>
            <div className="dash-stat-lbl">Residue Dry Weight</div>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon" style={{ background: '#fef2f2', color: '#ef4444' }}>
            <Flame size={24} />
          </div>
          <div>
            <div className="dash-stat-val">High Calorific</div>
            <div className="dash-stat-lbl">Bio-Fuel & Pellet Grade</div>
          </div>
        </div>

        <div className="dash-stat-card">
          <div className="dash-stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="dash-stat-val">Compliant</div>
            <div className="dash-stat-lbl">ESG & Carbon Offsets</div>
          </div>
        </div>
      </div>

      {/* Action Cards Grid */}
      <div className="dash-actions-grid">
        {/* Card 1: Enter Live Auction */}
        <div className="dash-action-card" onClick={() => navigate('/Auction')}>
          <div>
            <div className="dash-card-header">
              <div className="dash-card-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
                <Gavel size={28} />
              </div>
              <span className="dash-card-badge badge-live">
                ● Live Rooms Open
              </span>
            </div>
            <h2 className="dash-card-title">Live Auction Arena</h2>
            <p className="dash-card-desc">
              Join active bidding rooms with your designated Room Code. Place competitive real-time bids on rice husk,
              wheat straw bales, and sugarcane bagasse.
            </p>
          </div>
          <button className="dash-btn-continue" style={{ background: '#d97706' }}>
            <span>Enter Auction Arena</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Card 2: Biomass Yield Estimator */}
        <div className="dash-action-card" onClick={() => navigate('/Research')}>
          <div>
            <div className="dash-card-header">
              <div className="dash-card-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <TrendingUp size={28} />
              </div>
              <span className="dash-card-badge" style={{ background: '#eff6ff', color: '#2563eb' }}>
                Market Insights
              </span>
            </div>
            <h2 className="dash-card-title">Residue Availability Forecasting</h2>
            <p className="dash-card-desc">
              Examine regional crop cycles and estimated harvest volumes across districts to plan seasonal procurement schedules.
            </p>
          </div>
          <button className="dash-btn-continue" style={{ background: '#2563eb' }}>
            <span>View Harvest Forecasting</span>
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

export default CompanyHome;
