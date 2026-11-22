import React, { useContext, useEffect } from 'react';
import DeepContext from '../context/DeepContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import './Alert.css';

const Alert = () => {
  const { alert, hideAlert } = useContext(DeepContext);

  useEffect(() => {
    if (alert) {
      const duration = alert.duration || 3500;
      const timer = setTimeout(() => {
        if (hideAlert) hideAlert();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [alert, hideAlert]);

  if (!alert) return null;

  const normalizedType = alert.type === 'danger' || alert.type === 'error' ? 'error' : (alert.type || 'info');

  const getIcon = () => {
    switch (normalizedType) {
      case 'success':
        return <CheckCircle2 size={20} strokeWidth={2.5} />;
      case 'error':
        return <XCircle size={20} strokeWidth={2.5} />;
      case 'warning':
        return <AlertTriangle size={20} strokeWidth={2.5} />;
      default:
        return <Info size={20} strokeWidth={2.5} />;
    }
  };

  const getTitle = () => {
    switch (normalizedType) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Action Failed';
      case 'warning':
        return 'Attention Needed';
      default:
        return 'Information';
    }
  };

  const duration = alert.duration || 3500;

  return (
    <div className="toast-container-fixed" role="status" aria-live="polite">
      <div className={`modern-toast toast-${normalizedType}`}>
        <div className="toast-icon">
          {getIcon()}
        </div>
        <div className="toast-body">
          <span className="toast-title">{getTitle()}</span>
          <span className="toast-message">{alert.msg || alert.message}</span>
        </div>
        <button
          className="toast-close-btn"
          onClick={() => hideAlert && hideAlert()}
          aria-label="Close notification"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
        <div
          className="toast-progress-bar"
          style={{ animationDuration: `${duration}ms` }}
        />
      </div>
    </div>
  );
};

export default Alert;
