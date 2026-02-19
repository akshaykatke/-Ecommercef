import React from "react";
import { Col, Container, Row, Table, Modal, Button } from "react-bootstrap";
import AdminMenu from "../assets/AdminMenu";
import CategoryForm from "../assets/CategoryForm";
import { useAuth } from "../context/auth";
import Form from "react-bootstrap/Form";

function CreateCategory() {
  const { auth } = useAuth();
  const [name, setName] = React.useState("");
  const [updatedName, setUpdatedName] = React.useState("");
  const [selected, setSelected] = React.useState(null);
  const [show, setShow] = React.useState(false);

  const [categories, setCategories] = React.useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://ecommerce-c1r1.onrender.com/category/create-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          alert(`Category "${name}" created successfully`);
          setName("");
          getAllCategories();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error creating category:", error);
        alert("Failed to create category");
      });

    console.log("Category Created:", name);
    // Here you can add the logic to send the category to the backend
  };

  const getAllCategories = () => {
    fetch("https://ecommerce-c1r1.onrender.com/category/all-categories")
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          setCategories(data.categories);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selected) {
      alert("No category selected for update");
      return;
    }
    fetch(`https://ecommerce-c1r1.onrender.com/category/update-category/${selected._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({ name: updatedName }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          alert(`Category "${updatedName}" updated successfully`);
          setUpdatedName("");
          setSelected(null);
          setUpdatedName("");
          getAllCategories();
          handleClose();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        alert("Failed to update category");
      });
  };
  const deleteCategory = (pid) => {
    if (!auth?.token) {
      alert("Authentication required");
      return;
    }
    fetch(`https://ecommerce-c1r1.onrender.com/category/delete-category/${pid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success) {
          alert("Category deleted successfully");
          setUpdatedName("");
          setSelected(null);
          getAllCategories();
          handleClose();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        alert("Failed to delete category");
      });
  };

  React.useEffect(() => {
    getAllCategories();
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
            <AdminMenu />
          </Col>
          <Col md={9}>
            <div className="mb-4">
              <h3 className="fw-bold mb-1" style={{ color: "#2d3748" }}>
                Create Category
              </h3>
              <p className="text-muted">Add a new product category</p>
            </div>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
            <div className="mt-4">
              <h4 className="fw-bold mb-3" style={{ color: "#2d3748" }}>
                All Categories
              </h4>
              <div
                className="card shadow-sm border-0"
                style={{ borderRadius: "12px" }}
              >
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead
                      style={{
                        background: "var(--bg-header)",
                        color: "var(--text-white)",
                      }}
                    >
                      <tr>
                        <th style={{ border: "none", padding: "15px" }}>#</th>
                        <th style={{ border: "none", padding: "15px" }}>
                          Category Name
                        </th>
                        <th
                          style={{
                            border: "none",
                            padding: "15px",
                            textAlign: "center",
                          }}
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((c, index) => (
                        <tr
                          key={c._id}
                          style={{
                            borderBottom: "1px solid #e9ecef",
                          }}
                        >
                          <td style={{ padding: "15px", verticalAlign: "middle" }}>
                            {index + 1}
                          </td>
                          <td
                            style={{
                              padding: "15px",
                              verticalAlign: "middle",
                              fontWeight: "500",
                            }}
                          >
                            {c.name}
                          </td>
                          <td
                            style={{
                              padding: "15px",
                              verticalAlign: "middle",
                              textAlign: "center",
                            }}
                          >
                            <div className="d-flex gap-2 justify-content-center">
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                  handleShow();
                                  setUpdatedName(c.name);
                                  setSelected(c);
                                }}
                                style={{
                                  background:
                                    "var(--primary)",
                                  border: "none",
                                  borderRadius: "8px",
                                  padding: "6px 16px",
                                  fontWeight: "600",
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  deleteCategory(c._id);
                                }}
                                style={{
                                  borderRadius: "8px",
                                  padding: "6px 16px",
                                  fontWeight: "600",
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>

            <Modal
              show={show}
              onHide={handleClose}
              centered
              style={{ borderRadius: "15px" }}
            >
              <Modal.Header
                closeButton
                style={{
                  background: "var(--bg-header)",
                  color: "var(--text-white)",
                  color: "white",
                  border: "none",
                }}
              >
                <Modal.Title className="fw-bold">Update Category</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ padding: "25px" }}>
                {selected ? (
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Category Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        style={{
                          borderRadius: "8px",
                          border: "2px solid #e9ecef",
                          padding: "10px",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "var(--primary)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#e9ecef";
                        }}
                      />
                    </Form.Group>
                  </Form>
                ) : (
                  <p>No category selected</p>
                )}
              </Modal.Body>
              <Modal.Footer style={{ border: "none", padding: "20px 25px" }}>
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  style={{
                    borderRadius: "8px",
                    padding: "8px 20px",
                    fontWeight: "600",
                  }}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={handleUpdate}
                  style={{
                    background:
                      "var(--primary)",
                      border: "none",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 20px",
                    fontWeight: "600",
                  }}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateCategory;
