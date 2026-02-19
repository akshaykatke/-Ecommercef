import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import UserMenu from "../assets/UserMenu";
import Col from "react-bootstrap/esm/Col";
import { Row, Card } from "react-bootstrap";
import { useAuth } from "../context/auth";
import { FaShoppingBag, FaCalendarAlt, FaDollarSign, FaBox } from "react-icons/fa";

function Orders() {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders - you'll need to implement this endpoint
    // For now, showing empty state
    setLoading(false);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "var(--bg-secondary)",
        minHeight: "calc(100vh - 70px)",
        padding: "20px 0",
      }}
    >
      <Container fluid>
        <Row>
          <Col md={3}>
            <UserMenu />
          </Col>
          <Col md={9}>
            <div className="mb-4">
              <h3 className="fw-bold mb-1" style={{ color: "#2d3748" }}>
                My Orders
              </h3>
              <p className="text-muted">View your order history</p>
            </div>
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : orders.length === 0 ? (
              <Card
                className="shadow-sm border-0 text-center"
                style={{
                  borderRadius: "15px",
                  padding: "60px 20px",
                }}
              >
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    background:
                      "var(--primary)",
                    color: "white",
                  }}
                >
                  <FaShoppingBag size={40} />
                </div>
                <h4 className="fw-bold mb-2" style={{ color: "#2d3748" }}>
                  No Orders Yet
                </h4>
                <p className="text-muted mb-0">
                  You haven't placed any orders yet. Start shopping to see your
                  orders here!
                </p>
              </Card>
            ) : (
              <div className="row g-4">
                {orders.map((order) => (
                  <div key={order._id} className="col-12">
                    <Card
                      className="shadow-sm border-0"
                      style={{ borderRadius: "15px", overflow: "hidden" }}
                    >
                      <div
                        className="card-header border-0 py-3"
                        style={{
                          background:
                            "var(--primary)",
                          color: "white",
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-0 fw-bold">Order #{order._id}</h6>
                            <small className="opacity-75">
                              <FaCalendarAlt className="me-1" />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </small>
                          </div>
                          <span className="badge bg-light text-dark px-3 py-2">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <Card.Body className="p-4">
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <small className="text-muted d-block mb-1">
                              Total Amount
                            </small>
                            <h5 className="fw-bold text-success mb-0">
                              <FaDollarSign className="me-1" />
                              {order.total}
                            </h5>
                          </div>
                          <div className="col-md-6 mb-3">
                            <small className="text-muted d-block mb-1">
                              Items
                            </small>
                            <h6 className="fw-bold mb-0">
                              <FaBox className="me-1" />
                              {order.items?.length || 0} items
                            </h6>
                          </div>
                        </div>
                        <div className="mt-3">
                          <button
                            className="btn btn-sm"
                            style={{
                              background:
                                "var(--primary)",
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              padding: "6px 16px",
                              fontWeight: "600",
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Orders;
