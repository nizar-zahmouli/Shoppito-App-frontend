import React from "react";
import "./FooterLinks.scss";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logoImg from "../../assets/shopito_logo.png";
const FooterLinks = () => {
  return (
    <>
      <section className="contact-section">
        <div className="container contact">
          <div className="contact-icon">
            <FaFacebookF className="i" />
            <FaInstagram className="i" />
            <FaTwitter className="i" />
            <FaYoutube className="i" />
          </div>
          <h2>Let's Talk ?</h2>
          <a href="#home" className="btn btn-dark">
            Make an enquiry!
          </a>
        </div>
      </section>
      <section className="footer-section">
        <div className="container footer">
          <div className="footer-logo">
            <img src={logoImg} alt="logo" />
          </div>
          <div className="footer-menu">
            <p className="link-heading">features</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">Link Shortening</a>
              </li>
              <li>
                <a href="#home">Branded Links</a>
              </li>
              <li>
                <a href="#home">Analytics</a>
              </li>
              <li>
                <a href="#home">Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Ressources</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">Blog</a>
              </li>
              <li>
                <a href="#home">Developer</a>
              </li>
              <li>
                <a href="#home">Support</a>
              </li>
              <li>
                <a href="#home">Docs</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Company</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">About</a>
              </li>
              <li>
                <a href="#home">Our Team</a>
              </li>
              <li>
                <a href="#home">Career</a>
              </li>
              <li>
                <a href="#home">contact</a>
              </li>
            </ul>
          </div>

          <div className="footer-menu">
            <p className="link-heading">Partners</p>
            <ul className="nav-ul footer-links">
              <li>
                <a href="#home">About</a>
              </li>
              <li>
                <a href="#home">Our Team</a>
              </li>
              <li>
                <a href="#home">Career</a>
              </li>
              <li>
                <a href="#home">contact</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default FooterLinks;
