import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeepContext from '../../../context/DeepContext';
import { API_URL } from '../../../apiConfig';
import { Gavel, Key, FileText, Calendar, DollarSign, ArrowLeft, Plus } from 'lucide-react';
import '../../LoginPage/style.css';

const Roomform = () => {
  const { showAlert } = useContext(DeepContext);
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    Name: "",
    description: "",
    Code: "",
    StartBid: "",
    startDate: "",
    endDate: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRoom(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!room.Name || !room.Code || !room.StartBid || !room.startDate || !room.endDate) {
      if (showAlert) showAlert("Please fill in all required room details.", "warning");
      return;
    }

    setLoading(true);
    try {
      const data = await axios.post(`${API_URL}/CreateRoom`, {
        Name: room.Name,
        description: room.description,
        Code: room.Code,
        StartBid: Number(room.StartBid),
        startDate: room.startDate,
        endDate: room.endDate
      });

      if (data.data.success) {
        if (showAlert) showAlert(data.data.msg || "Auction Room created successfully!", 'success');
        navigate('/AdminHome');
      } else {
        if (showAlert) showAlert(data.data.msg || "Could not create auction room", 'danger');
      }
    } catch (err) {
      console.error(err);
      if (showAlert) showAlert("Failed to create room. Please verify network or room code uniqueness.", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" style={{ maxWidth: '580px' }}>
        <div className="auth-header">
          <span className="auth-role-badge badge-admin">
            <Gavel size={14} /> Auction Setup
          </span>
          <h1 className="auth-title">Create Auction Room</h1>
          <p className="auth-subtitle">Host a new bidding arena for agricultural residue lots</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Auction Room Name</label>
            <div className="input-wrapper">
              <span className="input-icon-left"><Gavel size={18} /></span>
              <input
                type="text"
                name="Name"
                required
                placeholder="e.g. Punjab Wheat Straw Lot #204"
                className="auth-input"
                value={room.Name}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description & Residue Specs</label>
            <div className="input-wrapper">
              <span className="input-icon-left"><FileText size={18} /></span>
              <input
                type="text"
                name="description"
                required
                placeholder="e.g. 150 Quintals baled wheat straw, 10% moisture"
                className="auth-input"
                value={room.description}
                onChange={handleInput}
              />
            </div>
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label className="form-label">Unique Room Code (4-8 chars)</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Key size={18} /></span>
                <input
                  type="text"
                  name="Code"
                  required
                  placeholder="e.g. ROOM401"
                  className="auth-input"
                  value={room.Code}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Starting Bid (₹)</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><DollarSign size={18} /></span>
                <input
                  type="number"
                  name="StartBid"
                  required
                  placeholder="e.g. 5000"
                  className="auth-input"
                  value={room.StartBid}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>

          <div className="form-row-grid">
            <div className="form-group">
              <label className="form-label">Bidding Start Date</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Calendar size={18} /></span>
                <input
                  type="datetime-local"
                  name="startDate"
                  required
                  className="auth-input"
                  value={room.startDate}
                  onChange={handleInput}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Bidding End Date</label>
              <div className="input-wrapper">
                <span className="input-icon-left"><Calendar size={18} /></span>
                <input
                  type="datetime-local"
                  name="endDate"
                  required
                  className="auth-input"
                  value={room.endDate}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="auth-submit-btn btn-admin"
            disabled={loading}
          >
            <Plus size={18} />
            <span>{loading ? "Creating..." : "Launch Auction Room"}</span>
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
            <span>Back to Admin Center</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roomform;
