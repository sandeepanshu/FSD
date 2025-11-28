import React from "react";

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section with Gradient Background */}
      <div 
        className="landing-page d-flex align-items-center justify-content-center text-center position-relative overflow-hidden"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        }}
      >
        {/* Overlay for better text readability */}
        <div className="position-absolute w-100 h-100" style={{ background: "rgba(0,0,0,0.2)" }}></div>
        
        <div className="container position-relative z-index-1">
          <h1 className="display-2 fw-bold text-white mb-4 animate__animated animate__fadeInDown">
            Welcome to ShopHub
          </h1>
          
          <p className="lead text-white-50 mx-auto mb-5" style={{ maxWidth: "700px", fontSize: "1.2rem" }}>
            Discover amazing products at unbeatable prices. Shop the latest trends 
            in fashion, electronics, home decor, and more. Your one-stop destination 
            for quality shopping with fast delivery.
          </p>
          
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn btn-light btn-lg px-5 py-3 shadow-4-strong">
              <i className="fas fa-shopping-bag me-2"></i>
              Start Shopping
            </button>
            <button className="btn btn-outline-light btn-lg px-5 py-3">
              View Collections
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="row mt-5 pt-5 text-white">
            <div className="col-md-4 mb-3">
              <i className="fas fa-shipping-fast fa-3x mb-3"></i>
              <h5 className="fw-bold">Free Shipping</h5>
              <p className="small text-white-50">On orders over $50</p>
            </div>
            <div className="col-md-4 mb-3">
              <i className="fas fa-shield-alt fa-3x mb-3"></i>
              <h5 className="fw-bold">Secure Payment</h5>
              <p className="small text-white-50">100% protected transactions</p>
            </div>
            <div className="col-md-4 mb-3">
              <i className="fas fa-undo fa-3x mb-3"></i>
              <h5 className="fw-bold">Easy Returns</h5>
              <p className="small text-white-50">30-day return policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Shop by Category</h2>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 shadow-2-strong hover-shadow transition">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <div className="p-5 bg-primary bg-gradient d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
                    <i className="fas fa-tshirt fa-4x text-white"></i>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Fashion</h5>
                  <p className="card-text text-muted small">Trending styles for everyone</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 shadow-2-strong hover-shadow transition">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <div className="p-5 bg-info bg-gradient d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
                    <i className="fas fa-laptop fa-4x text-white"></i>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Electronics</h5>
                  <p className="card-text text-muted small">Latest tech gadgets</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 shadow-2-strong hover-shadow transition">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <div className="p-5 bg-success bg-gradient d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
                    <i className="fas fa-couch fa-4x text-white"></i>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Home & Living</h5>
                  <p className="card-text text-muted small">Beautiful home decor</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 shadow-2-strong hover-shadow transition">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                  <div className="p-5 bg-warning bg-gradient d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
                    <i className="fas fa-gem fa-4x text-white"></i>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">Accessories</h5>
                  <p className="card-text text-muted small">Complete your look</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
