import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateAddress } from "../../../../redux/users/user.slice";
import { type AppDispatch, type RootState } from "../../../../redux/store";
import Spinner from "../../../layout/components/spinner/Spinner";
import { type IAddress } from "../../models/IUser";
import "./UserProfile.css";

const UserProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [enableState, setEnableState] = useState(false);
  const [editedAddress, setEditedAddress] = useState<IAddress | null>(null);

  // Read user data from Redux Store
  const { loading, user } = useSelector((state: RootState) => state.users);

  // Derive address state from user data - this is the source of truth when not editing
  const userAddress = useMemo<IAddress>(() => {
    if (user && user.address) {
      return {
        mobile: user.address.mobile || "",
        flat: user.address.flat || "",
        street: user.address.street || "",
        landmark: user.address.landmark || "",
        city: user.address.city || "",
        state: user.address.state || "",
        country: user.address.country || "",
        pin: user.address.pin || "",
      };
    }
    return {
      mobile: "",
      flat: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      pin: "",
    };
  }, [user]);

  // Use edited address when in edit mode, otherwise use user address from store
  const addressState =
    enableState && editedAddress ? editedAddress : userAddress;

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const changeAddressInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedAddress({
      ...(editedAddress || userAddress),
      [event.target.name]: event.target.value,
    });
  };

  const switchEnableState = () => {
    if (!enableState) {
      // Entering edit mode - copy current address to edited state
      setEditedAddress(userAddress);
    } else {
      // Canceling edit mode - clear edited state
      setEditedAddress(null);
    }
    setEnableState(!enableState);
  };

  const submitUpdateAddress = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!editedAddress) return;

    try {
      await dispatch(updateAddress(editedAddress)).unwrap();
      setEnableState(false);
      setEditedAddress(null);
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  return (
    <React.Fragment>
      {/* Header Section */}
      <section
        className="text-white py-4 mb-4"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h2 className="fw-bold mb-0">
                <i className="fas fa-user-circle me-3"></i>
                Your Profile
              </h2>
              <p className="mb-0 text-white-50 mt-2">
                Manage your account information and addresses
              </p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(user).length > 0 && (
            <section className="py-4">
              <div className="container">
                <div className="row g-4">
                  {/* Profile Card */}
                  <div className="col-lg-4">
                    <div className="profile-card card border-0 shadow-lg h-100">
                      <div className="profile-header">
                        <div className="profile-avatar-wrapper">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="profile-avatar"
                          />
                          <div className="avatar-badge">
                            <i className="fas fa-check"></i>
                          </div>
                        </div>
                      </div>
                      <div className="card-body text-center pt-0">
                        <h3 className="profile-name">{user.name}</h3>
                        <p className="profile-email">
                          <i className="fas fa-envelope me-2"></i>
                          {user.email}
                        </p>
                        {user.address?.mobile && (
                          <p className="profile-phone">
                            <i className="fas fa-phone me-2"></i>
                            {user.address.mobile}
                          </p>
                        )}

                        <div className="profile-stats">
                          <div className="stat-item">
                            <i className="fas fa-shopping-bag"></i>
                            <div>
                              <strong>0</strong>
                              <span>Orders</span>
                            </div>
                          </div>
                          <div className="stat-divider"></div>
                          <div className="stat-item">
                            <i className="fas fa-heart"></i>
                            <div>
                              <strong>0</strong>
                              <span>Wishlist</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Information & Address Cards */}
                  <div className="col-lg-8">
                    {/* Personal Information */}
                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-header bg-white border-0 py-3">
                        <div className="d-flex align-items-center">
                          <div className="info-icon">
                            <i className="fas fa-id-card"></i>
                          </div>
                          <h5 className="mb-0 fw-bold">Personal Information</h5>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="info-grid">
                          <div className="info-item">
                            <label>Full Name</label>
                            <p>{user.name}</p>
                          </div>
                          <div className="info-item">
                            <label>Email Address</label>
                            <p>{user.email}</p>
                          </div>
                          <div className="info-item">
                            <label>Mobile Number</label>
                            <p>{user.address?.mobile || "Not provided"}</p>
                          </div>
                          <div className="info-item">
                            <label>Member Since</label>
                            <p>2025</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="card border-0 shadow-sm">
                      <div className="card-header bg-white border-0 py-3">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="info-icon">
                              <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <h5 className="mb-0 fw-bold">Billing Address</h5>
                          </div>
                          <button
                            onClick={switchEnableState}
                            className={`edit-btn ${
                              enableState ? "active" : ""
                            }`}
                          >
                            <i
                              className={`fas ${
                                enableState ? "fa-times" : "fa-edit"
                              }`}
                            ></i>
                            {enableState ? "Cancel" : "Edit"}
                          </button>
                        </div>
                      </div>
                      <div className="card-body">
                        {!enableState ? (
                          <div className="address-display">
                            {addressState.mobile || addressState.flat ? (
                              <>
                                <div className="address-row">
                                  <i className="fas fa-phone-alt"></i>
                                  <span>
                                    {addressState.mobile || "Not provided"}
                                  </span>
                                </div>
                                <div className="address-row">
                                  <i className="fas fa-home"></i>
                                  <span>
                                    {addressState.flat &&
                                      `${addressState.flat}, `}
                                    {addressState.street}
                                  </span>
                                </div>
                                {addressState.landmark && (
                                  <div className="address-row">
                                    <i className="fas fa-map-pin"></i>
                                    <span>{addressState.landmark}</span>
                                  </div>
                                )}
                                <div className="address-row">
                                  <i className="fas fa-city"></i>
                                  <span>
                                    {addressState.city &&
                                      `${addressState.city}, `}
                                    {addressState.state} {addressState.pin}
                                  </span>
                                </div>
                                <div className="address-row">
                                  <i className="fas fa-globe"></i>
                                  <span>{addressState.country}</span>
                                </div>
                              </>
                            ) : (
                              <div className="empty-address">
                                <i className="fas fa-map-marked-alt"></i>
                                <p>No address added yet</p>
                                <button
                                  onClick={switchEnableState}
                                  className="btn-add-address"
                                >
                                  Add Address
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <form
                            onSubmit={submitUpdateAddress}
                            className="address-form"
                          >
                            <div className="row g-3">
                              <div className="col-md-6">
                                <label className="form-label">
                                  <i className="fas fa-phone me-2"></i>
                                  Mobile Number
                                </label>
                                <input
                                  autoFocus
                                  required
                                  name="mobile"
                                  value={addressState.mobile}
                                  onChange={changeAddressInput}
                                  type="tel"
                                  className="form-control modern-input"
                                  placeholder="Enter mobile number"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  <i className="fas fa-building me-2"></i>
                                  Flat / Apartment
                                </label>
                                <input
                                  required
                                  name="flat"
                                  value={addressState.flat}
                                  onChange={changeAddressInput}
                                  type="text"
                                  className="form-control modern-input"
                                  placeholder="Flat, House no."
                                />
                              </div>
                              <div className="col-12">
                                <label className="form-label">
                                  <i className="fas fa-road me-2"></i>
                                  Street Address
                                </label>
                                <input
                                  required
                                  name="street"
                                  value={addressState.street}
                                  onChange={changeAddressInput}
                                  type="text"
                                  className="form-control modern-input"
                                  placeholder="Street name"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  <i className="fas fa-map-pin me-2"></i>
                                  Landmark
                                </label>
                                <input
                                  required
                                  name="landmark"
                                  value={addressState.landmark}
                                  onChange={changeAddressInput}
                                  type="text"
                                  className="form-control modern-input"
                                  placeholder="Nearby landmark"
                                />
                              </div>
                              <div className="col-md-6">
                                <label className="form-label">
                                  <i className="fas fa-city me-2"></i>
                                  City
                                </label>
                                <input
                                  required
                                  name="city"
                                  value={addressState.city}
                                  onChange={changeAddressInput}
                                  type="text"
                                  className="form-control modern-input"
                                  placeholder="City name"
                                />
                              </div>
                              <div className="col-md-4">
                                <label className="form-label">
                                  <i className="fas fa-map me-2"></i>
                                  State
                                </label>
                                <input
                                  required
                                  name="state"
                                  value={addressState.state}
                                  onChange={changeAddressInput}
                                  type="text"
                                  className="form-control modern-input"
                                  placeholder="State"
                                />
                              </div>
                              <div className="col-md-4">
                                <label className="form-label">
                                  <i className="fas fa-globe me-2"></i>
                                  Country
                                </label>
                                <input
                                  required
                                  name="country"
                                  value={addressState.country}
                                  onChange={changeAddressInput}
                                  type="text"
                                  className="form-control modern-input"
                                  placeholder="Country"
                                />
                              </div>
                              <div className="col-md-4">
                                <label className="form-label">
                                  <i className="fas fa-mail-bulk me-2"></i>
                                  PIN Code
                                </label>
                                <input
                                  required
                                  name="pin"
                                  value={addressState.pin}
                                  onChange={changeAddressInput}
                                  type="text"
                                  className="form-control modern-input"
                                  placeholder="PIN code"
                                />
                              </div>
                            </div>
                            <div className="form-actions">
                              <button type="submit" className="btn-save">
                                <i className="fas fa-check me-2"></i>
                                Save Address
                              </button>
                              <button
                                type="button"
                                onClick={switchEnableState}
                                className="btn-cancel"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "100px" }} />
            </section>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default UserProfile;
