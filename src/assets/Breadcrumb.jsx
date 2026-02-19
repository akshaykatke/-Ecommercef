import React from "react";
import { useLocation, Link } from "react-router-dom";
import { FaHome, FaChevronRight } from "react-icons/fa";

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumb on home page
  if (location.pathname === "/") {
    return null;
  }

  const getBreadcrumbName = (path, index, allPaths) => {
    const breadcrumbMap = {
      dashboard: "Dashboard",
      admin: "Admin",
      user: "User",
      createcategory: "Create Category",
      createproduct: "Create Product",
      products: "Products",
      "update-product": "Update Product",
      orders: "Orders",
      signin: "Sign In",
      signUp: "Sign Up",
      signup: "Sign Up",
      cartitems: "Shopping Cart",
    };

    // Handle dynamic routes like update-product/:id
    if (path.startsWith("update-product")) {
      return "Update Product";
    }

    // Handle nested routes
    if (path === "admin" && index > 0 && allPaths[index - 1] === "dashboard") {
      return "Admin Dashboard";
    }
    if (path === "user" && index > 0 && allPaths[index - 1] === "dashboard") {
      return "User Dashboard";
    }

    return breadcrumbMap[path.toLowerCase()] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  const getBreadcrumbPath = (index) => {
    const path = "/" + pathnames.slice(0, index + 1).join("/");
    // Handle Dashboard routes properly
    if (pathnames[0] === "dashboard" && index === 0) {
      return "/dashboard";
    }
    return path;
  };

  return (
    <nav
      aria-label="breadcrumb"
      className="py-2"
      style={{
          backgroundColor: "var(--bg-primary)",
          borderBottom: "1px solid var(--border-light)",
      }}
    >
      <div className="container-fluid px-3">
        <ol
          className="breadcrumb mb-0"
          style={{
            marginBottom: "0",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <li className="breadcrumb-item">
            <Link
              to="/"
              className="text-decoration-none d-flex align-items-center"
              style={{
                color: "var(--primary)",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              <FaHome className="me-1" size={14} />
              Home
            </Link>
          </li>
          {pathnames.map((value, index) => {
            const isLast = index === pathnames.length - 1;
            const to = getBreadcrumbPath(index);
            const name = getBreadcrumbName(value, index, pathnames);

            return (
              <li
                key={to}
                className="breadcrumb-item d-flex align-items-center"
                style={{ fontSize: "14px" }}
              >
                <FaChevronRight
                  className="mx-2"
                  size={10}
                  style={{ color: "var(--text-muted)" }}
                />
                {isLast ? (
                  <span
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: "600",
                    }}
                  >
                    {name}
                  </span>
                ) : (
                  <Link
                    to={to}
                    className="text-decoration-none"
                    style={{
                      color: "var(--primary)",
                      fontWeight: "500",
                    }}
                  >
                    {name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

export default Breadcrumb;
