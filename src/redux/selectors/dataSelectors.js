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

export const selectDataScreamWithId = createSelector(
  [selectDataScreams, (_, screamId) => screamId],
  (screams, screamId) =>
    screams
      ? screams.some(scream => scream.screamId === screamId)
        ? screams.find(scream => scream.screamId === screamId)
        : {
            body: "not found",
            createdAt: "",
            userImage:
              "https://firebasestorage.googleapis.com/v0/b/fbintegration-7e5f6.appspot.com/o/no-image.webp?alt=media&token=462880ff-7d6b-46f1-b66c-f123c5b8005b",
            userHandle: "not found",
            likeCount: 0,
            commentCount: 0
          }
      : {
          body: "not found",
          createdAt: "",
          userImage:
            "https://firebasestorage.googleapis.com/v0/b/fbintegration-7e5f6.appspot.com/o/no-image.webp?alt=media&token=462880ff-7d6b-46f1-b66c-f123c5b8005b",
          userHandle: "not found",
          likeCount: 0,
          commentCount: 0
        }
);

export const selectDataScream = createSelector(
  [selectData],
  data => data.scream
);
