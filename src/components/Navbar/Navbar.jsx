import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectUserAuthenticated } from "../../redux/selectors/userSelectors";

// imports from material ui
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

import CustomButton from "../CustomButton/CustomButton";
import PostScream from "../PostScream/PostScream";

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
            <PostScream />
            <Link to="/">
              <CustomButton title="home">
                <HomeIcon />
              </CustomButton>
            </Link>
            <CustomButton title="notifications" handleClick={() => {}}>
              <Notifications />
            </CustomButton>
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
