import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import FeaturedPropertiesSlider from '../components/FeaturedPropertiesSlider/FeaturedPropertiesSlider';
import PopularProperties from '../components/PopularProperties/PopularProperties';

const LandingPage: React.FC = () => {
  return (
     <div>
      <HeroSection />
      <FeaturedPropertiesSlider />
      <PopularProperties />
    </div>
  );
};

export default LandingPage;
