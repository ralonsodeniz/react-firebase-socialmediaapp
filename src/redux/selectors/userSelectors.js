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
