import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../../redux/users/user.slice";
import { type AppDispatch } from "../../../../redux/store";
import brandImage from "../../../../assets/img/brandImage.png";
import "./UserRegister.css";

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface IUserError {
  nameError: string;
  emailError: string;
  passwordError: string;
}

const UserRegister: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [userState, setUserState] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });

  const [userErrorState, setUserErrorState] = useState<IUserError>({
    nameError: "",
    emailError: "",
    passwordError: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Validate Name
  const validateUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserState({ ...userState, name: value });

    if (value.length === 0) {
      setUserErrorState({ ...userErrorState, nameError: "" });
    } else if (value.length < 3) {
      setUserErrorState({
        ...userErrorState,
        nameError: "Name must be at least 3 characters",
      });
    } else if (value.length > 50) {
      setUserErrorState({
        ...userErrorState,
        nameError: "Name must be less than 50 characters",
      });
    } else {
      setUserErrorState({ ...userErrorState, nameError: "" });
    }
  };

  // Validate Email
  const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserState({ ...userState, email: value });
    const regExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (value.length === 0) {
      setUserErrorState({ ...userErrorState, emailError: "" });
    } else if (!regExp.test(value)) {
      setUserErrorState({
        ...userErrorState,
        emailError: "Enter a valid email address",
      });
    } else {
      setUserErrorState({ ...userErrorState, emailError: "" });
    }
  };

  // Validate Password
  const validatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUserState({ ...userState, password: value });

    if (value.length === 0) {
      setUserErrorState({ ...userErrorState, passwordError: "" });
    } else if (value.length < 6) {
      setUserErrorState({
        ...userErrorState,
        passwordError: "Password must be at least 6 characters",
      });
    } else if (!/(?=.*[a-z])/.test(value)) {
      setUserErrorState({
        ...userErrorState,
        passwordError: "Password must contain at least one lowercase letter",
      });
    } else if (!/(?=.*[A-Z])/.test(value)) {
      setUserErrorState({
        ...userErrorState,
        passwordError: "Password must contain at least one uppercase letter",
      });
    } else if (!/(?=.*\d)/.test(value)) {
      setUserErrorState({
        ...userErrorState,
        passwordError: "Password must contain at least one number",
      });
    } else {
      setUserErrorState({ ...userErrorState, passwordError: "" });
    }
  };

  // Submit Register
  const submitRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      userErrorState.nameError ||
      userErrorState.emailError ||
      userErrorState.passwordError
    ) {
      return;
    }

    if (!userState.name || !userState.email || !userState.password) {
      return;
    }

    try {
      await dispatch(registerUser(userState)).unwrap();
      navigate("/users/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        {/* Left Column - Gradient Side */}
        <div className="register-left-column">
          <div className="register-branding">
            <div className="brand-logo-container">
              <img
                src={brandImage}
                alt="ShopHub"
                className="brand-logo-large"
              />
            </div>
            <h1 className="brand-title">Join ShopHub Today</h1>
            <p className="brand-subtitle">
              Create your account and unlock exclusive benefits, personalized
              recommendations, and seamless shopping experience.
            </p>

            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="benefit-text">
                  <h4>Exclusive Deals</h4>
                  <p>Access member-only discounts and offers</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="benefit-text">
                  <h4>Wishlist & Favorites</h4>
                  <p>Save products and get notified of price drops</p>
                </div>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <i className="fas fa-bolt"></i>
                </div>
                <div className="benefit-text">
                  <h4>Fast Checkout</h4>
                  <p>Save addresses and payment info for quick orders</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="trust-badge">
                <i className="fas fa-users"></i>
                <div>
                  <strong>50K+</strong>
                  <span>Happy Customers</span>
                </div>
              </div>
              <div className="trust-badge">
                <i className="fas fa-star"></i>
                <div>
                  <strong>4.8/5</strong>
                  <span>Average Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Registration Form */}
        <div className="register-right-column">
          <div className="register-form-container">
            <div className="register-header">
              <h2 className="register-title">Create Account</h2>
              <p className="register-subtitle">
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={submitRegister} className="register-form">
              {/* Name Input */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <div className="input-wrapper">
                  <i className="fas fa-user input-icon"></i>
                  <input
                    id="name"
                    name="name"
                    value={userState.name}
                    onChange={validateUser}
                    type="text"
                    className={`form-input ${
                      userErrorState.nameError ? "input-error" : ""
                    }`}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                {userErrorState.nameError && (
                  <span className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    {userErrorState.nameError}
                  </span>
                )}
              </div>

              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <i className="fas fa-envelope input-icon"></i>
                  <input
                    id="email"
                    name="email"
                    value={userState.email}
                    onChange={validateEmail}
                    type="email"
                    className={`form-input ${
                      userErrorState.emailError ? "input-error" : ""
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {userErrorState.emailError && (
                  <span className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    {userErrorState.emailError}
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <i className="fas fa-lock input-icon"></i>
                  <input
                    id="password"
                    name="password"
                    value={userState.password}
                    onChange={validatePassword}
                    type={showPassword ? "text" : "password"}
                    className={`form-input ${
                      userErrorState.passwordError ? "input-error" : ""
                    }`}
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`fas ${
                        showPassword ? "fa-eye-slash" : "fa-eye"
                      }`}
                    ></i>
                  </button>
                </div>
                {userErrorState.passwordError && (
                  <span className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    {userErrorState.passwordError}
                  </span>
                )}
                {!userErrorState.passwordError && userState.password && (
                  <div className="password-strength">
                    <div className="strength-bars">
                      <div
                        className={`strength-bar ${
                          userState.password.length >= 6 ? "active" : ""
                        }`}
                      ></div>
                      <div
                        className={`strength-bar ${
                          userState.password.length >= 8 ? "active" : ""
                        }`}
                      ></div>
                      <div
                        className={`strength-bar ${
                          /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(
                            userState.password
                          ) && userState.password.length >= 10
                            ? "active"
                            : ""
                        }`}
                      ></div>
                    </div>
                    <span className="strength-text">Password strength</span>
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="terms-checkbox">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>
                    I agree to the{" "}
                    <Link to="/terms" className="terms-link">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="terms-link">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-button"
                disabled={
                  !userState.name ||
                  !userState.email ||
                  !userState.password ||
                  !!userErrorState.nameError ||
                  !!userErrorState.emailError ||
                  !!userErrorState.passwordError
                }
              >
                <span>Create Account</span>
                <i className="fas fa-arrow-right"></i>
              </button>

              {/* Divider */}
              <div className="divider">
                <span>OR</span>
              </div>

              {/* Social Registration */}
              <button type="button" className="google-button">
                <i className="fab fa-google"></i>
                <span>Sign up with Google</span>
              </button>

              {/* Login Link */}
              <div className="login-prompt">
                <span>Already have an account? </span>
                <Link to="/users/login" className="login-link">
                  Sign in
                </Link>
              </div>
            </form>

            {/* Security Badge */}
            <div className="security-badge">
              <i className="fas fa-shield-alt"></i>
              <span>Your data is protected with 256-bit encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
