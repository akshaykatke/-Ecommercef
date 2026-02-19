import React, { useState, useEffect } from "react";
import { Col, Container, Row, Card, Button, Modal } from "react-bootstrap";
import AdminMenu from "../assets/AdminMenu";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

function Product() {
  const { auth } = useAuth();
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getAllProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/product/all-products`);
      const data = await response.json();
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/product/delete-product/${selectedProduct._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: auth.token,
          },
        },
      );
      const data = await response.json();
      if (data?.success) {
        alert("Product deleted successfully");
        getAllProducts();
        setShowDeleteModal(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete product");
    }
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedProduct(null);
  };

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
                All Products
              </h3>
              <p className="text-muted">
                Manage your product inventory ({products.length} products)
              </p>
            </div>
            <Row className="g-4">
              {products.map((product) => (
                <Col key={product._id} md={4}>
                  <Card
                    className="h-100 border-0 shadow-sm"
                    style={{
                      borderRadius: "15px",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 20px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                    }}
                  >
                    <div style={{ height: "220px", overflow: "hidden" }}>
                      <Card.Img
                        variant="top"
                        src={`${API_BASE_URL}/product/product-photo/${product._id}`}
                        alt={product.name}
                        style={{
                          height: "100%",
                          objectFit: "cover",
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
                    <Card.Body className="p-4">
                      <Card.Title
                        className="fw-bold mb-2"
                        style={{ color: "#2d3748", fontSize: "18px" }}
                      >
                        {product.name}
                      </Card.Title>
                      <Card.Text
                        className="text-muted mb-3"
                        style={{ fontSize: "14px" }}
                      >
                        {product.description.substring(0, 80)}...
                      </Card.Text>
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-muted small">Price</span>
                          <strong
                            className="text-success"
                            style={{ fontSize: "20px" }}
                          >
                            ${product.price}
                          </strong>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-muted small">Category</span>
                          <span className="badge bg-primary">
                            {product.category?.name}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-muted small">Quantity</span>
                          <span className="fw-semibold">{product.quantity}</span>
                        </div>
                      </div>
                      <div className="d-flex gap-2 mt-3">
                        <Link
                          to={`/dashboard/admin/update-product/${product._id}`}
                          className="flex-fill"
                        >
                          <Button
                            variant="primary"
                            size="sm"
                            className="w-100"
                            style={{
                              background:
                                "var(--primary)",
                              border: "none",
                              borderRadius: "8px",
                              fontWeight: "600",
                            }}
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          className="flex-fill"
                          onClick={() => openDeleteModal(product)}
                          style={{
                            borderRadius: "8px",
                            fontWeight: "600",
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showDeleteModal}
        onHide={closeDeleteModal}
        centered
        style={{ borderRadius: "15px" }}
      >
        <Modal.Header
          closeButton
          style={{
            background: "#dc3545",
            color: "white",
            border: "none",
          }}
        >
          <Modal.Title className="fw-bold">Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: "25px" }}>
          <p className="mb-0">
            Are you sure you want to delete the product{" "}
            <strong>"{selectedProduct?.name}"</strong>? This action cannot be
            undone.
          </p>
        </Modal.Body>
        <Modal.Footer style={{ border: "none", padding: "20px 25px" }}>
          <Button
            variant="secondary"
            onClick={closeDeleteModal}
            style={{
              borderRadius: "8px",
              padding: "8px 20px",
              fontWeight: "600",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            style={{
              borderRadius: "8px",
              padding: "8px 20px",
              fontWeight: "600",
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Product;
