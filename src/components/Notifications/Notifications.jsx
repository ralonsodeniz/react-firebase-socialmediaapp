import React, { useState, Fragment, useCallback } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { createStructuredSelector } from "reselect";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { markNotificationsReadStart } from "../../redux/actions/userActions";
import { selectUserNotifications } from "../../redux/selectors/userSelectors";

import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import DoneAllIcon from "@material-ui/icons/DoneAll";

dayjs.extend(relativeTime);

const selectNotificationsData = createStructuredSelector({
  userNotifications: selectUserNotifications
});

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const { userNotifications } = useSelector(
    selectNotificationsData,
    shallowEqual
  );

  const handleOpen = event => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReadAllNotifications = useCallback(() => {
    const unreadNotifications = userNotifications.reduce(
      (accumulator, notification) => {
        !notification.read && accumulator.push(notification.notificationId);
        return accumulator;
      },
      []
    );
    setAnchorEl(null);
    unreadNotifications.length &&
      dispatch(markNotificationsReadStart(unreadNotifications));
  }, [userNotifications, dispatch]);

  const handleReadNotification = useCallback(
    notification => {
      notification.read === false &&
        dispatch(markNotificationsReadStart([notification.notificationId]));
    },
    [dispatch]
  );

  const notificationsIcon =
    userNotifications && userNotifications.length ? (
      userNotifications.some(notification => notification.read === false) ? (
        <Badge
          badgeContent={
            userNotifications.filter(
              notifications => notifications.read === false
            ).length
          }
          color="secondary"
        >
          <NotificationsIcon />
        </Badge>
      ) : (
        <NotificationsIcon />
      )
    ) : (
      <NotificationsIcon />
    );

  const notificationsMarkUp =
    userNotifications && userNotifications.length ? (
      userNotifications.map((notification, notificationIndex) => {
        const verb = notification.type === "like" ? "liked" : "commented on";
        const time = dayjs(notification.createdAt).fromNow();
        const iconColor = notification.read ? "primary" : "secondary";
        const icon =
          notification.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );
        return (
          <MenuItem key={notificationIndex} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="initial"
              variant="body1"
              onClick={() => handleReadNotification(notification)}
              to={`/users/${notification.recipient}/scream/${notification.screamId}`}
            >
              {notification.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>you have no notifications yet</MenuItem>
    );
  return (
    <Fragment>
      <Tooltip placement="top" title="notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notificationsMarkUp}
        <MenuItem
          style={{ float: "right", marginTop: 10 }}
          onClick={handleReadAllNotifications}
        >
          <Typography color="initial" variant="caption">
            check all unread notifications
          </Typography>
          <DoneAllIcon style={{ marginLeft: 10 }} />
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default Notifications;
