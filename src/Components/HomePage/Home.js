import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Carousel from '../homeComponent/CarouselPage/Carousel';
import { countries } from '../homeComponent/CarouselPage/Data';
import Piechart from '../homeComponent/piechart/Piechart';
import Contact from '../homeComponent/ContactUsPage/Contact';
import Aboutus from '../homeComponent/AboutUs/Aboutus';
import {
  Tractor,
  Building,
  ArrowRight,
  TrendingUp,
  Leaf,
  ShieldCheck,
  Flame,
  AlertOctagon,
  Sparkles,
  BarChart3
} from 'lucide-react';
import './HomeStyle.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page-container" id="HOME">
      {/* Hero Carousel */}
      <div className="hero-wrapper">
        <Carousel images={countries} />

        {/* Quick Action Navigation Strip */}
        <div className="quick-action-strip">
          <Link to="/OptionSignup" className="action-pill-btn action-pill-farmer">
            <Tractor size={18} />
            <span>I am a Farmer (Sell Residue)</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/OptionSignup" className="action-pill-btn action-pill-buyer">
            <Building size={18} />
            <span>I am an Industrial Buyer (Bid)</span>
            <ArrowRight size={16} />
          </Link>
          <a href="#about" className="action-pill-btn action-pill-explore">
            <Sparkles size={18} color="#059669" />
            <span>Explore Mission & Solutions</span>
          </a>
        </div>
      </div>

      {/* Impact Metrics Banner */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#ecfdf5', color: '#059669' }}>
            <Leaf size={26} strokeWidth={2.2} />
          </div>
          <div>
            <div className="metric-val">500M+</div>
            <div className="metric-lbl">Tons Agro Residue / Yr</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#fef2f2', color: '#ef4444' }}>
            <Flame size={26} strokeWidth={2.2} />
          </div>
          <div>
            <div className="metric-val">92M</div>
            <div className="metric-lbl">Tons Burnt Stubble Target</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#fffbeb', color: '#d97706' }}>
            <TrendingUp size={26} strokeWidth={2.2} />
          </div>
          <div>
            <div className="metric-val">100%</div>
            <div className="metric-lbl">Fair Digital Price Discovery</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <ShieldCheck size={26} strokeWidth={2.2} />
          </div>
          <div>
            <div className="metric-val">Clean Air</div>
            <div className="metric-lbl">Zero Respiratory Hazards</div>
          </div>
        </div>
      </div>

      {/* Core Narrative / Feature Rows */}
      <div className="feature-section">
        {/* Story 1: The Pollution Crisis */}
        <div className="feature-row">
          <div className="feature-text-side">
            <span className="feature-tag tag-red">
              <AlertOctagon size={14} /> The Stubble Burning Crisis
            </span>
            <h2 className="feature-title">
              Smog, Public Health Emergencies, and Toxic Winter Air
            </h2>
            <p className="feature-desc">
              Over 80% of North Indian cities face severe hazardous air quality between October and December.
              Open-field stubble burning unleashes massive plumes of particulate matter (PM2.5), CO, and NOx,
              forcing school closures, emergency lockdowns, and chronic respiratory illness across millions of households.
            </p>
          </div>
          <div className="feature-image-side">
            <img src="/images/farm2.jpg" alt="Agricultural Field Burning" className="feature-img" />
          </div>
        </div>

        {/* Story 2: The Farmer's Dilemma */}
        <div className="feature-row reverse">
          <div className="feature-text-side">
            <span className="feature-tag tag-amber">
              <Tractor size={14} /> Economic Reality
            </span>
            <h2 className="feature-title">
              Why Farmers Were Forced to Burn Post-Harvest Residue
            </h2>
            <p className="feature-desc">
              Between the harvest of paddy and sowing of wheat, farmers have barely a 15-day window to clear millions of acres.
              Specialized balers and combine machinery are capital-intensive, and manual clearing is unaffordable.
              Without a direct market to monetize agricultural biomass, burning was historically the only viable option.
            </p>
          </div>
          <div className="feature-image-side">
            <img src="/images/farmer1.jpeg" alt="Farmer Working in Field" className="feature-img" />
          </div>
        </div>

        {/* Story 3: The Circular Solution */}
        <div className="feature-row">
          <div className="feature-text-side">
            <span className="feature-tag tag-green">
              <Leaf size={14} /> The AgroWaste Solution
            </span>
            <h2 className="feature-title">
              Connecting Farmers Directly to Bio-Energy & Paper Industries
            </h2>
            <p className="feature-desc">
              AgroWaste closes the loop. Farmers request on-demand harvesting and residue collection directly from their phones.
              Collected raw biomass is cataloged into verified auction rooms, allowing paper mills, pellet makers, and bio-power plants
              to bid competitively in real-time.
            </p>
          </div>
          <div className="feature-image-side">
            <img src="/images/farm1.jpeg" alt="Harvested Crop Residue" className="feature-img" />
          </div>
        </div>
      </div>

      {/* Interactive Residue Prediction Banner */}
      <div className="prediction-banner">
        <div className="prediction-content">
          <span className="prediction-badge">
            <BarChart3 size={14} /> Predictive Biomass Analytics
          </span>
          <h2 className="prediction-title">
            Estimate Your Farm's Residue Yield & Revenue
          </h2>
          <p className="prediction-desc">
            Calculate expected crop residue output based on acreage, crop variety (Wheat, Paddy, Sugarcane, Cotton),
            and historical soil data. Uncover the untapped value of your post-harvest biomass.
          </p>
          <button
            className="btn-prediction-cta"
            onClick={() => navigate('/Research')}
          >
            <span>Explore Biomass Yield Calculator</span>
            <ArrowRight size={18} />
          </button>
        </div>
        <div className="prediction-chart-box">
          <Piechart />
        </div>
      </div>

      {/* About Us Section */}
      <div id="about">
        <Aboutus />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
