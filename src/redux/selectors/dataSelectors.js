import { createSelector } from "reselect";

// imput selector
const selectData = state => state.data;

// outpput selectors
export const selectDataScreams = createSelector(
  [selectData],
  data => data.screams
);

export const selectDataLoading = createSelector(
  [selectData],
  data => data.loading
);
