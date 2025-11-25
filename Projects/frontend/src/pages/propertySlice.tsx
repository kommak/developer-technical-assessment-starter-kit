import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import Details from '../components/Details/Details';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertyById, PropertyType } from '../store/slices/propertySlice';
import { RootState, AppDispatch } from '../store/store';

type PropertyParams = {
  id: string;
  type?: PropertyType;
};

const PropertyDetails: React.FC = () => {
  const { id, type } = useParams<PropertyParams>();
  const dispatch = useDispatch<AppDispatch>();
  const { property, loading, error } = useSelector((state: RootState) => state.property);

  useEffect(() => {
    if (!id || !type) return;
    dispatch(fetchPropertyById({ id: Number(id), type }));
  }, [id, type, dispatch]);

  if (loading) return <p>Loading property details...</p>;
  if (error) return <p>{error}</p>;
  if (!property) return <p>Property not found.</p>;

  return (
    <div>
      <SearchBar />
      <Details
        name={property.name}
        id={property.id}
        type={type}
        images={property.image_urls}
        price={property.price}
        city={property.city}
        neighborhood={property.neighborhood}
        description={property.details}
        bedrooms={property.bedrooms || 0}
        bathrooms={property.bathrooms || 0}
        amenities={property.amenities}
        sqFtOrArea={property.sq_ft_or_area}
      />
    </div>
  );
};

export default PropertyDetails;
