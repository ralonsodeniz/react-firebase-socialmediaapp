import { createSelector } from "reselect";

// input selector
const selectUser = state => state.user;

// output selectors
export const selectUserAuthenticated = createSelector(
  [selectUser],
  user => user.authenthicated
);

export const selectUserLoading = createSelector(
  [selectUser],
  user => user.loading
);

export const selectUserCredentials = createSelector(
  [selectUser],
  user => user.credentials
);

export const selectUserLikes = createSelector([selectUser], user => user.likes);

export const selectUserNotifications = createSelector(
  [selectUser],
  user => user.notifications
);

export const selectUserHandle = createSelector(
  [selectUserCredentials],
  userCredentials => userCredentials.handle
);
