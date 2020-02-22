import { createSelector } from "reselect";

// input selector
const selectUi = state => state.ui;

// output selectors
export const selectUiLoading = createSelector([selectUi], ui => ui.loading);

export const selectUiErrors = createSelector([selectUi], ui => ui.errors);
