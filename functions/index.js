const functions = require("firebase-functions");
const app = require("express")();
const { db } = require("./helpers/admin");

const {
  getAllScreams,
  postScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream
} = require("./handlers/screams");
const {
  signUp,
  login,
  uploadImage,
  addUserDetails,
  getAuthentitcatedUser,
  getUserDetails,
  markNotificationsRead
} = require("./handlers/users");
const { FBAuth } = require("./helpers/middlewares");

// Screams routes
// get screams from firestore
app.get("/screams", getAllScreams);
// create scream at firestore
// route protected by FBAuth, if check is passed req will be enriched with req.user
app.post("/scream", FBAuth, postScream);
// get a single scream
app.get("/scream/:screamId", getScream);
// delete scream
app.delete("/scream/:screamId", FBAuth, deleteScream);
// like a scream
app.get("/scream/:screamId/like", FBAuth, likeScream);
// unlike scream
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream);
// comment on scream
app.post("/scream/:screamId/comment", FBAuth, commentOnScream);

// User routes
// signup with email and pass at auth
app.post("/signup", signUp);
// sigin route
app.post("/login", login);
// upload user profile picture
app.post("/user/image", FBAuth, uploadImage);
// add user details
app.post("/user", FBAuth, addUserDetails);
// get authenticated user details, own details
app.get("/user", FBAuth, getAuthentitcatedUser);
// get user general details, own or another user
app.get("/user/:handle", getUserDetails);
// check a notification as read
app.post("/notifications", FBAuth, markNotificationsRead);

// we tell firebase that the express app is the container of all the routes in the app
// we use good practice of api to have the api endpoints in the https://baseurl.com/api/whatever
// we create api function that is an https onRequest function that calls the express app. this will automatically turn into multiple routes
// to test the different endpoints we add to the express app we have to add the endpoint to the api function url that firebase functions gives to us
// for example, in this case if we want the screams it has to be https://us-central1-fbintegration-7e5f6.cloudfunctions.net/api/screams
// express takes care for us to send an error when we try to reach and endpoint with the wrong method so we do not have to check as we had to do with just node
// to force the region where the function is deployed add .region("europe-west1") for europe right after functions
exports.api = functions.region("europe-west1").https.onRequest(app);

exports.createNotificationOnLike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onCreate(async (snapshot, context) => {
    try {
      // .document("likes/{id}") triggers when we create any new document inside likes collection
      // the snapshot will be the snapshot object of the document created
      // we get the scream related to the created like
      const screamSnapshot = await db
        .doc(`screams/${snapshot.data().screamId}`)
        .get();
      if (
        screamSnapshot.exists &&
        screamSnapshot.data().userHandle !== snapshot.data().userHandle
      ) {
        // we crate the notification with the same id as the like that has being created
        return await db.doc(`notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: screamSnapshot.data().userHandle,
          sender: snapshot.data().userHandle,
          type: "like",
          read: false,
          screamId: screamSnapshot.id
        });
      }
      return true;
      // we do not have to return a response since this is not an api endpoint but a database trigger
    } catch (error) {
      console.error(error);
    }
  });

exports.deleteNotificationOnUnlike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onDelete(async (snapshot, context) => {
    // we dont want the likes notification to stay in the db when we unlike a scream so we delete them
    // since the notification has the same id as the like we can access it with the snapshot.id
    try {
      const notificationSnapshot = await db
        .doc(`notifications/${snapshot.id}`)
        .get();
      if (notificationSnapshot.exists)
        return await db.doc(`notifications/${snapshot.id}`).delete();
      return true;
    } catch (error) {
      console.error(error);
    }
  });

exports.createNotificationOnComment = functions
  .region("europe-west1")
  .firestore.document("comments/{id}")
  .onCreate(async (snapshot, context) => {
    try {
      const screamSnapshot = await db
        .doc(`screams/${snapshot.data().screamId}`)
        .get();
      if (
        screamSnapshot.exists &&
        screamSnapshot.data().userHandle !== snapshot.data().userHandle
      ) {
        return await db.doc(`notifications/${snapshot.id}`).set({
          createdAt: new Date().toISOString(),
          recipient: screamSnapshot.data().userHandle,
          sender: snapshot.data().userHandle,
          type: "comment",
          read: false,
          screamId: screamSnapshot.id
        });
      }
      return true;
    } catch (error) {
      console.error(error);
    }
  });

exports.onUserImageChange = functions
  .region("europe-west1")
  .firestore.document("users/{userId}")
  .onUpdate(async (change, context) => {
    // we want to change the imageUrl in every user's screams when it changes on the profile
    // change object has 2 snapshot objects, before and after the update
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      try {
        const batch = db.batch();
        const screamsSnapshotObj = await db
          .collection("screams")
          .where("userHandle", "==", change.after.data().handle)
          .get();
        screamsSnapshotObj.forEach(doc => {
          const screamRef = db.doc(`screams/${doc.id}`);
          batch.update(screamRef, { userImage: change.after.data().imageUrl });
        });
        return await batch.commit();
      } catch (error) {
        console.error(error);
      }
    } else return true;
  });

exports.onScreamDelete = functions
  .region("europe-west1")
  .firestore.document("screams/{screamId}")
  .onDelete(async (snapshot, context) => {
    try {
      // context has the params that we have in the url
      const screamId = context.params.screamId;
      const batch = db.batch();
      const commentsSnapshotObj = await db
        .collection("comments")
        .where("screamId", "==", screamId)
        .get();
      commentsSnapshotObj.forEach(doc => {
        batch.delete(db.doc(`comments/${doc.id}`));
      });
      const likesSnapshotObj = await db
        .collection("likes")
        .where("screamId", "==", screamId)
        .get();
      likesSnapshotObj.forEach(doc => {
        batch.delete(db.doc(`likes/${doc.id}`));
      });
      const notificationSnapshotObj = await db
        .collection("notifications")
        .where("screamId", "==", screamId)
        .get();
      notificationSnapshotObj.forEach(doc => {
        batch.delete(db.doc(`notifications/${doc.id}`));
      });
      return await batch.commit();
    } catch (error) {
      console.error(error);
    }
  });
