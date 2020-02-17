import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectUserAuthenticated } from "../../redux/selectors/userSelectors";

// imports from material ui
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

import { NavbarToolbar } from "./Navbar.styles";

const selectNavbarData = createStructuredSelector({
  userAuthenticated: selectUserAuthenticated
});

const Navbar = () => {
  const { userAuthenticated } = useSelector(selectNavbarData, shallowEqual);

  return (
    <AppBar>
      <NavbarToolbar>
        {/* material ui button accepts a component that is rendered as button child and its properties also as button properties*/}
        {userAuthenticated ? (
          <Fragment>
            <Tooltip title="post a scream">
              <IconButton onClick={() => {}}>
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Link to="/">
              <Tooltip title="home">
                <IconButton onClick={() => {}}>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Tooltip title="notifications">
              <IconButton onClick={() => {}}>
                <Notifications />
              </IconButton>
            </Tooltip>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Fragment>
        )}
      </NavbarToolbar>
    </AppBar>
  );
};

export default Navbar;
