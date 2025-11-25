import React, { useState } from "react";
import { createAgentContact } from "../../services/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface DetailsProps {
  id?: number;
  type?: string;
  name?: string;
  images?: string[];
  price?: string;
  city?: string;
  neighborhood?: string;
  description?: string;
  sqFtOrArea?: string;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
}

const Details: React.FC<DetailsProps> = ({
  type,
  id,
  name,
  images = [],
  price,
  city,
  neighborhood,
  description,
  sqFtOrArea,
  bedrooms,
  bathrooms,
  amenities = ["Swimming Pool", "Gym", "Parking", "24/7 Security"],
}) => {
  const [active, setActive] = useState(0);
  const { token, isLoggedIn } = useSelector((state: RootState) => state.auth);

  const next = () => setActive((prev) => (prev + 1) % images.length);
  const prev = () => setActive((prev) => (prev - 1 + images.length) % images.length);

  const handleContactClick = async () => {
    if (!isLoggedIn || !token) {
      alert("You have to login to use this feature");
      return;
    }
    try {
      const data = { target_type: type, target_id: id };
      const response = await createAgentContact(data, token);
      console.log("Contact saved:", response.data);
      alert("Thank you! our agent will contact you soon");
    } catch (error) {
      console.error(error);
      alert("Failed to contact agent");
    }
  };

  return (
    <div style={styles.container}>
      {/* Top Section */}
      <div style={styles.topSection}>
        {/* Image Slider */}
        <div style={styles.sliderContainer}>
          {images.length > 0 && <img src={images[active]} style={styles.image} alt={name} />}
          {images.length > 1 && (
            <>
              <button onClick={prev} style={{ ...styles.arrow, left: "0px" }}>‹</button>
              <button onClick={next} style={{ ...styles.arrow, right: "0px" }}>›</button>
            </>
          )}
          <div style={styles.dots}>
            {images.map((_, index) => (
              <div
                key={index}
                style={{ ...styles.dot, background: index === active ? "#f0b44d" : "#ddd" }}
              />
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div style={styles.infoPanel}>
          {name && <h1 style={styles.price}>{name}</h1>}
          {price && <h1 style={styles.price}>OMR {price}</h1>}
          {typeof bedrooms === "number" && bedrooms > 0 && <div style={styles.infoText}>Bedrooms: {bedrooms}</div>}
          {typeof bathrooms === "number" && bathrooms > 0 && <div style={styles.infoText}>Bathrooms: {bathrooms}</div>}
          {sqFtOrArea && <div style={styles.infoText}>Area: {sqFtOrArea}</div>}

          <button style={styles.contactBtn} onClick={handleContactClick}>
            Contact Agent
          </button>

          {(city || neighborhood) && (
            <div style={styles.location}>
              Location: {city} {neighborhood ? `- ${neighborhood}` : ""}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Description</h2>
          <p style={styles.description}>{description}</p>
        </div>
      )}

      {/* Amenities */}
      {amenities.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Amenities</h2>
          <div style={styles.amenities}>
            <div style={styles.mapBox}>
              <img src="/images/amenities.png" style={styles.mapImage} alt="Map" />
            </div>
            <ul style={styles.amenitiesList}>
              {amenities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;




const styles: any = {
  container: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
  },

  topSection: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
  },

  sliderContainer: {
    flex: "1 1 60%",
    position: "relative",
    background: "#fff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
    borderRadius: "16px",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "440px",
    objectFit: "cover",
  },

  arrow: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "none",
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
    cursor: "pointer",
    fontSize: "20px",
  },

  dots: {
    position: "absolute",
    bottom: "16px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },

  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },

  infoPanel: {
    flex: "1 1 35%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  price: {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "16px",
  },

  infoText: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "6px",
  },

  contactBtn: {
    marginTop: "20px",
    padding: "14px 28px",
    background: "linear-gradient(135deg, #f0b44d, #e5a73d)",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    width: "fit-content",
  },

  location: {
    marginTop: "16px",
    fontSize: "15px",
    color: "#666",
  },

  section: {
    marginTop: "40px",
  },

  sectionTitle: {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "12px",
  },

  description: {
    lineHeight: "1.7",
    color: "#555",
    maxWidth: "900px",
  },

  amenities: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    alignItems: "center",
  },

  mapBox: {
    width: "160px",
    height: "160px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
  },

  mapImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  amenitiesList: {
    fontSize: "16px",
    lineHeight: "2",
    color: "#444",
  },
};
