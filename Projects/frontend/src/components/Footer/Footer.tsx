// Footer.tsx
import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">OHB</div>
      </div>

      <div className="footer-bottom">
        <div className="footer-column">
          <h4>OUR SERVICES</h4>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Features</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>QUICK LINK</h4>
          <ul>
            <li>Knowledge Base</li>
            <li>Hire An Expert</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>RESOURCES</h4>
          <ul>
            <li>Knowledge Base</li>
            <li>Hire An Expert</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>IMPORTANT LINK</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms & Condition</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;