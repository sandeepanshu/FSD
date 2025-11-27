import React from "react";

const Footer: React.FC = () => {
  return (
    <React.Fragment>
      <footer
        className="text-white pt-5"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        {/* Main Footer Content */}
        <div className="container">
          <div className="row g-4 pb-4">
            {/* Brand & Description */}
            <div className="col-lg-4 col-md-6">
              <h4 className="fw-bold mb-3">
                <i className="fas fa-shopping-bag me-2"></i>
                ShopHub
              </h4>
              <p className="text-white-50 mb-3" style={{ maxWidth: "300px" }}>
                Your trusted destination for quality products at unbeatable
                prices. Shop the latest trends with fast delivery and
                exceptional service.
              </p>
              <div className="d-flex gap-3 mt-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h5 className="fw-bold mb-3">Shop</h5>
              <ul className="list-unstyled footer-links">
                <li>
                  <a href="/products/men" className="text-white-50">
                    Men's Wear
                  </a>
                </li>
                <li>
                  <a href="/products/women" className="text-white-50">
                    Women's Wear
                  </a>
                </li>
                <li>
                  <a href="/products/kids" className="text-white-50">
                    Kids's Wear
                  </a>
                </li>
                <li>
                  <a href="/products" className="text-white-50">
                    All Products
                  </a>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="col-lg-2 col-md-6">
              <h5 className="fw-bold mb-3">Support</h5>
              <ul className="list-unstyled footer-links">
                <li>
                  <a href="/contact" className="text-white-50">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-white-50">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/shipping" className="text-white-50">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="/returns" className="text-white-50">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="/track-order" className="text-white-50">
                    Track Order
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="col-lg-4 col-md-6">
              <h5 className="fw-bold mb-3">Newsletter</h5>
              <p className="text-white-50 mb-3">
                Subscribe to get special offers, updates and exclusive deals!
              </p>
              <form className="mb-3">
                <div className="input-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    aria-label="Email for newsletter"
                    style={{
                      borderRadius: "20px 0 0 20px",
                      border: "none",
                    }}
                  />
                  <button
                    className="btn btn-light fw-bold px-4"
                    type="submit"
                    style={{
                      borderRadius: "0 20px 20px 0",
                      border: "none",
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </form>
              <div className="d-flex gap-3 mt-4">
                <i className="fas fa-credit-card fa-2x text-white-50"></i>
                <i className="fab fa-cc-visa fa-2x text-white-50"></i>
                <i className="fab fa-cc-mastercard fa-2x text-white-50"></i>
                <i className="fab fa-cc-paypal fa-2x text-white-50"></i>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-4 border-white opacity-25" />

          {/* Bottom Footer */}
          <div className="row pb-3">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0 text-white-50 small">
                &copy; 2025 ShopHub. All Rights Reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <ul className="list-inline mb-0 footer-legal-links">
                <li className="list-inline-item">
                  <a href="/privacy-policy" className="text-white-50 small">
                    Privacy Policy
                  </a>
                </li>
                <li className="list-inline-item">
                  <span className="text-white-50">|</span>
                </li>
                <li className="list-inline-item">
                  <a href="/terms" className="text-white-50 small">
                    Terms & Conditions
                  </a>
                </li>
                <li className="list-inline-item">
                  <span className="text-white-50">|</span>
                </li>
                <li className="list-inline-item">
                  <a href="/cookie-policy" className="text-white-50 small">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <a
          href="#top"
          className="back-to-top"
          aria-label="Back to top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <i className="fas fa-chevron-up"></i>
        </a>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
