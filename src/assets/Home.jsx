import React, { useState, useEffect } from "react";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import { API_BASE_URL } from "../config/api";
import {
  FaSearch,
  FaShoppingCart,
  FaFilter,
  FaTags,
  FaDollarSign,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
  FaPercent,
  FaGift,
  FaStar,
} from "react-icons/fa";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const { searchKeyword, updateSearchKeyword, clearSearch } = useSearch();
  const { addToCart } = useCart();

  // Advertisement data
  const advertisements = [
    {
      id: 1,
      title: "Special Offer",
      description: "Get 50% OFF on all Electronics",
      discount: "50%",
      icon: FaPercent,
      color: "#ef4444",
      bgColor: "#fee2e2",
    },
    {
      id: 2,
      title: "New Arrivals",
      description: "Check out our latest products",
      discount: "NEW",
      icon: FaGift,
      color: "#10b981",
      bgColor: "#d1fae5",
    },
    {
      id: 3,
      title: "Best Deals",
      description: "Save up to 30% on Furniture",
      discount: "30%",
      icon: FaStar,
      color: "#f59e0b",
      bgColor: "#fef3c7",
    },
    {
      id: 4,
      title: "Flash Sale",
      description: "Limited time offers - Shop now!",
      discount: "SALE",
      icon: FaShoppingCart,
      color: "#6366f1",
      bgColor: "#e0e7ff",
    },
  ];

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/category/all-categories`);
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/product/all-products`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter products
  const filterProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/product/filtered-products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checked, radio }),
      });
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Search products
  const searchProducts = async (keyword) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/product/search-product/${keyword}`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length > 0 || radio.length > 0) {
      filterProducts();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  // Auto-rotate advertisements every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
    }, 4000); // Change ad every 4 seconds

    return () => clearInterval(interval);
  }, [advertisements.length]);

  const handleCategoryChange = (categoryId, isChecked) => {
    if (isChecked) {
      setChecked([...checked, categoryId]);
    } else {
      setChecked(checked.filter((id) => id !== categoryId));
    }
  };

  const handlePriceChange = (value) => {
    setRadio(value);
  };

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    updateSearchKeyword(keyword);
    if (keyword) {
      searchProducts(keyword);
    } else {
      getAllProducts();
    }
  };

  return (
    <div
      className="container-fluid py-2"
      style={{
        backgroundColor: "var(--bg-secondary)",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <div className="container-fluid px-3">
        <div className="row g-3">
          {/* Filter Sidebar */}
          <div className="col-lg-3 col-md-4">
            <div
              className="card shadow-sm border-0 sticky-top"
              style={{
                top: "70px",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div
                className="card-header border-0 py-2"
                style={{
                  background: "var(--bg-header)",
                  color: "white",
                }}
              >
                <h6 className="mb-0 d-flex align-items-center fw-bold" style={{ fontSize: "15px" }}>
                  <FaFilter className="me-2" size={14} />
                  Filters
                </h6>
              </div>
              <div className="card-body p-2">
                {/* Category Filter */}
                <div className="mb-3">
                  <h6 className="fw-bold mb-2 d-flex align-items-center" style={{ fontSize: "13px", color: "var(--text-primary)" }}>
                    <FaTags className="me-2" size={12} />
                    Categories
                  </h6>
                  <div className="filter-list">
                    {categories.map((category) => (
                      <div
                        key={category._id}
                        className="form-check filter-item mb-1 p-1 rounded"
                        style={{
                          transition: "all 0.2s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#f0f0f0";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <input
                          className="form-check-input custom-checkbox"
                          type="checkbox"
                          id={category._id}
                          checked={checked.includes(category._id)}
                          onChange={(e) =>
                            handleCategoryChange(category._id, e.target.checked)
                          }
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                            marginTop: "0px",
                            border: "2px solid #667eea !important",
                            borderRadius: "4px",
                            backgroundColor: checked.includes(category._id) ? "var(--primary)" : "var(--bg-primary)",
                            flexShrink: 0,
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            position: "relative",
                            display: "inline-block",
                            verticalAlign: "middle",
                          }}
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor={category._id}
                          style={{
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "500",
                            userSelect: "none",
                          }}
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h6 className="fw-bold mb-2 d-flex align-items-center" style={{ fontSize: "13px", color: "var(--text-primary)" }}>
                    <FaDollarSign className="me-2" size={12} style={{ color: "var(--primary)" }} />
                    Price Range
                  </h6>
                  <div className="price-filter-list">
                    {[
                      { id: "all", label: "All Prices", value: [] },
                      { id: "0-19", label: "$0 - $19", value: [0, 19] },
                      { id: "20-49", label: "$20 - $49", value: [20, 49] },
                      { id: "50-99", label: "$50 - $99", value: [50, 99] },
                      {
                        id: "100+",
                        label: "$100+",
                        value: [100, 100000],
                      },
                    ].map((priceOption) => (
                      <div
                        key={priceOption.id}
                        className="form-check filter-item mb-1 p-1 rounded"
                        style={{
                          transition: "all 0.2s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#f0f0f0";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <input
                          className="form-check-input custom-radio"
                          type="radio"
                          name="price"
                          id={priceOption.id}
                          checked={
                            radio.length === 0
                              ? priceOption.id === "all"
                              : JSON.stringify(radio) ===
                                JSON.stringify(priceOption.value)
                          }
                          onChange={() => handlePriceChange(priceOption.value)}
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                            marginTop: "0px",
                            border: "2px solid #667eea !important",
                            borderRadius: "50%",
                            backgroundColor: (radio.length === 0
                              ? priceOption.id === "all"
                              : JSON.stringify(radio) ===
                                JSON.stringify(priceOption.value)) ? "var(--primary)" : "var(--bg-primary)",
                            flexShrink: 0,
                            appearance: "none",
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                            position: "relative",
                            display: "inline-block",
                            verticalAlign: "middle",
                          }}
                        />
                        <label
                          className="form-check-label ms-2"
                          htmlFor={priceOption.id}
                          style={{
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "500",
                            userSelect: "none",
                          }}
                        >
                          {priceOption.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Advertisement Section */}
            <div className="mt-3">
              <div
                className="card shadow-sm border-0"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  className="card-body p-0"
                  style={{
                    background: advertisements[currentAdIndex].bgColor,
                    minHeight: "180px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Navigation Arrows */}
                  <button
                    className="btn btn-sm position-absolute"
                    style={{
                      top: "50%",
                      left: "8px",
                      transform: "translateY(-50%)",
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentAdIndex(
                        (prevIndex) =>
                          (prevIndex - 1 + advertisements.length) %
                          advertisements.length
                      );
                    }}
                  >
                    <FaChevronLeft size={12} style={{ color: "#1e293b" }} />
                  </button>
                  <button
                    className="btn btn-sm position-absolute"
                    style={{
                      top: "50%",
                      right: "8px",
                      transform: "translateY(-50%)",
                      background: "rgba(255,255,255,0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentAdIndex(
                        (prevIndex) => (prevIndex + 1) % advertisements.length
                      );
                    }}
                  >
                    <FaChevronRight size={12} style={{ color: "#1e293b" }} />
                  </button>

                  {/* Advertisement Content */}
                  <div className="p-4 text-center">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                      style={{
                        width: "60px",
                        height: "60px",
                        background: advertisements[currentAdIndex].color,
                        color: "white",
                        margin: "0 auto",
                      }}
                    >
                      {React.createElement(advertisements[currentAdIndex].icon, {
                        size: 28,
                      })}
                    </div>
                    <h6
                      className="fw-bold mb-2"
                      style={{
                        color: advertisements[currentAdIndex].color,
                        fontSize: "16px",
                      }}
                    >
                      {advertisements[currentAdIndex].title}
                    </h6>
                    <p
                      className="mb-2 small"
                      style={{
                        color: "#475569",
                        fontSize: "13px",
                        lineHeight: "1.4",
                      }}
                    >
                      {advertisements[currentAdIndex].description}
                    </p>
                    <span
                      className="badge px-3 py-2"
                      style={{
                        background: advertisements[currentAdIndex].color,
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "600",
                        borderRadius: "20px",
                      }}
                    >
                      {advertisements[currentAdIndex].discount}
                    </span>
                  </div>

                  {/* Indicator Dots */}
                  <div
                    className="position-absolute bottom-3 start-50 translate-middle-x d-flex gap-1"
                    style={{ zIndex: 10 }}
                  >
                    {advertisements.map((_, index) => (
                      <button
                        key={index}
                        className="btn p-0 border-0"
                        onClick={() => setCurrentAdIndex(index)}
                        style={{
                          width: currentAdIndex === index ? "24px" : "8px",
                          height: "8px",
                          borderRadius: "4px",
                          background:
                            currentAdIndex === index
                              ? advertisements[currentAdIndex].color
                              : "rgba(255,255,255,0.5)",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="col-lg-9 col-md-8">
            {/* Header */}
            <div className="mb-3">
              <h3 className="fw-bold mb-2" style={{ color: "#2d3748", fontSize: "24px" }}>
                All Products
              </h3>
              {/* Search Bar */}
              <div className="position-relative mb-3">
                <FaSearch
                  className="position-absolute"
                  style={{
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6c757d",
                    zIndex: 10,
                  }}
                />
                <input
                  type="text"
                  className="form-control ps-5 py-2"
                  placeholder="Search products..."
                  value={searchKeyword}
                  onChange={handleSearchChange}
                  style={{
                    borderRadius: "10px",
                    border: "1px solid var(--border-light)",
                    fontSize: "14px",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--primary)";
                    e.target.style.boxShadow = "0 0 0 2px rgba(40, 116, 240, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border-light)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-5">
                <FaSpinner className="fa-spin" size={40} style={{ color: "var(--primary)" }} />
                <p className="mt-3 text-muted">Loading products...</p>
              </div>
            )}

            {/* Products Grid */}
            {!loading && (
              <>
                {products.length === 0 ? (
                  <div className="text-center py-5">
                    <FaShoppingCart size={60} className="text-muted mb-3" />
                    <h4 className="text-muted">No products found</h4>
                    <p className="text-muted">
                      Try adjusting your filters or search terms
                    </p>
                  </div>
                ) : (
                  <div className="row g-3">
                    {products.map((product) => (
                      <div key={product._id} className="col-xl-4 col-lg-6 col-md-6">
                        <div
                          className="card h-100 border-0 shadow-sm product-card"
                          style={{
                            borderRadius: "12px",
                            overflow: "hidden",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-8px)";
                            e.currentTarget.style.boxShadow =
                              "0 12px 24px rgba(0,0,0,0.15)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 2px 8px rgba(0,0,0,0.1)";
                          }}
                        >
                          {/* Product Image */}
                          <div
                            style={{
                              height: "220px",
                              overflow: "hidden",
                              backgroundColor: "var(--bg-secondary)",
                              position: "relative",
                            }}
                          >
                            <img
                              src={`${API_BASE_URL}/product/product-photo/${product._id}`}
                              className="w-100 h-100"
                              alt={product.name}
                              style={{
                                objectFit: "cover",
                                objectPosition: "center",
                                transition: "transform 0.3s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = "scale(1.1)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = "scale(1)";
                              }}
                            />
                          </div>

                          {/* Product Info */}
                          <div className="card-body d-flex flex-column p-3">
                            <h5
                              className="card-title fw-bold mb-2"
                              style={{
                                color: "var(--text-primary)",
                                fontSize: "16px",
                                minHeight: "48px",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                              title={product.name}
                            >
                              {product.name}
                            </h5>
                            <p
                              className="card-text text-muted mb-2"
                              style={{
                                fontSize: "13px",
                                flex: 1,
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {product.description}
                            </p>
                            <div className="mt-auto">
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <span
                                  className="fw-bold"
                                  style={{
                                    color: "var(--primary)",
                                    fontSize: "20px",
                                  }}
                                >
                                  ${product.price}
                                </span>
                              </div>
                              <button
                                className="btn w-100 py-2"
                                onClick={() => addToCart(product)}
                                style={{
                                  background:
                                    "var(--primary)",
                                  color: "var(--text-white)",
                                  border: "none",
                                  borderRadius: "8px",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.transform = "scale(1.02)";
                                  e.target.style.boxShadow = "0 2px 8px rgba(40, 116, 240, 0.3)";
                                  e.target.style.background = "var(--primary-dark)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.transform = "scale(1)";
                                  e.target.style.boxShadow = "none";
                                  e.target.style.background = "var(--primary)";
                                }}
                              >
                                <FaShoppingCart className="me-2" />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .custom-checkbox {
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          opacity: 1 !important;
          visibility: visible !important;
          display: inline-block !important;
          border: 2px solid var(--primary) !important;
          border-radius: 4px !important;
          background-color: white !important;
          width: 20px !important;
          height: 20px !important;
          margin: 0 !important;
          padding: 0 !important;
          cursor: pointer !important;
        }
        
        .custom-checkbox:checked {
          background-color: var(--primary) !important;
          border-color: var(--primary) !important;
        }
        
        .custom-checkbox:checked::after {
          content: "✓" !important;
          position: absolute !important;
          left: 50% !important;
          top: 50% !important;
          transform: translate(-50%, -50%) !important;
          color: white !important;
          font-size: 14px !important;
          font-weight: bold !important;
          line-height: 1 !important;
        }
        
        .custom-radio {
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          opacity: 1 !important;
          visibility: visible !important;
          display: inline-block !important;
          border: 2px solid var(--primary) !important;
          border-radius: 50% !important;
          background-color: white !important;
          width: 20px !important;
          height: 20px !important;
          margin: 0 !important;
          padding: 0 !important;
          cursor: pointer !important;
        }
        
        .custom-radio:checked {
          background-color: var(--primary) !important;
          border-color: var(--primary) !important;
        }
        
        .custom-radio:checked::after {
          content: "" !important;
          position: absolute !important;
          left: 50% !important;
          top: 50% !important;
          transform: translate(-50%, -50%) !important;
          width: 8px !important;
          height: 8px !important;
          border-radius: 50% !important;
          background-color: white !important;
        }
        
        .form-check-input {
          opacity: 1 !important;
          visibility: visible !important;
        }
      `}</style>
    </div>
  );
}

export default Home;
