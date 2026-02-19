import React from "react";
import { Card } from "react-bootstrap";
import { FaTags } from "react-icons/fa";

function CategoryForm({ handleSubmit, value, setValue }) {
  return (
    <Card
      className="shadow-sm border-0"
      style={{
        borderRadius: "15px",
        overflow: "hidden",
        maxWidth: "600px",
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
        <h5 className="mb-0 d-flex align-items-center fw-bold">
          <FaTags className="me-2" />
          Create Category
        </h5>
      </div>
      <Card.Body className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="categoryName"
              className="form-label fw-semibold"
              style={{ color: "#2d3748" }}
            >
              Category Name
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryName"
              placeholder="Enter category name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                border: "1px solid var(--border-light)",
                padding: "12px",
                fontSize: "15px",
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
            <div className="form-text mt-2" style={{ fontSize: "13px" }}>
              Enter a unique name for the category.
            </div>
          </div>
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-lg"
              style={{
                background: "var(--bg-header)",
          color: "var(--text-white)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "12px",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 12px rgba(99, 102, 241, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Create Category
            </button>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
}

export default CategoryForm;
