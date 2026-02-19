import React, { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import AdminMenu from "../assets/AdminMenu";
import { useAuth } from "../context/auth";
import { useParams, useNavigate } from "react-router-dom";

function UpdateProduct() {
  const { auth } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    photo: null,
  });
  const [loading, setLoading] = useState(true);
  const [currentPhotoLoaded, setCurrentPhotoLoaded] = useState(false);

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

  const getProduct = async () => {
    try {
      const response = await fetch(`/product/get-product/${id}`);
      const data = await response.json();
      if (data?.success) {
        const product = data.product;
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category._id,
          quantity: product.quantity,
          photo: null,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategories();
    getProduct();
  }, [id]);

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

      const response = await fetch(`/product/update-product/${id}`, {
        method: "PUT",
        headers: {
          Authorization: auth.token,
        },
        body: productData,
      });
      const data = await response.json();
      if (data?.success) {
        alert("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to update product");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container>
        <Row>
          <Col md={3}>
            <AdminMenu />
          </Col>
          <Col md={9}>
            <h4>Update Product</h4>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Current Photo</Form.Label>
                <div>
                  <img
                    src={`/product/product-photo/${id}`}
                    alt="Current product"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "cover",
                      display: currentPhotoLoaded ? "block" : "none",
                    }}
                    className="img-thumbnail"
                    onLoad={() => setCurrentPhotoLoaded(true)}
                    onError={() => setCurrentPhotoLoaded(false)}
                  />
                  {!currentPhotoLoaded && (
                    <div className="text-muted">No image available</div>
                  )}
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  Photo (optional - upload new photo to replace)
                </Form.Label>
                <Form.Control
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update Product
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UpdateProduct;
