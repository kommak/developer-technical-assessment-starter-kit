import React, { useEffect, useState } from "react";
import "./FeaturedPropertiesSlider.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeaturedProperties, FeaturedProperty } from '../../store/slices/featuredPropertiesSlice';
import { RootState, AppDispatch } from '../../store/store';

const FeaturedPropertiesSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { properties, loading, error } = useSelector(
    (state: RootState) => state.featuredPropertiesSlice
  );

  useEffect(() => {
    dispatch(fetchFeaturedProperties());
  }, [dispatch]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? properties.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === properties.length - 1 ? 0 : prev + 1));
  };

  const goToDetails = () => {
    if (properties[currentIndex]) {
      navigate(`/property/${properties[currentIndex].type}/${properties[currentIndex].id}`);
    }
  };

  if (loading) return <p>Loading featured properties...</p>;
  if (error) return <p>Error: {error}</p>;
  if (properties.length === 0) return <p>No featured properties found.</p>;

  return (
    <div className="slider-container">
      <div className="slider-content">
        <h2 className="slider-title">Featured Properties</h2>
        <div
          className="slider-image-wrapper"
          onClick={goToDetails}
          style={{ cursor: "pointer" }}
        >
          <img
            src={properties[currentIndex].image}
            alt="Property"
            className="slider-image"
            loading="lazy"
          />
          <div className="slider-info">
            <div className="slider-price">{properties[currentIndex].price}</div>
            <div className="slider-description">{properties[currentIndex].description}</div>
          </div>
        </div>
        <div className="slider-arrows">
          <button className="arrow-btn" onClick={prevSlide} aria-label="Previous">
            &#8592;
          </button>
          <button className="arrow-btn" onClick={nextSlide} aria-label="Next">
            &#8594;
          </button>
        </div>
      </div>
      <div className="slider-dots">
        {properties.map((_, idx) => (
          <span
            key={idx}
            className={`dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPropertiesSlider;
