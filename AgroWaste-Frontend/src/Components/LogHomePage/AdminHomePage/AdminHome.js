import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeepContext from '../../../context/DeepContext';
import { API_URL } from '../../../apiConfig';
import {
  ShieldCheck,
  PlusCircle,
  Gavel,
  ArrowRight,
  Tractor
} from 'lucide-react';
import './AdminHome.css';

const AdminHome = () => {
  const { showAlert, FullfillRequest } = useContext(DeepContext);
  const navigate = useNavigate();

  const [room, setRoom] = useState([]);
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/AdminHome`);
      if (res?.data?.room || res?.data?.service1) {
        setRoom(res.data.room || []);
        setService(res.data.service1 || []);
      } else if (res?.data?.message) {
        if (showAlert) showAlert(res.data.message, 'warning');
      }
    } catch (err) {
      console.error(err);
      if (showAlert) showAlert("Could not fetch administrative records", "danger");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAuctionResult = (ele) => {
    FullfillRequest(ele);
    navigate('/ShowAuction');
  };

  const handleDeleteRequest = (ele) => {
    FullfillRequest(ele);
    navigate('/CompleteRequest');
  };

  return (
    <div className="admin-page-container">
      {/* Admin Header */}
      <div className="admin-header-bar">
        <div>
          <span className="admin-badge">
            <ShieldCheck size={14} /> Control Center
          </span>
          <h1 className="admin-title">Platform Administration</h1>
          <p className="admin-subtitle">
            Manage live auction rooms, inspect incoming farmer harvesting requests, and oversee residue operations.
          </p>
        </div>

        <button
          className="btn-emerald"
          style={{ padding: '13px 24px', whiteSpace: 'nowrap' }}
          onClick={() => navigate('/CreateRoom')}
        >
          <PlusCircle size={18} />
          <span>Create Auction Room</span>
        </button>
      </div>

      {/* Available Auction Rooms Section */}
      <section className="admin-section">
        <div className="admin-section-header">
          <h2 className="admin-section-title">
            <Gavel size={22} color="#059669" />
            <span>Active Auction Rooms</span>
            <span className="admin-count-badge">{room.length} Rooms</span>
          </h2>
        </div>

        {loading ? (
          <div className="admin-empty-state">Loading active auction rooms...</div>
        ) : room.length === 0 ? (
          <div className="admin-empty-state">
            No active auction rooms currently available. Click "Create Auction Room" above to launch one.
          </div>
        ) : (
          <div className="admin-card-grid">
            {room.map((ele, idx) => (
              <div
                key={ele._id || idx}
                className="admin-item-card"
                onClick={() => handleAuctionResult(ele)}
              >
                <div>
                  <div className="admin-card-top">
                    <h3 className="admin-item-name">{ele.Name}</h3>
                    <span className="admin-code-pill">Code: {ele.Code}</span>
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#64748b', margin: '8px 0 14px 0' }}>
                    {ele.description || "No description provided"}
                  </p>
                  <div className="admin-item-meta">
                    <div>
                      <strong style={{ color: '#0f172a' }}>Starting Bid:</strong> ₹{ele.StartBid}
                    </div>
                    <div>
                      <strong style={{ color: '#0f172a' }}>Duration:</strong>{" "}
                      {ele.startDate ? new Date(ele.startDate).toLocaleDateString() : 'N/A'} –{" "}
                      {ele.endDate ? new Date(ele.endDate).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>

                <button className="admin-card-btn">
                  <span>View Details & Bids</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pending Farmer Harvesting Requests Section */}
      <section className="admin-section">
        <div className="admin-section-header">
          <h2 className="admin-section-title">
            <Tractor size={22} color="#d97706" />
            <span>Pending Farmer Service Requests</span>
            <span className="admin-count-badge" style={{ background: '#fffbeb', color: '#d97706' }}>
              {service.length} Pending
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="admin-empty-state">Loading pending service requests...</div>
        ) : service.length === 0 ? (
          <div className="admin-empty-state">
            No pending farmer harvesting requests at this moment.
          </div>
        ) : (
          <div className="admin-card-grid">
            {service.map((ele, idx) => (
              <div
                key={ele._id || idx}
                className="admin-item-card"
                onClick={() => handleDeleteRequest(ele)}
              >
                <div>
                  <div className="admin-card-top">
                    <h3 className="admin-item-name">{ele.email}</h3>
                    <span className="admin-code-pill" style={{ background: '#ecfdf5', color: '#059669' }}>
                      {ele.acre} Acres
                    </span>
                  </div>
                  <div className="admin-item-meta" style={{ marginTop: '12px' }}>
                    <div>
                      <strong style={{ color: '#0f172a' }}>Crop Variety:</strong> {ele.ptype}
                    </div>
                    <div>
                      <strong style={{ color: '#0f172a' }}>Mobile Contact:</strong> {ele.mobileno}
                    </div>
                    <div>
                      <strong style={{ color: '#0f172a' }}>Harvest Window:</strong>{" "}
                      {ele.du1 ? new Date(ele.du1).toLocaleDateString() : 'Immediate'}
                    </div>
                  </div>
                </div>

                <button className="admin-card-btn" style={{ background: '#fffbeb', color: '#d97706' }}>
                  <span>Review & Fulfill Request</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminHome;
