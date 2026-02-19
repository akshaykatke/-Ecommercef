import React, { useState } from "react";
import { FaUser, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/auth";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const loginUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://ecommerce-c1r1.onrender.com/auth/login", {
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
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "var(--primary)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
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
                    <FaSignInAlt size={30} />
                  </div>
                  <h2 className="fw-bold text-dark mb-2">Welcome Back</h2>
                  <p className="text-muted mb-0">Sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={loginUser}>
                  {/* Email Field */}
                  <div className="mb-4">
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
                        <FaUser className="text-muted" />
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

                  {/* Password Field */}
                  <div className="mb-4">
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
                        placeholder="Enter your password"
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
                        Signing In...
                      </>
                    ) : (
                      <>
                        <FaSignInAlt className="me-2" />
                        Sign In
                      </>
                    )}
                  </button>
                </form>

                {/* Footer */}
                <div className="text-center">
                  <p className="text-muted mb-2">Don't have an account?</p>
                  <Link
                    to="/signUp"
                    className="text-decoration-none fw-semibold"
                    style={{ color: "var(--primary)" }}
                  >
                    Create Account
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
                Secure login powered by SSL encryption
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
