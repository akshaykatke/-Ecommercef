import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaUserPlus,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaMapMarkerAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/auth";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const addUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://ecommerce-c1r1.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setAuth({ ...auth, user: data.user, token: data.token });
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: data.user,
            token: data.token,
          }),
        );
        navigate("/");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center py-4"
      style={{
        background: "var(--primary)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div
              className="card shadow-lg border-0"
              style={{
                borderRadius: "20px",
                backdropFilter: "blur(10px)",
                background: "rgba(255, 255, 255, 0.95)",
              }}
            >
              <div className="card-body p-5">
                {/* Header */}
                <div className="text-center mb-4">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                    style={{
                      width: "80px",
                      height: "80px",
                      background:
                        "var(--primary)",
                        border: "none",
                      color: "white",
                    }}
                  >
                    <FaUserPlus size={30} />
                  </div>
                  <h2 className="fw-bold text-dark mb-2">Create Account</h2>
                  <p className="text-muted mb-0">
                    Join us today and start shopping
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={addUser}>
                  <div className="row">
                    {/* Name Field */}
                    <div className="col-md-6 mb-4">
                      <label
                        htmlFor="name"
                        className="form-label fw-semibold text-dark"
                      >
                        Full Name
                      </label>
                      <div className="input-group">
                        <span
                          className="input-group-text"
                          style={{
                            backgroundColor: "#f8f9fa",
                            borderColor: "#dee2e6",
                          }}
                        >
                          <FaUser className="text-muted" />
                        </span>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          id="name"
                          name="name"
                          placeholder="Enter your name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          style={{
                            borderLeft: "none",
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0",
                          }}
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div className="col-md-6 mb-4">
                      <label
                        htmlFor="email"
                        className="form-label fw-semibold text-dark"
                      >
                        Email Address
                      </label>
                      <div className="input-group">
                        <span
                          className="input-group-text"
                          style={{
                            backgroundColor: "#f8f9fa",
                            borderColor: "#dee2e6",
                          }}
                        >
                          <FaEnvelope className="text-muted" />
                        </span>
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          style={{
                            borderLeft: "none",
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {/* Password Field */}
                    <div className="col-md-6 mb-4">
                      <label
                        htmlFor="password"
                        className="form-label fw-semibold text-dark"
                      >
                        Password
                      </label>
                      <div className="input-group">
                        <span
                          className="input-group-text"
                          style={{
                            backgroundColor: "#f8f9fa",
                            borderColor: "#dee2e6",
                          }}
                        >
                          <FaLock className="text-muted" />
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control form-control-lg"
                          id="password"
                          name="password"
                          placeholder="Create password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          style={{
                            borderLeft: "none",
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0",
                            borderRight: "none",
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={togglePasswordVisibility}
                          style={{
                            borderLeft: "none",
                            borderTopRightRadius: "0",
                            borderBottomRightRadius: "0",
                          }}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div className="col-md-6 mb-4">
                      <label
                        htmlFor="phone"
                        className="form-label fw-semibold text-dark"
                      >
                        Phone Number
                      </label>
                      <div className="input-group">
                        <span
                          className="input-group-text"
                          style={{
                            backgroundColor: "#f8f9fa",
                            borderColor: "#dee2e6",
                          }}
                        >
                          <FaPhone className="text-muted" />
                        </span>
                        <input
                          type="tel"
                          className="form-control form-control-lg"
                          id="phone"
                          name="phone"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          style={{
                            borderLeft: "none",
                            borderTopLeftRadius: "0",
                            borderBottomLeftRadius: "0",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="address"
                      className="form-label fw-semibold text-dark"
                    >
                      Address
                    </label>
                    <div className="input-group">
                      <span
                        className="input-group-text"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderColor: "#dee2e6",
                        }}
                      >
                        <FaMapMarkerAlt className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="address"
                        name="address"
                        placeholder="Enter your address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        style={{
                          borderLeft: "none",
                          borderTopLeftRadius: "0",
                          borderBottomLeftRadius: "0",
                        }}
                      />
                    </div>
                  </div>

                  {/* Security Question Field */}
                  <div className="mb-4">
                    <label
                      htmlFor="answer"
                      className="form-label fw-semibold text-dark"
                    >
                      Security Question
                    </label>
                    <div className="input-group">
                      <span
                        className="input-group-text"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderColor: "#dee2e6",
                        }}
                      >
                        <FaQuestionCircle className="text-muted" />
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="answer"
                        name="answer"
                        placeholder="What is your favorite game?"
                        value={formData.answer}
                        onChange={handleChange}
                        required
                        style={{
                          borderLeft: "none",
                          borderTopLeftRadius: "0",
                          borderBottomLeftRadius: "0",
                        }}
                      />
                    </div>
                    <small className="text-muted mt-1 d-block">
                      This will help us verify your identity if needed
                    </small>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 btn-lg mb-3"
                    disabled={isLoading}
                    style={{
                      background:
                        "var(--primary)",
                        border: "none",
                      border: "none",
                      borderRadius: "10px",
                      padding: "12px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <FaUserPlus className="me-2" />
                        Create Account
                      </>
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="text-center">
                  <p className="text-muted mb-2">Already have an account?</p>
                  <Link
                    to="/signIn"
                    className="text-decoration-none fw-semibold"
                    style={{ color: "var(--primary)" }}
                  >
                    Sign In
                  </Link>
                </div>

                {/* Decorative Elements */}
                <div
                  className="position-absolute top-0 start-50 translate-middle-x"
                  style={{ marginTop: "-10px" }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "4px",
                      background:
                        "var(--primary)",
                        border: "none",
                      borderRadius: "2px",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-center mt-4">
              <small className="text-white-50">
                By creating an account, you agree to our Terms of Service
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
