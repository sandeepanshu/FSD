import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { buyPizza } from "../redux/pizzahut";
import type { RootState } from "../redux/store";

const PizzaHut: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.pizza.count);

  return (
    <section className="bg-light py-5">
      <div className="container">
        {/* Header Section */}
        <div className="row mb-5">
          <div className="col text-center">
            <i
              className="fas fa-pizza-slice text-danger mb-3"
              style={{ fontSize: "3rem" }}
            ></i>
            <h1 className="fw-bold text-dark mb-3">🍕 Welcome to PizzaHut</h1>
            <p className="text-muted lead">
              Experience the finest pizzas crafted with fresh ingredients and
              authentic recipes. Order your favorite pizza today!
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="row g-4">
          <div className="col-md-12">
            <div className="card shadow-lg border-0 overflow-hidden">
              <div className="row g-0">
                {/* Image */}
                <div className="col-md-6">
                  <img
                    src="https://b.zmtcdn.com/data/pictures/4/90384/ba50a5176f9b3abf84a4b734543474a2.jpg"
                    alt="Pizza"
                    className="img-fluid h-100 object-fit-cover"
                    style={{ minHeight: "400px" }}
                  />
                </div>

                {/* Content */}
                <div className="col-md-6">
                  <div className="card-body p-5 d-flex flex-column justify-content-center">
                    {/* Title */}
                    <div className="d-flex align-items-center mb-3">
                      <h2 className="fw-bold mb-0 me-3">Veg Pepperoni Pizza</h2>
                      <span className="badge bg-success">Vegetarian</span>
                    </div>

                    {/* Rating */}
                    <div className="mb-3">
                      <i className="fas fa-star text-warning me-1"></i>
                      <i className="fas fa-star text-warning me-1"></i>
                      <i className="fas fa-star text-warning me-1"></i>
                      <i className="fas fa-star text-warning me-1"></i>
                      <i className="fas fa-star-half-alt text-warning me-2"></i>
                      <span className="text-muted">(4.5/5 - 250 reviews)</span>
                    </div>

                    {/* Description */}
                    <p className="text-muted mb-4">
                      Indulge in our signature Veg Pepperoni Pizza, topped with
                      fresh vegetables, premium mozzarella cheese and special
                      Italian herbs. Wood-fired for perfection.
                    </p>

                    {/* Stock */}
                    <div className="mb-4 p-4 bg-light rounded">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <p className="text-muted mb-1 small">
                            Available in Store
                          </p>
                          <h3 className="fw-bold mb-0">
                            <i className="fas fa-box text-primary me-2"></i>
                            {count} {count === 1 ? "Pizza" : "Pizzas"}
                          </h3>
                        </div>

                        {/* Stock Badge */}
                        <div>
                          {count > 10 ? (
                            <span className="badge bg-success p-2">
                              In Stock
                            </span>
                          ) : count > 0 ? (
                            <span className="badge bg-warning p-2">
                              Low Stock
                            </span>
                          ) : (
                            <span className="badge bg-danger p-2">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price & Button */}
                    <div className="row align-items-center">
                      <div className="col-6">
                        <p className="text-muted mb-1 small">Price</p>
                        <h3 className="fw-bold text-success mb-0">$12.99</h3>
                      </div>
                      <div className="col-6">
                        <button
                          onClick={() => dispatch(buyPizza())}
                          className="btn btn-success btn-lg w-100 shadow-sm"
                          disabled={count === 0}
                        >
                          <i className="fas fa-shopping-cart me-2"></i>
                          {count > 0 ? "Buy Now" : "Sold Out"}
                        </button>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mt-4 pt-4 border-top">
                      <div className="row text-center">
                        <div className="col-4">
                          <i
                            className="fas fa-truck text-primary mb-2"
                            style={{ fontSize: "2rem" }}
                          ></i>
                          <p className="small text-muted mb-0">Fast Delivery</p>
                        </div>
                        <div className="col-4">
                          <i
                            className="fas fa-leaf text-success mb-2"
                            style={{ fontSize: "2rem" }}
                          ></i>
                          <p className="small text-muted mb-0">
                            Fresh Ingredients
                          </p>
                        </div>
                        <div className="col-4">
                          <i
                            className="fas fa-fire text-danger mb-2"
                            style={{ fontSize: "2rem" }}
                          ></i>
                          <p className="small text-muted mb-0">Hot & Crispy</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="row mt-4 g-4">
          <div className="col-md-4">
            <div className="card h-100 text-center p-4 shadow-sm border-0">
              <i
                className="fas fa-clock text-warning mb-3"
                style={{ fontSize: "3rem" }}
              ></i>
              <h5 className="fw-bold">30 Min Delivery</h5>
              <p className="text-muted small mb-0">
                Get your pizza delivered hot and fresh within 30 minutes!
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 text-center p-4 shadow-sm border-0">
              <i
                className="fas fa-award text-success mb-3"
                style={{ fontSize: "3rem" }}
              ></i>
              <h5 className="fw-bold">Quality Guaranteed</h5>
              <p className="text-muted small mb-0">
                Premium ingredients, 100% satisfaction guaranteed.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 text-center p-4 shadow-sm border-0">
              <i
                className="fas fa-phone-alt text-primary mb-3"
                style={{ fontSize: "3rem" }}
              ></i>
              <h5 className="fw-bold">24/7 Support</h5>
              <p className="text-muted small mb-0">
                Our team is always ready to assist you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PizzaHut;
