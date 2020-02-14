import React from "react";
// we import each component we want to use separately, "tree shaking" since if we do a group import from the main library we import the full library each load and thats hevaier for the app
import { Link } from "react-router-dom";
// imports from material ui
import AppBar from "@material-ui/core/AppBar";
import { NavbarToolbar } from "./Navbar.styles";
import Button from "@material-ui/core/Button";

const Navbar = () => {
  return (
    <AppBar>
      <NavbarToolbar>
        {/* material ui button accepts a component that is rendered as button child and its properties also as button properties*/}
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Signup
        </Button>
      </NavbarToolbar>
    </AppBar>
  );
};

export default Navbar;
