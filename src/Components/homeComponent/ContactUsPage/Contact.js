import React, { useState, useContext } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import DeepContext from '../../../context/DeepContext';

const Contact = () => {
  const { showAlert } = useContext(DeepContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      if (showAlert) showAlert("Please fill in all contact fields", "warning");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      if (showAlert) showAlert("Thank you! Your message has been sent to our agricultural support team.", "success");
    }, 700);
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(226, 232, 240, 0.9)',
      borderRadius: '28px',
      padding: '48px',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04)',
      marginBottom: '60px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: '9999px',
          background: '#ecfdf5',
          color: '#059669',
          fontSize: '12.5px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.6px',
          marginBottom: '10px'
        }}>
          <MessageSquare size={14} /> Contact & Support
        </span>
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '32px',
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.6px'
        }}>
          Get in Touch With Us
        </h2>
        <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '580px', margin: '8px auto 0 auto' }}>
          Have questions about harvesting requests, auction participation, or industrial procurement? Our team is here to help.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '40px'
      }}>
        {/* Contact Info Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            padding: '20px',
            borderRadius: '16px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#ecfdf5',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Mail size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Email Support</h4>
              <p style={{ fontSize: '14.5px', color: '#64748b', margin: 0 }}>support@agrowaste.org</p>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '2px 0 0 0' }}>Mon-Sat: 8 AM – 8 PM IST</p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            padding: '20px',
            borderRadius: '16px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#eff6ff',
              color: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Phone size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Farmer Toll-Free Helpline</h4>
              <p style={{ fontSize: '14.5px', color: '#64748b', margin: 0 }}>1800-AGRO-WASTE (Toll Free)</p>
              <p style={{ fontSize: '13px', color: '#94a3b8', margin: '2px 0 0 0' }}>Dedicated regional language support</p>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            padding: '20px',
            borderRadius: '16px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: '#fffbeb',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <MapPin size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Central Biomass Exchange Hub</h4>
              <p style={{ fontSize: '14.5px', color: '#64748b', margin: 0 }}>AgroTech Innovation Complex, New Delhi, India</p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Gurpreet Singh"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                height: '46px',
                padding: '0 16px',
                borderRadius: '12px',
                border: '1.5px solid #cbd5e1',
                fontSize: '14.5px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="name@domain.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                height: '46px',
                padding: '0 16px',
                borderRadius: '12px',
                border: '1.5px solid #cbd5e1',
                fontSize: '14.5px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              Your Message or Inquiry
            </label>
            <textarea
              required
              rows={4}
              placeholder="How can we assist you with agricultural waste or auctions?"
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '12px',
                border: '1.5px solid #cbd5e1',
                fontSize: '14.5px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '15px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            <Send size={18} />
            <span>{submitting ? 'Sending...' : 'Send Message'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
