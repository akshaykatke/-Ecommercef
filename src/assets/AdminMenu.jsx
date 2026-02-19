import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaTags, FaPlusCircle, FaBox } from "react-icons/fa";

function AdminMenu() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      path: "/dashboard/admin/createcategory",
      label: "Category",
      icon: FaTags,
    },
    {
      path: "/dashboard/admin/createproduct",
      label: "Create Product",
      icon: FaPlusCircle,
    },
    {
      path: "/dashboard/admin/products",
      label: "Products",
      icon: FaBox,
    },
  ];

  return (
    <div className="py-3">
      <div
        className="card shadow-sm border-0"
        style={{
          borderRadius: "15px",
          overflow: "hidden",
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
          <h6 className="mb-0 fw-bold d-flex align-items-center">
            <FaBox className="me-2" size={16} />
            Admin Menu
          </h6>
        </div>
        <div className="card-body p-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="d-flex align-items-center px-4 py-3 text-decoration-none admin-menu-item"
                style={{
                  color: active ? "var(--primary)" : "var(--text-primary)",
                  backgroundColor: active ? "#fff4e6" : "transparent",
                  borderLeft: active ? "3px solid var(--primary)" : "3px solid transparent",
                  transition: "all 0.3s ease",
                  fontWeight: active ? "600" : "500",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <Icon className="me-3" size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
