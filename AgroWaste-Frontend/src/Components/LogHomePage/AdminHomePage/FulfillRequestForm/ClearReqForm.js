import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeepContext from '../../../../context/DeepContext';
import { API_URL } from '../../../../apiConfig';
import { CheckCircle2, Scale, Wheat, Calendar, ArrowLeft, Send } from 'lucide-react';
import '../../../LoginPage/style.css';

const ClearReqForm = () => {
  const { showAlert, EndObject } = useContext(DeepContext);
  const navigate = useNavigate();
  const serData = EndObject || {};

  const [formData, setFormData] = useState({
    tResidue: "",
    tgrain: "",
    sdate: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClearRequest = async (e) => {
    e.preventDefault();
    if (!formData.tResidue || !formData.tgrain || !formData.sdate) {
      if (showAlert) showAlert("Please fill in residue and grain metrics.", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/ClearReqForm`, {
        email: serData.email,
        tResidue: formData.tResidue,
        tgrain: formData.tgrain,
        sdate: formData.sdate
      });

      if (res.data.success) {
        if (showAlert) showAlert(res.data.msg || "Request cleared & added to completed registry!", 'success');
        navigate('/AdminHome');
      } else {
        if (showAlert) showAlert(res.data.msg || "Could not complete request", 'danger');
      }
    } catch (err) {
      console.error(err);
      if (showAlert) showAlert("Failed to submit clearance. Please verify connection.", 'danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" style={{ maxWidth: '560px' }}>
        <div className="auth-header">
          <span className="auth-role-badge badge-admin">
            <CheckCircle2 size={14} /> Fulfill & Clear Harvest
          </span>
          <h1 className="auth-title">Field Clearance Entry</h1>
          <p className="auth-subtitle">
            Log harvested metrics for farmer: <strong>{serData.email || 'Farmer'}</strong>
          </p>
        </div>

        <form onSubmit={handleClearRequest} className="auth-form">
          <div className="form-group">
            <label className="form-label">Total Residue Collected (Tons / Quintals)</label>
            <div className="input-wrapper">
              <span className="input-icon-left"><Scale size={18} /></span>
              <input
                type="text"
                name="tResidue"
                required
                placeholder="e.g. 18.5 Metric Tons"
                className="auth-input"
                value={formData.tResidue}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Total Grain Yield Recovered</label>
            <div className="input-wrapper">
              <span className="input-icon-left"><Wheat size={18} /></span>
              <input
                type="text"
                name="tgrain"
                required
                placeholder="e.g. 42 Quintals"
                className="auth-input"
                value={formData.tgrain}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Completion / Clearance Date</label>
            <div className="input-wrapper">
              <span className="input-icon-left"><Calendar size={18} /></span>
              <input
                type="date"
                name="sdate"
                required
                className="auth-input"
                value={formData.sdate}
                onChange={handleInput}
              />
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit-btn btn-admin"
            disabled={loading}
          >
            <Send size={18} />
            <span>{loading ? "Submitting..." : "Confirm & Clear Request"}</span>
          </button>
        </form>

        <div className="auth-footer">
          <button
            type="button"
            className="auth-switch-role"
            onClick={() => navigate('/AdminHome')}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <ArrowLeft size={14} />
            <span>Cancel and return</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearReqForm;
