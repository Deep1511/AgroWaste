import React, { useState } from 'react';
import { Target, Users, Globe2, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';

const Aboutus = () => {
  const [expanded, setExpanded] = useState(false);

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
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
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
          <Globe2 size={14} /> Our Mission
        </span>
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '32px',
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.6px'
        }}>
          About AgroWaste
        </h2>
        <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '640px', margin: '8px auto 0 auto' }}>
          Pioneering a sustainable, circular economy that eliminates stubble burning while empowering rural farm communities.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{
          padding: '24px',
          borderRadius: '18px',
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
            marginBottom: '16px'
          }}>
            <Target size={22} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Zero-Burn Vision
          </h3>
          <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
            Our goal is to eliminate open-air stubble burning completely by 2030 through accessible mechanized collection and reliable commercial off-take.
          </p>
        </div>

        <div style={{
          padding: '24px',
          borderRadius: '18px',
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
            marginBottom: '16px'
          }}>
            <Users size={22} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Farmer Prosperity
          </h3>
          <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
            Turning agricultural waste from an operational liability into a supplemental revenue stream through digital transparent market bidding.
          </p>
        </div>

        <div style={{
          padding: '24px',
          borderRadius: '18px',
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
            marginBottom: '16px'
          }}>
            <CheckCircle size={22} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
            Clean Biomass Sourcing
          </h3>
          <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.6 }}>
            Providing bio-refineries, paper mills, and green power plants with standardized, dependable, high-volume agricultural biomass supplies.
          </p>
        </div>
      </div>

      {expanded && (
        <div style={{
          padding: '24px',
          borderRadius: '18px',
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          marginBottom: '24px',
          animation: 'toastSlideIn 0.3s ease'
        }}>
          <p style={{ fontSize: '15px', color: '#065f46', lineHeight: 1.7, marginBottom: '12px' }}>
            We work closely with regional farmer cooperatives, agricultural universities, and industrial energy partners to establish local collection depots.
            Our platform manages the entire lifecycle — from the farmer's initial harvesting request, through moisture and weight verification, to live digital auctions and automated logistics.
          </p>
          <p style={{ fontSize: '15px', color: '#065f46', lineHeight: 1.7 }}>
            By replacing fossil coal with compacted agricultural briquettes and pellets, we help industrial buyers earn carbon credits while driving sustainable rural development.
          </p>
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: '1.5px solid #059669',
            color: '#059669',
            padding: '10px 24px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '14.5px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#ecfdf5';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <span>{expanded ? 'Show Less Information' : 'Learn More About Us'}</span>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>
    </div>
  );
};

export default Aboutus;
