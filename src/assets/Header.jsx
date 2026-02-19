import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  IoCart,
  IoStorefront,
  IoPerson,
  IoLogOut,
  IoHome,
  IoLogIn,
  IoPersonAdd,
} from "react-icons/io5";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";

function Header() {
  const { auth, setAuth } = useAuth();
  const { getCartItemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      // Use setTimeout to avoid immediate closure when toggling
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 50);
      
      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showDropdown]);

  const handleLogOut = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    setShowDropdown(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const handleDropdownToggle = (isOpen) => {
    setShowDropdown(isOpen);
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Close dropdown immediately
    setShowDropdown(false);
    // Small delay to ensure dropdown closes before navigation
    setTimeout(() => {
      const dashboardPath = `/Dashboard/${auth.user.role === 1 ? "admin" : "user"}`;
      navigate(dashboardPath);
    }, 100);
  };

  const handleSignOutClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Close dropdown immediately
    setShowDropdown(false);
    // Small delay to ensure dropdown closes before logout
    setTimeout(() => {
      handleLogOut();
    }, 100);
  };

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 1000 }}>
      <Navbar
        expand="lg"
        className="navbar-custom"
        style={{
          background: "var(--bg-header)",
          color: "var(--text-white)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          borderBottom: "2px solid var(--primary)",
          padding: "0.5rem 0",
        }}
      >
        <Container fluid className="px-3">
          {/* Brand */}
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="d-flex align-items-center text-white fw-bold"
            style={{
              textDecoration: "none",
              fontSize: "1.5rem",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center rounded-circle me-3 brand-icon"
              style={{
                width: "38px",
                height: "38px",
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            >
              <IoStorefront size={20} />
            </div>
            <span className="d-none d-sm-inline" style={{ letterSpacing: "0.3px", fontSize: "1.3rem" }}>
              Online Shopping
            </span>
            <span className="d-sm-none" style={{ fontSize: "1.2rem" }}>Shop</span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="main-navbar"
            className="border-0"
            style={{
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(10px)",
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          />

          <Navbar.Collapse id="main-navbar">
            {/* Main Navigation */}
            <Nav className="me-auto">
              <Nav.Link
                as={NavLink}
                to="/"
                className="nav-link-custom d-flex align-items-center mx-2"
                style={{
                  color: isActive("/")
                    ? "white"
                    : "rgba(255,255,255,0.9)",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  background: isActive("/")
                    ? "rgba(255,255,255,0.2)"
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/")) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/")) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                <IoHome className="me-2" size={18} />
                Home
              </Nav.Link>
            </Nav>

            {/* Right Side Navigation */}
            <Nav className="align-items-center gap-2">
              {!auth?.user ? (
                <>
                  <Nav.Link
                    as={NavLink}
                    to="/signUp"
                    className="nav-link-custom d-flex align-items-center"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                      padding: "8px 20px",
                      borderRadius: "25px",
                      background: "rgba(255,255,255,0.2)",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <IoPersonAdd className="me-2" size={16} />
                    <span className="d-none d-md-inline">Sign Up</span>
                    <span className="d-md-none">SignUp</span>
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    to="/signin"
                    className="nav-link-custom d-flex align-items-center"
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                      padding: "8px 20px",
                      borderRadius: "25px",
                      background: "rgba(255,255,255,0.25)",
                      border: "1px solid rgba(255,255,255,0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.35)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <IoLogIn className="me-2" size={16} />
                    <span className="d-none d-md-inline">Sign In</span>
                    <span className="d-md-none">SignIn</span>
                  </Nav.Link>
                </>
              ) : (
                <div ref={dropdownRef}>
                <NavDropdown
                  show={showDropdown}
                  onToggle={handleDropdownToggle}
                  onSelect={() => setShowDropdown(false)}
                  title={
                    <div
                      className="d-flex align-items-center user-dropdown-trigger"
                      style={{
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "25px",
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        flexWrap: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.3)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle me-2 flex-shrink-0"
                        style={{
                          width: "36px",
                          height: "36px",
                          background: "rgba(255,255,255,0.3)",
                          backdropFilter: "blur(10px)",
                        }}
                      >
                        <IoPerson size={18} />
                      </div>
                      <span className="d-none d-md-inline fw-semibold flex-shrink-0" style={{ fontSize: "14px" }}>
                        {auth.user.name}
                      </span>
                      <span className="d-md-none fw-semibold flex-shrink-0" style={{ fontSize: "14px" }}>
                        Profile
                      </span>
                    </div>
                  }
                  id="user-nav-dropdown"
                  align="end"
                  className="nav-dropdown-custom"
                >
                  <NavDropdown.Item
                    onClick={handleDashboardClick}
                    as="button"
                    className="d-flex align-items-center w-100 border-0 bg-transparent"
                    style={{
                      cursor: "pointer",
                      color: "#495057",
                      fontWeight: "600",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                      padding: "10px 16px",
                      backgroundColor: "transparent",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f8f9fa";
                      e.currentTarget.style.paddingLeft = "20px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.paddingLeft = "16px";
                    }}
                  >
                    <IoPerson className="me-2" size={16} style={{ color: "#495057" }} />
                    <span style={{ color: "#495057" }}>Dashboard</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider style={{ margin: "8px 0" }} />
                  <NavDropdown.Item
                    onClick={handleSignOutClick}
                    as="button"
                    className="d-flex align-items-center signout-item w-100 border-0 bg-transparent"
                    style={{
                      cursor: "pointer",
                      color: "#dc3545",
                      fontWeight: "600",
                      fontSize: "14px",
                      transition: "all 0.2s ease",
                      padding: "10px 16px",
                      backgroundColor: "transparent",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#fff5f5";
                      e.currentTarget.style.paddingLeft = "20px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.paddingLeft = "16px";
                    }}
                  >
                    <IoLogOut className="me-2" size={16} style={{ color: "#dc3545" }} />
                    <span style={{ color: "#dc3545" }}>Sign Out</span>
                  </NavDropdown.Item>
                </NavDropdown>
                </div>
              )}

              {/* Cart */}
              <Nav.Link
                as={NavLink}
                to="/cartitems"
                className="nav-link-custom d-flex align-items-center position-relative cart-link"
                style={{
                  color: isActive("/cartitems") ? "white" : "rgba(255,255,255,0.9)",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  padding: "8px 16px",
                  borderRadius: "25px",
                  background: isActive("/cartitems")
                    ? "rgba(255,255,255,0.2)"
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/cartitems")) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/cartitems")) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle position-relative cart-icon-wrapper"
                  style={{
                    width: "42px",
                    height: "42px",
                    background: "rgba(255,255,255,0.25)",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <IoCart size={20} />
                  {getCartItemCount() > 0 && (
                    <Badge
                      bg="danger"
                      pill
                      className="position-absolute cart-badge"
                      style={{
                        top: "-6px",
                        right: "-6px",
                        fontSize: "11px",
                        minWidth: "22px",
                        height: "22px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid white",
                        boxShadow: "0 2px 8px rgba(220, 53, 69, 0.4)",
                        fontWeight: "700",
                        animation: "pulse 2s infinite",
                      }}
                    >
                      {getCartItemCount()}
                    </Badge>
                  )}
                </div>
                <span className="d-none d-lg-inline ms-2">Cart</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <style>{`
        .navbar-custom .brand-icon:hover {
          background: rgba(255, 255, 255, 0.35) !important;
          transform: rotate(5deg) scale(1.1);
        }

        .navbar-custom .cart-icon-wrapper:hover {
          background: rgba(255, 255, 255, 0.35) !important;
          transform: scale(1.1);
        }

        .navbar-custom .nav-link-custom:hover {
          color: white !important;
        }

        .navbar-custom .nav-dropdown-custom .dropdown-menu {
          border: none !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
          border-radius: 15px !important;
          margin-top: 10px !important;
          padding: 8px !important;
          min-width: 200px !important;
          background: white !important;
          z-index: 1050 !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        .navbar-custom .nav-dropdown-custom .dropdown-item {
          border-radius: 8px !important;
          margin: 2px 0 !important;
          color: #495057 !important;
          padding: 10px 16px !important;
          display: flex !important;
          align-items: center !important;
          text-decoration: none !important;
          background-color: transparent !important;
        }

        .navbar-custom .nav-dropdown-custom .dropdown-item:hover {
          background-color: #f8f9fa !important;
          color: #495057 !important;
        }

        .navbar-custom .nav-dropdown-custom .dropdown-item span {
          color: inherit !important;
        }

        .navbar-custom .nav-dropdown-custom .dropdown-item svg {
          color: inherit !important;
        }

        .navbar-custom .nav-dropdown-custom .dropdown-item.signout-item {
          color: #dc3545 !important;
        }

        .navbar-custom .nav-dropdown-custom .dropdown-item.signout-item:hover {
          background-color: #fff5f5 !important;
          color: #dc3545 !important;
        }

        .navbar-custom .nav-dropdown-custom .dropdown-item.signout-item span {
          color: #dc3545 !important;
        }

        .navbar-custom .nav-dropdown-custom .dropdown-item.signout-item svg {
          color: #dc3545 !important;
        }

        .navbar-toggler:focus {
          box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25) !important;
        }

        .cart-badge {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        .user-dropdown-trigger {
          cursor: pointer;
        }

        .navbar-custom .nav-dropdown-custom .dropdown-toggle {
          white-space: nowrap !important;
          display: flex !important;
          align-items: center !important;
          flex-wrap: nowrap !important;
        }

        .navbar-custom .nav-dropdown-custom .dropdown-toggle::after {
          margin-left: 8px !important;
          flex-shrink: 0 !important;
        }

        @media (max-width: 991.98px) {
          .navbar-custom .navbar-collapse {
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            border-radius: 15px;
            margin-top: 15px;
            padding: 15px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          }

          .navbar-custom .nav-link-custom {
            color: #495057 !important;
            margin: 8px 0;
            padding: 12px 16px !important;
            border-radius: 10px;
          }

          .navbar-custom .nav-link-custom:hover {
            color: var(--primary) !important;
            background: #f8f9fa !important;
          }

          .navbar-custom .user-dropdown-trigger {
            color: #495057 !important;
            background: #f8f9fa !important;
            border: 1px solid #e9ecef !important;
          }
        }
      `}</style>
    </header>
  );
}

export default Header;
