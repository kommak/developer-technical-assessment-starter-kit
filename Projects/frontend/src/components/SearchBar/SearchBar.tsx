import React from "react";

const SearchBar: React.FC = () => {
  return (
    <section
      style={{
        width: "100%",
        minHeight: "30vh",               // section height like other sections
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        backgroundColor: "#f9fafb",     // light section background
        boxSizing: "border-box",
      }}
    >
      <form
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "900px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Search Icon */}
        <div
          style={{
            padding: "0 1.2rem",
            display: "flex",
            alignItems: "center",
            color: "#555",
            fontSize: "1.25rem",
          }}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Input */}
        <input
          type="search"
          placeholder="Search by location, keywords..."
          style={{
            flex: 1,
            border: "none",
            fontSize: "1rem",
            padding: "1.2rem 0",
            outline: "none",
            minWidth: 0,
          }}
        />

        {/* Button */}
        <button
          type="submit"
          style={{
            backgroundColor: "#0a1e4a",
            border: "none",
            padding: "0 1.2rem",
            height: "100%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopRightRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        >
         
        </button>
      </form>
    </section>
  );
};

export default SearchBar;
