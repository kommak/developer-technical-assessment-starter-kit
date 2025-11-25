import React, { useEffect } from "react";
import "./PopularProperties.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularProperties, Property } from '../../store/slices/popularPropertiesSlice';
import { RootState, AppDispatch } from '../../store/store';

const PropertyCard: React.FC<Property> = ({ id, type, priceLabel, description, imageUrl }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/property/${type}/${id}`);
  };

  return (
    <div className="property-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={imageUrl} alt="Property" className="property-image" />
      <div className="property-info">
        <h3 className="property-price">{priceLabel}</h3>
        <p className="property-desc">{description}</p>
        <div className="property-footer">
          <span className="details-text">Details</span>
        </div>
      </div>
    </div>
  );
};

const PopularProperties: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, loading, error } = useSelector((state: RootState) => state.popularProperties);

  useEffect(() => {
    dispatch(fetchPopularProperties());
  }, [dispatch]);

  if (loading) return <p>Loading popular properties...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="popular-properties">
      <h2 className="section-title">Most Popular Properties</h2>
      <div className="properties-grid">
        {properties.map((p) => (
          <PropertyCard
            key={p.id}
            id={p.id}
            type={p.type}
            priceLabel={p.priceLabel}
            description={p.description}
            imageUrl={p.imageUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularProperties;
