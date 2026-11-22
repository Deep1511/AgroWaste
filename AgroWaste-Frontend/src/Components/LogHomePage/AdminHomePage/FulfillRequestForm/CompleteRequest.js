import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeepContext from '../../../../context/DeepContext';
import { Tractor, CheckSquare, ArrowLeft } from 'lucide-react';
import '../../../LoginPage/style.css';

const CompleteRequest = () => {
  const { EndObject, FullfillRequest } = useContext(DeepContext);
  const navigate = useNavigate();
  const data = EndObject || {};

  const handleRequest = () => {
    FullfillRequest(data);
    navigate('/ClearReqForm');
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" style={{ maxWidth: '640px' }}>
        <div className="auth-header">
          <span className="auth-role-badge badge-farmer">
            <Tractor size={14} /> Farmer Request Review
          </span>
          <h1 className="auth-title">Harvesting Service Review</h1>
          <p className="auth-subtitle">Verify land parameters and approve machinery dispatch</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
          <div className="form-row-grid">
            <div style={{ padding: '14px 18px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Farmer Email</span>
              <p style={{ fontSize: '15px', color: '#0f172a', fontWeight: 700, margin: '3px 0 0 0' }}>
                {data.email || 'N/A'}
              </p>
            </div>

            <div style={{ padding: '14px 18px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Contact Phone</span>
              <p style={{ fontSize: '15px', color: '#0f172a', fontWeight: 700, margin: '3px 0 0 0' }}>
                {data.mobileno || 'N/A'}
              </p>
            </div>
          </div>

          <div className="form-row-grid">
            <div style={{ padding: '14px 18px', borderRadius: '14px', background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
              <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>Farm Land Size</span>
              <p style={{ fontSize: '17px', color: '#065f46', fontWeight: 800, margin: '3px 0 0 0' }}>
                {data.acre || 0} Acres
              </p>
            </div>

            <div style={{ padding: '14px 18px', borderRadius: '14px', background: '#fffbeb', border: '1px solid #fde68a' }}>
              <span style={{ fontSize: '12px', color: '#d97706', fontWeight: 600 }}>Grain / Crop Variety</span>
              <p style={{ fontSize: '17px', color: '#92400e', fontWeight: 800, margin: '3px 0 0 0' }}>
                {data.ptype || 'N/A'}
              </p>
            </div>
          </div>

          <div className="form-row-grid">
            <div style={{ padding: '14px 18px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Planting Date</span>
              <p style={{ fontSize: '14px', color: '#0f172a', fontWeight: 600, margin: '3px 0 0 0' }}>
                {data.date1 ? new Date(data.date1).toLocaleDateString() : 'N/A'}
              </p>
            </div>

            <div style={{ padding: '14px 18px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Scheduled Harvest Window</span>
              <p style={{ fontSize: '14px', color: '#0f172a', fontWeight: 600, margin: '3px 0 0 0' }}>
                {data.du1 ? new Date(data.du1).toLocaleDateString() : 'Immediate'} –{" "}
                {data.du2 ? new Date(data.du2).toLocaleDateString() : 'Immediate'}
              </p>
            </div>
          </div>

          <div style={{ padding: '14px 18px', borderRadius: '14px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Service Specification & Machines</span>
            <p style={{ fontSize: '14.5px', color: '#0f172a', fontWeight: 600, margin: '4px 0 0 0' }}>
              Mode: {data.type || 'Standard'} | Machinery: {data.mtype || 'Baler & Combine'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px' }}>
          <button
            className="auth-submit-btn btn-farmer"
            style={{ flex: 1 }}
            onClick={handleRequest}
          >
            <CheckSquare size={18} />
            <span>Fulfill & Clear Request</span>
          </button>
          <button
            className="btn-outline-emerald"
            style={{ padding: '0 20px', borderRadius: '12px' }}
            onClick={() => navigate('/AdminHome')}
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteRequest;
