import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeepContext from '../../context/DeepContext';
import { API_URL } from '../../apiConfig';
import { Tractor, Mail, Phone, Calendar, Layers, ArrowLeft, Send } from 'lucide-react';
import '../LoginPage/style.css';
import './service.css';

const CROPS = [
  "Wheat (Gehun)",
  "Paddy / Rice (Dhan)",
  "Sugarcane (Ganna)",
  "Cotton (Kapas)",
  "Maize (Makka)",
  "Mustard (Sarson)"
];

const MACHINES = [
  "Straw Baler",
  "Combine Harvester",
  "Mulcher",
  "Rotavator",
  "Reaper"
];

const Service = () => {
  const { showAlert, user } = useContext(DeepContext);
  const navigate = useNavigate();

  const [service, setService] = useState({
    email: user?.email || "",
    mobileno: user?.mobileno || "",
    acre: "",
    ptype: "Paddy / Rice (Dhan)",
    date1: "",
    du1: "",
    du2: "",
    type: "Residue Collection & Baler",
    mtype: ["Straw Baler", "Combine Harvester"]
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setService(prev => ({
        ...prev,
        email: prev.email || user.email || "",
        mobileno: prev.mobileno || user.mobileno || ""
      }));
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setService(prev => ({ ...prev, [name]: value }));
  };

  const handleMachineToggle = (machine) => {
    setService(prev => {
      const exists = prev.mtype.includes(machine);
      const updated = exists
        ? prev.mtype.filter(m => m !== machine)
        : [...prev.mtype, machine];
      return { ...prev, mtype: updated };
    });
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    if (!service.email || !service.mobileno || !service.acre || !service.date1 || !service.du1 || !service.du2) {
      if (showAlert) showAlert("Please fill in all harvesting schedule parameters.", "warning");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: service.email,
        mobileno: service.mobileno,
        acre: service.acre,
        ptype: service.ptype,
        date1: service.date1,
        du1: service.du1,
        du2: service.du2,
        type: service.type,
        mtype: service.mtype
      };

      const res = await axios.post(`${API_URL}/Service`, payload);

      if (res.data === "Already Requested!!!") {
        if (showAlert) showAlert("You already have an active harvesting service request under this email.", "warning");
      } else if (res.data.success) {
        if (showAlert) showAlert(res.data.msg || "Harvesting request placed successfully!", 'success');
        navigate('/FarmerHome');
      } else {
        if (showAlert) showAlert(res.data.msg || "Request could not be accepted", 'danger');
      }
    } catch (err) {
      console.error(err);
      if (showAlert) showAlert("Failed to submit request. Please check network connection.", 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="service-page-wrapper">
      <div className="service-card">
        <div className="auth-header">
          <span className="auth-role-badge badge-farmer">
            <Tractor size={14} /> Mechanized Field Assistance
          </span>
          <h1 className="auth-title">Book Crop Residue Collection</h1>
          <p className="auth-subtitle">
            Schedule on-demand machinery to harvest, bale, and clear your field post-harvest
          </p>
        </div>

        <form onSubmit={handleServiceSubmit} className="auth-form">
          <div className="form-row-grid">
            <div className="form-group">
              <label className="form-label">Farmer Contact Email</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Mail size={18} /></span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="farmer@example.com"
                  className="auth-input"
                  value={service.email}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Mobile Number</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Phone size={18} /></span>
                <input
                  type="tel"
                  name="mobileno"
                  required
                  placeholder="10-digit phone number"
                  className="auth-input"
                  value={service.mobileno}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label className="form-label">Farmland Area (Acres)</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Layers size={18} /></span>
                <input
                  type="number"
                  name="acre"
                  required
                  min="0.5"
                  step="0.5"
                  placeholder="e.g. 5.5"
                  className="auth-input"
                  value={service.acre}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Planting / Sowing Date</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Calendar size={18} /></span>
                <input
                  type="date"
                  name="date1"
                  required
                  className="auth-input"
                  value={service.date1}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>

          {/* Crop Selector */}
          <div className="form-group">
            <label className="form-label">Select Crop Variety</label>
            <div className="crop-chips-grid">
              {CROPS.map((crop) => (
                <button
                  type="button"
                  key={crop}
                  className={`crop-chip-btn ${service.ptype === crop ? 'active' : ''}`}
                  onClick={() => setService(prev => ({ ...prev, ptype: crop }))}
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          {/* Harvest Windows */}
          <div className="form-row-grid">
            <div className="form-group">
              <label className="form-label">Preferred Harvest Start</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Calendar size={18} /></span>
                <input
                  type="date"
                  name="du1"
                  required
                  className="auth-input"
                  value={service.du1}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Harvest End</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Calendar size={18} /></span>
                <input
                  type="date"
                  name="du2"
                  required
                  className="auth-input"
                  value={service.du2}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>

          {/* Service Mode */}
          <div className="form-group">
            <label className="form-label">Residue Handling Service Mode</label>
            <div className="crop-chips-grid">
              {[
                "Residue Collection & Baler",
                "On-Field Mulching (In-situ)",
                "Full Field Clearance"
              ].map((mode) => (
                <button
                  type="button"
                  key={mode}
                  className={`crop-chip-btn ${service.type === mode ? 'active' : ''}`}
                  onClick={() => setService(prev => ({ ...prev, type: mode }))}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Machinery Selection */}
          <div className="form-group">
            <label className="form-label">Machinery Required</label>
            <div className="machinery-checkbox-grid">
              {MACHINES.map((machine) => {
                const isChecked = service.mtype.includes(machine);
                return (
                  <label
                    key={machine}
                    className={`machine-label-box ${isChecked ? 'checked' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleMachineToggle(machine)}
                    />
                    <span>{machine}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit-btn btn-farmer"
            disabled={loading}
            style={{ marginTop: '16px' }}
          >
            <Send size={18} />
            <span>{loading ? "Submitting Request..." : "Confirm & Dispatch Harvesting Request"}</span>
          </button>
        </form>

        <div className="auth-footer">
          <button
            type="button"
            className="auth-switch-role"
            onClick={() => navigate('/FarmerHome')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <ArrowLeft size={14} />
            <span>Return to Farmer Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Service;
