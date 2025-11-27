import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../../redux/users/user.slice";
import { type AppDispatch } from "../../../../redux/store";
import brandImage from "../../../../assets/img/brandImage.png";
import "./UserLogin.css";

interface IUser {
  email: string;
  password: string;
}

interface IUserError {
  emailError: string;
  passwordError: string;
}

const UserLogin: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [userState, setUserState] = useState<IUser>({
    email: "",
    password: "",
  });

  const [userErrorState, setUserErrorState] = useState<IUserError>({
    emailError: "",
    passwordError: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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
    } else {
      setUserErrorState({ ...userErrorState, passwordError: "" });
    }
  };

  // Submit Login
  const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userErrorState.emailError || userErrorState.passwordError) {
      return;
    }

    if (!userState.email || !userState.password) {
      return;
    }

    try {
      await dispatch(loginUser(userState)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Column - Gradient Side */}
        <div className="login-left-column">
          <div className="login-branding">
            <div className="brand-logo-container">
              <img src={brandImage} alt="ShopHub" className="brand-logo-large" />
            </div>
            <h1 className="brand-title">Welcome to ShopHub</h1>
            <p className="brand-subtitle">
              Discover amazing products at unbeatable prices. Your one-stop
              destination for quality shopping.
            </p>
            
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-shipping-fast"></i>
                </div>
                <div className="feature-text">
                  <h4>Free Shipping</h4>
                  <p>On orders over $50</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="feature-text">
                  <h4>Secure Payment</h4>
                  <p>100% protected transactions</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-undo"></i>
                </div>
                <div className="feature-text">
                  <h4>Easy Returns</h4>
                  <p>30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="login-right-column">
          <div className="login-form-container">
            <div className="login-header">
              <h2 className="login-title">Sign In</h2>
              <p className="login-subtitle">
                Welcome back! Please enter your details
              </p>
            </div>

            <form onSubmit={submitLogin} className="login-form">
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
                    placeholder="Enter your password"
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
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" id="rememberMe" />
                  <span>Remember me</span>
                </label>
                <Link to="/users/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="submit-button"
                disabled={
                  !userState.email ||
                  !userState.password ||
                  !!userErrorState.emailError ||
                  !!userErrorState.passwordError
                }
              >
                <span>Sign In</span>
                <i className="fas fa-arrow-right"></i>
              </button>

              {/* Divider */}
              <div className="divider">
                <span>OR</span>
              </div>

              {/* Social Login */}
              <button type="button" className="google-button">
                <i className="fab fa-google"></i>
                <span>Continue with Google</span>
              </button>

              {/* Sign Up Link */}
              <div className="signup-prompt">
                <span>Don't have an account? </span>
                <Link to="/users/register" className="signup-link">
                  Sign up for free
                </Link>
              </div>
            </form>

            {/* Security Badge */}
            <div className="security-badge">
              <i className="fas fa-lock"></i>
              <span>Your information is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
