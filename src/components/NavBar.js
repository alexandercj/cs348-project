import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function NavBar() {
  // list all the pages and link to them
  const navigate = useNavigate();
  const handleRedirect = (path) => {
    navigate(path);
  };
  return (
    <div style={styles.navBar}>
      {pages.map((table) => (
        <Button
          variant="contained"
          style={styles.button}
          onClick={() => handleRedirect(table.path)}
        >
          {table.text}
        </Button>
      ))}
    </div>
  );
}

const styles = {
  navBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "1rem",
  },
  button: {
    color: "white",
    backgroundColor: "#8d8d8d",
  },
};

const pages = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/product",
    text: "Product Table",
  },
  {
    path: "/order",
    text: "Order Table",
  },
  {
    path: "/payment-history",
    text: "Payment History Table",
  },
  {
    path: "/user",
    text: "User Table",
  },
  {
    path: "/seller",
    text: "seller Table",

  },
  {
    path: "/category",
    text: "category Table",

  }
];

export default NavBar;
