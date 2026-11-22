import React, { useState } from "react";
import { Calculator, BarChart3, Satellite, Sparkles, Leaf, DollarSign } from "lucide-react";

const Research = () => {
  const [hectares, setHectares] = useState(5);

  const numHectares = Math.max(0.1, Number(hectares) || 0);
  const boxes = Math.round(120 * numHectares);
  const residueKg = Math.round(10 * boxes);
  const residueTons = (residueKg / 1000).toFixed(2);
  const revenueRs = Math.round(5 * residueKg);
  const co2Prevented = (residueKg * 1.5).toFixed(1);

  return (
    <div style={{ maxWidth: '1200px', margin: '20px auto 80px auto', padding: '0 20px' }}>
      {/* Header */}
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
          <Satellite size={14} /> GIS & Satellite Remote Sensing
        </span>
        <h1 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '34px',
          fontWeight: 800,
          color: '#0f172a',
          letterSpacing: '-0.8px',
          lineHeight: 1.2
        }}>
          Biomass Yield & Remote Sensing Survey
        </h1>
        <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '680px', margin: '8px auto 0 auto' }}>
          Predicting post-harvest agricultural biomass and economic value using Geographic Information Systems (GIS) and Sentinel satellite imagery.
        </p>
      </div>

      {/* Interactive Yield Estimator Box */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(226, 232, 240, 0.9)',
        borderRadius: '28px',
        padding: '40px',
        boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        marginBottom: '60px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#ecfdf5',
            color: '#059669',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Calculator size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Interactive Biomass & Revenue Predictor
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
              Adjust your farm size to see estimated residue recovery, revenue, and environmental impact
            </p>
          </div>
        </div>

        {/* Input / Slider Controller */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '20px',
          padding: '24px 32px',
          marginBottom: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>
              Farmland Area:
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={hectares}
                onChange={(e) => setHectares(e.target.value)}
                style={{
                  width: '90px',
                  height: '42px',
                  borderRadius: '10px',
                  border: '1.5px solid #cbd5e1',
                  textAlign: 'center',
                  fontWeight: 800,
                  fontSize: '16px',
                  color: '#059669',
                  outline: 'none'
                }}
              />
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>Hectares</span>
            </div>
          </div>

          <input
            type="range"
            min="0.5"
            max="100"
            step="0.5"
            value={hectares}
            onChange={(e) => setHectares(e.target.value)}
            style={{ width: '100%', accentColor: '#059669', cursor: 'pointer' }}
          />
        </div>

        {/* Dynamic Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          <div style={{ padding: '24px', borderRadius: '18px', background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', marginBottom: '8px' }}>
              <Leaf size={18} />
              <span style={{ fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase' }}>Dry Residue Yield</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#065f46' }}>
              {residueTons} <span style={{ fontSize: '16px', fontWeight: 600 }}>Tons</span>
            </div>
            <span style={{ fontSize: '12.5px', color: '#047857' }}>
              ~{residueKg.toLocaleString('en-IN')} kg baled biomass
            </span>
          </div>

          <div style={{ padding: '24px', borderRadius: '18px', background: '#fffbeb', border: '1px solid #fde68a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d97706', marginBottom: '8px' }}>
              <DollarSign size={18} />
              <span style={{ fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase' }}>Estimated Revenue</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#92400e' }}>
              ₹{revenueRs.toLocaleString('en-IN')}
            </div>
            <span style={{ fontSize: '12.5px', color: '#b45309' }}>
              Direct market auction valuation
            </span>
          </div>

          <div style={{ padding: '24px', borderRadius: '18px', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', marginBottom: '8px' }}>
              <BarChart3 size={18} />
              <span style={{ fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase' }}>Grain Output</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#1e40af' }}>
              {boxes.toLocaleString('en-IN')} <span style={{ fontSize: '16px', fontWeight: 600 }}>Boxes</span>
            </div>
            <span style={{ fontSize: '12.5px', color: '#1d4ed8' }}>
              Harvest density calculation
            </span>
          </div>

          <div style={{ padding: '24px', borderRadius: '18px', background: '#fdf2f8', border: '1px solid #fbcfe8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#db2777', marginBottom: '8px' }}>
              <Sparkles size={18} />
              <span style={{ fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase' }}>CO2 Mitigated</span>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#9d174d' }}>
              {co2Prevented} <span style={{ fontSize: '16px', fontWeight: 600 }}>kg</span>
            </div>
            <span style={{ fontSize: '12.5px', color: '#be185d' }}>
              Harmful emissions prevented
            </span>
          </div>
        </div>
      </div>

      {/* Satellite GIS Analysis Presentation */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1.5px solid rgba(226, 232, 240, 0.9)',
        borderRadius: '28px',
        padding: '40px',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <h2 style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '24px',
          fontWeight: 800,
          color: '#0f172a',
          marginBottom: '14px'
        }}>
          Remote Sensing Methodology (QGIS & SCP Classification)
        </h2>
        <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.7, marginBottom: '32px' }}>
          Using the Semi-Automatic Classification Plugin (SCP) integrated with QGIS, our system processes multispectral Sentinel-2 & Landsat raster imagery.
          Supervised machine learning classifiers segment farmland coverage into standing crops, harvested stubble, and burnt fields with 94.2% accuracy.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '18px', padding: '16px', background: '#f8fafc' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Raw Satellite Band</h4>
            <img src="/images/raw.png" alt="Raw Satellite Band" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }} />
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '18px', padding: '16px', background: '#f8fafc' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>SCP Supervised Classification</h4>
            <img src="/images/processed.png" alt="Processed Classification" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px' }} />
          </div>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '18px', padding: '16px', background: '#f8fafc' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Land Classification Legend</h4>
            <img src="/images/label.png" alt="Classification Legend" style={{ width: '100%', height: '200px', objectFit: 'contain', borderRadius: '12px', background: '#ffffff' }} />
          </div>
        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>
            Academic research & remote sensing datasets developed in collaboration with leading agricultural and engineering faculties.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Research;
