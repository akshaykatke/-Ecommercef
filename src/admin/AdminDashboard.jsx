import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import AdminMenu from "../assets/AdminMenu";
import Card from "react-bootstrap/Card";
import { useAuth } from "../context/auth";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

function AdminDashboard() {
  const { auth } = useAuth();
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
            <AdminMenu />
          </Col>
          <Col md={9}>
            <div className="mb-4">
              <h3 className="fw-bold mb-1" style={{ color: "#2d3748" }}>
                Admin Dashboard
              </h3>
              <p className="text-muted">Welcome back, {auth?.user?.name}</p>
            </div>
            <Card
              className="shadow-sm border-0"
              style={{
                borderRadius: "15px",
                overflow: "hidden",
                maxWidth: "700px",
              }}
            >
              <div
                className="card-header border-0 py-3"
                style={{
                  background: "var(--bg-header)",
                  color: "var(--text-white)",
                  color: "white",
                }}
              >
                <h5 className="mb-0 fw-bold d-flex align-items-center">
                  <FaUser className="me-2" />
                  Profile Information
                </h5>
              </div>
              <Card.Body className="p-4">
                <div className="row g-3">
                  <div className="col-12">
                    <div className="d-flex align-items-center p-3 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          background: "var(--bg-header)",
                  color: "var(--text-white)",
                          color: "white",
                        }}
                      >
                        <FaUser size={20} />
                      </div>
                      <div>
                        <small className="text-muted d-block">Name</small>
                        <strong style={{ color: "#2d3748", fontSize: "16px" }}>
                          {auth?.user?.name}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-center p-3 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          background: "var(--bg-header)",
                  color: "var(--text-white)",
                          color: "white",
                        }}
                      >
                        <FaEnvelope size={20} />
                      </div>
                      <div>
                        <small className="text-muted d-block">Email</small>
                        <strong style={{ color: "#2d3748", fontSize: "16px" }}>
                          {auth?.user?.email}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-center p-3 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          background: "var(--bg-header)",
                  color: "var(--text-white)",
                          color: "white",
                        }}
                      >
                        <FaPhone size={20} />
                      </div>
                      <div>
                        <small className="text-muted d-block">Phone</small>
                        <strong style={{ color: "#2d3748", fontSize: "16px" }}>
                          {auth?.user?.phone}
                        </strong>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-center p-3 rounded" style={{ backgroundColor: "#f8f9fa" }}>
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle me-3"
                        style={{
                          width: "50px",
                          height: "50px",
                          background: "var(--bg-header)",
                  color: "var(--text-white)",
                          color: "white",
                        }}
                      >
                        <FaMapMarkerAlt size={20} />
                      </div>
                      <div>
                        <small className="text-muted d-block">Address</small>
                        <strong style={{ color: "#2d3748", fontSize: "16px" }}>
                          {auth?.user?.address}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
