import React, { useState } from 'react';

const HeroSection: React.FC = () => {
  const [showInput, setShowInput] = useState(false);

  const handleClick = () => {
    setShowInput((prev) => !prev); // toggle input visibility
  };
  return (
    <section
      style={{
        width: '100%',
        padding: '6rem 1rem',
        backgroundColor: '#fafafa',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1200,
          textAlign: 'center',
          borderRadius: 8,
          boxShadow: '0 0 12px rgba(0,0,0,0.08)',
          padding: '3rem 2rem',
        }}
      >
        <h1
          style={{
            fontWeight: 'bold',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            marginBottom: '1rem',
          }}
        >
          Unlock Your Dream Home
        </h1>
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            marginBottom: '2rem',
            color: '#333',
          }}
        >
          Find the perfect property with flexible options and expert guidance.
        </p>
        <button
          style={{
            backgroundColor: '#d6a94e',
            color: 'white',
            border: '1px solid #a8863a',
            padding: '0.75rem 2.5rem',
            borderRadius: 4,
            fontWeight: 'bold',
            fontSize: '1.25rem',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
           type="button"
        onClick={handleClick}
        >
          Search
        </button>
           {showInput && (
        <input
          type="text"
          placeholder="Type your search..."
          style={{
            display: 'block',
            marginTop: 10,
            padding: '0.5rem 1rem',
            borderRadius: 4,
            border: '1px solid #ccc',
            fontSize: '1rem',
            width: '100%',
          }}
        />
      )} 
      </div>
    </section>
  );
};

export default HeroSection;
