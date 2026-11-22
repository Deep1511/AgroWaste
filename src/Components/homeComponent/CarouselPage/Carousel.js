import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import "./Carousel.css";

function Carousel({ images = [] }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isPaused && images.length > 1) {
      timerRef.current = setTimeout(() => {
        setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, isPaused, images.length]);

  const slideRight = () => {
    setCurrent(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const slideLeft = () => {
    setCurrent(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!images.length) return null;

  return (
    <div
      className="modern-carousel-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((item, index) => (
        <div
          key={index}
          className={`carousel-slide-item ${index === current ? "active" : ""}`}
        >
          <img
            className="carousel-slide-img"
            src={item.image}
            alt={item.title || "AgroWaste Slide"}
          />
          <div className="carousel-glass-overlay">
            <span className="carousel-slide-badge">
              <Sparkles size={14} /> Mission 2030
            </span>
            <h2 className="carousel-slide-title">{item.title}</h2>
            {item.subtitle && (
              <p className="carousel-slide-desc">{item.subtitle}</p>
            )}
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        className="carousel-nav-btn carousel-btn-prev"
        onClick={slideLeft}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="carousel-nav-btn carousel-btn-next"
        onClick={slideRight}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="carousel-dots-wrapper">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${idx === current ? "active" : ""}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
