import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

const CustomButton = ({
  title,
  placement,
  handleClick,
  children,
  tooltipStyles,
  buttonStyles
}) => {
  const useStyles = makeStyles({
    tooltipStyles,
    buttonStyles
  });

  const classes = useStyles();

  return (
    <Tooltip
      title={title}
      placement={placement}
      className={classes.tooltipStyles}
    >
      <IconButton onClick={handleClick} className={classes.buttonStyles}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  placement: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  tooltipStyles: PropTypes.object,
  buttonStyles: PropTypes.object
};

export default CustomButton;
