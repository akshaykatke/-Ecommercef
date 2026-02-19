import React from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import {
  FaShoppingCart,
  FaReceipt,
  FaCreditCard,
  FaInfoCircle,
  FaCheck,
  FaTrashAlt,
  FaArrowLeft,
  FaMinus,
  FaPlus,
  FaShieldAlt,
} from "react-icons/fa";

function Cartitems() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    if (!auth?.user) {
      navigate("/signin");
      return;
    }
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div
        className="container-fluid py-3"
        style={{
          backgroundColor: "var(--bg-secondary)",
          minHeight: "calc(100vh - 70px)",
        }}
      >
        <div className="container-fluid px-3">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 text-center">
              <div
                className="card shadow-sm border-0"
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: "white",
                }}
              >
                <div
                  className="card-body py-5 px-4"
                  style={{
                    background:
                      "var(--bg-tertiary)",
                  }}
                >
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                    style={{
                      width: "120px",
                      height: "120px",
                      background:
                        "var(--primary)",
                      margin: "0 auto",
                    }}
                  >
                    <FaShoppingCart size={50} className="text-white" />
                  </div>
                  <h3
                    className="fw-bold mb-3"
                    style={{ color: "#2d3748", fontSize: "28px" }}
                  >
                    Your Cart is Empty
                  </h3>
                  <p
                    className="text-muted mb-4"
                    style={{ fontSize: "16px", maxWidth: "400px", margin: "0 auto" }}
                  >
                    Looks like you haven't added any products to your cart yet.
                    Start shopping to fill it up!
                  </p>
                  <button
                    className="btn px-5 py-3"
                    onClick={() => navigate("/")}
                    style={{
                      background:
                        "var(--primary)",
                      color: "var(--text-white)",
                      border: "none",
                      borderRadius: "12px",
                      fontWeight: "600",
                      fontSize: "16px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 2px 8px rgba(40, 116, 240, 0.2)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(40, 116, 240, 0.3)";
                      e.target.style.background = "var(--primary-dark)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 2px 8px rgba(40, 116, 240, 0.2)";
                      e.target.style.background = "var(--primary)";
                    }}
                  >
                    <FaArrowLeft className="me-2" />
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div
      className="container-fluid py-3"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <div className="container">
        {/* Header */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h2 className="fw-bold mb-1" style={{ color: "var(--text-primary)" }}>
                  <FaShoppingCart className="me-2" />
                  Shopping Cart
                </h2>
                <p className="text-muted mb-0 small">
                  {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
                </p>
              </div>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={clearCart}
              >
                <FaTrashAlt className="me-1" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        <div className="row g-3">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body p-0">
                {cart.map((item, index) => (
                  <div
                    key={item._id}
                    className={`p-3 ${index !== cart.length - 1 ? "border-bottom" : ""}`}
                  >
                    <div className="row align-items-center">
                      {/* Product Image */}
                      <div className="col-3 col-md-2">
                        <img
                          src={`${API_BASE_URL}/product/product-photo/${item._id}`}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            border: "1px solid #e9ecef",
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="col-9 col-md-4">
                        <h6 className="fw-bold mb-1 text-dark">{item.name}</h6>
                        <p className="text-muted small mb-1">
                          {item.description?.substring(0, 60)}...
                        </p>
                        <small style={{ color: "var(--primary)" }}>
                          {item.category?.name || "General"}
                        </small>
                      </div>

                      {/* Price */}
                      <div className="col-3 col-md-2 text-center">
                        <span className="fw-bold" style={{ color: "var(--success)" }}>
                          ${item.price}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="col-6 col-md-2">
                        <div className="d-flex align-items-center justify-content-center">
                          <div
                            className="input-group input-group-sm"
                            style={{ width: "100px" }}
                          >
                            <button
                              className="btn btn-outline-secondary btn-sm px-2"
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  item.quantity - 1,
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <FaMinus size={10} />
                            </button>
                            <input
                              type="number"
                              className="form-control text-center border-secondary"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item._id,
                                  parseInt(e.target.value) || 1,
                                )
                              }
                              min="1"
                              style={{ fontWeight: "bold", fontSize: "14px" }}
                            />
                            <button
                              className="btn btn-outline-secondary btn-sm px-2"
                              onClick={() =>
                                handleQuantityChange(
                                  item._id,
                                  item.quantity + 1,
                                )
                              }
                            >
                              <FaPlus size={10} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Total & Remove */}
                      <div className="col-3 col-md-2 text-center">
                        <div className="mb-1">
                          <span className="fw-bold" style={{ color: "var(--primary)" }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm px-2 py-1"
                          onClick={() => handleRemoveItem(item._id)}
                          title="Remove item"
                        >
                          <FaTrashAlt size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="card-footer bg-white border-0 py-2">
                <button
                  className="btn btn-sm"
                  onClick={() => navigate("/")}
                  style={{
                    border: "1px solid var(--primary)",
                    color: "var(--primary)",
                    background: "transparent",
                    fontWeight: "500",
                  }}
                >
                  <FaArrowLeft className="me-1" />
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div
              className="card shadow-sm border-0 sticky-top"
              style={{ top: "20px" }}
            >
              <div className="card-header py-2" style={{ background: "var(--bg-header)", color: "var(--text-white)" }}>
                <h5 className="mb-0 fs-6">
                  <FaReceipt className="me-2" />
                  Order Summary
                </h5>
              </div>
              <div className="card-body p-3">
                {/* Subtotal */}
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">
                    Subtotal (
                    {cart.reduce((total, item) => total + item.quantity, 0)}{" "}
                    items)
                  </span>
                  <span className="fw-semibold">${subtotal.toFixed(2)}</span>
                </div>

                {/* Shipping */}
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Shipping</span>
                  <span className="fw-semibold small" style={{ color: "var(--success)" }}>Free</span>
                </div>

                {/* Tax */}
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Tax</span>
                  <span className="fw-semibold">${tax.toFixed(2)}</span>
                </div>

                <hr className="my-2" />

                {/* Total */}
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-bold">Total</span>
                  <span className="fw-bold fs-5" style={{ color: "var(--primary)" }}>
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  className="btn btn-success w-100 mb-2 py-2"
                  onClick={handleCheckout}
                  disabled={!auth?.user}
                >
                  <FaCreditCard className="me-2" />
                  {auth?.user ? "Checkout" : "Login to Checkout"}
                </button>

                {/* Login Alert */}
                {!auth?.user && (
                  <div className="alert alert-warning py-2 mb-2">
                    <small className="mb-0">
                      <FaInfoCircle className="me-1" />
                      Please login to place an order
                    </small>
                  </div>
                )}

                {/* Security Note */}
                <div className="text-center">
                  <small className="text-muted">
                    <FaShieldAlt className="me-1" />
                    Secure checkout
                  </small>
                </div>
              </div>
            </div>

            {/* Benefits Card */}
            <div className="card shadow-sm border-0 mt-2">
              <div className="card-body p-3">
                <h6 className="card-title mb-2 small">
                  <FaInfoCircle className="text-info me-1" />
                  Why shop with us?
                </h6>
                <div className="row g-1">
                  <div className="col-6">
                    <small className="d-block mb-1">
                      <FaCheck className="me-1" style={{ color: "var(--success)" }} />
                      Free shipping
                    </small>
                  </div>
                  <div className="col-6">
                    <small className="d-block mb-1">
                      <FaCheck className="me-1" style={{ color: "var(--success)" }} />
                      30-day returns
                    </small>
                  </div>
                  <div className="col-6">
                    <small className="d-block">
                      <FaCheck className="me-1" style={{ color: "var(--success)" }} />
                      Secure payment
                    </small>
                  </div>
                  <div className="col-6">
                    <small className="d-block">
                      <FaCheck className="me-1" style={{ color: "var(--success)" }} />
                      24/7 support
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartitems;
