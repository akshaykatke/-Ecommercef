import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { Authprovider } from "./context/auth.jsx";
import { CartProvider } from "./context/cart.jsx";
import { SearchProvider } from "./context/search.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Authprovider>
      <CartProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </CartProvider>
    </Authprovider>
  </StrictMode>,
);
