import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeepContext from '../../../../context/DeepContext';
import { Gavel, ArrowLeft } from 'lucide-react';
import '../../../LoginPage/style.css';

const ShowAuction = () => {
  const { EndObject } = useContext(DeepContext);
  const navigate = useNavigate();
  const data = EndObject || {};

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" style={{ maxWidth: '600px' }}>
        <div className="auth-header">
          <span className="auth-role-badge badge-admin">
            <Gavel size={14} /> Auction Room Details
          </span>
          <h1 className="auth-title">{data.Name || "Auction Room"}</h1>
          <p className="auth-subtitle">Detailed parameter specifications and schedule</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
          <div style={{ padding: '16px 20px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>Description & Quality</span>
            <p style={{ fontSize: '15px', color: '#0f172a', fontWeight: 600, margin: '4px 0 0 0' }}>
              {data.description || "N/A"}
            </p>
          </div>

          <div className="form-row-grid">
            <div style={{ padding: '16px 20px', borderRadius: '14px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <span style={{ fontSize: '12.5px', color: '#2563eb', fontWeight: 600 }}>Unique Room Code</span>
              <p style={{ fontSize: '18px', color: '#1e40af', fontWeight: 800, margin: '4px 0 0 0', fontFamily: 'monospace' }}>
                {data.Code || "N/A"}
              </p>
            </div>

            <div style={{ padding: '16px 20px', borderRadius: '14px', background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
              <span style={{ fontSize: '12.5px', color: '#059669', fontWeight: 600 }}>Starting Bid</span>
              <p style={{ fontSize: '18px', color: '#065f46', fontWeight: 800, margin: '4px 0 0 0' }}>
                ₹{data.StartBid || 0}
              </p>
            </div>
          </div>

          <div className="form-row-grid">
            <div style={{ padding: '16px 20px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>Auction Start</span>
              <p style={{ fontSize: '14px', color: '#0f172a', fontWeight: 600, margin: '4px 0 0 0' }}>
                {data.startDate ? new Date(data.startDate).toLocaleString() : 'N/A'}
              </p>
            </div>

            <div style={{ padding: '16px 20px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 600 }}>Auction Concludes</span>
              <p style={{ fontSize: '14px', color: '#0f172a', fontWeight: 600, margin: '4px 0 0 0' }}>
                {data.endDate ? new Date(data.endDate).toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <button
          className="auth-submit-btn btn-admin"
          onClick={() => navigate('/AdminHome')}
        >
          <ArrowLeft size={16} />
          <span>Return to Admin Console</span>
        </button>
      </div>
    </div>
  );
};

export default ShowAuction;
