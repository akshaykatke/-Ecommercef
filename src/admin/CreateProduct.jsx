import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import AdminMenu from "../assets/AdminMenu";
import { useAuth } from "../context/auth";

function CreateProduct() {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    photo: null,
  });

  const getAllCategories = async () => {
    try {
      const response = await fetch("/category/all-categories");
      const data = await response.json();
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("description", formData.description);
      productData.append("price", formData.price);
      productData.append("category", formData.category);
      productData.append("quantity", formData.quantity);
      if (formData.photo) {
        productData.append("photo", formData.photo);
      }

      const response = await fetch("/product/create-product", {
        method: "POST",
        headers: {
          Authorization: auth.token,
        },
        body: productData,
      });
      const data = await response.json();
      if (data?.success) {
        alert("Product created successfully");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          quantity: "",
          photo: null,
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create product");
    }
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
                Create Product
              </h3>
              <p className="text-muted">Add a new product to your store</p>
            </div>
            <div
              className="card shadow-sm border-0"
              style={{ borderRadius: "15px", overflow: "hidden" }}
            >
              <div
                className="card-header border-0 py-3"
                style={{
                  background: "var(--bg-header)",
                  color: "var(--text-white)",
                  color: "white",
                }}
              >
                <h5 className="mb-0 fw-bold">Product Details</h5>
              </div>
              <div className="card-body p-4">
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: "10px",
                        border: "1px solid var(--border-light)",
                        padding: "12px",
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
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: "10px",
                        border: "1px solid var(--border-light)",
                        padding: "12px",
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
                  </Form.Group>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Price</Form.Label>
                        <Form.Control
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          required
                          style={{
                            borderRadius: "10px",
                            border: "1px solid var(--border-light)",
                            padding: "12px",
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
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="mb-4">
                        <Form.Label className="fw-semibold">Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                          style={{
                            borderRadius: "10px",
                            border: "1px solid var(--border-light)",
                            padding: "12px",
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
                      </Form.Group>
                    </div>
                  </div>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: "10px",
                        border: "1px solid var(--border-light)",
                        padding: "12px",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--primary)";
                        e.target.style.boxShadow = "0 0 0 2px rgba(40, 116, 240, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--border-light)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Product Photo</Form.Label>
                    <Form.Control
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{
                        borderRadius: "10px",
                        border: "1px solid var(--border-light)",
                        padding: "12px",
                      }}
                    />
                  </Form.Group>
                  <button
                    type="submit"
                    className="btn btn-lg w-100"
                    style={{
                      background:
                        "var(--primary)",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      padding: "12px",
                      fontWeight: "600",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(99, 102, 241, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    Create Product
                  </button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateProduct;
