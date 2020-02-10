const { db } = require("../helpers/admin");

exports.getAllScreams = async (req, res) => {
  try {
    const screamsSnapshotObj = await db
      .collection("screams")
      // firestore allows us to sort the query by a field of the documents queried using .orderBy("field","typeofsort")
      .orderBy("createdAt", "desc")
      .get();
    const screamsDocs = screamsSnapshotObj.docs;
    const screamsData = screamsDocs.map(scream => ({
      screamId: scream.id,
      ...scream.data()
    }));
    return res.json(screamsData);
  } catch (error) {
    console.log("error while getting screams from db", error.message);
    return res.status(500).json(error.message);
  }
};

exports.postScream = async (req, res) => {
  try {
    const newScream = {
      body: req.body.body,
      userHandle: req.user.handle,
      userImage: req.user.imageUrl,
      // this create a firestore timestamp format
      // createdAt: admin.firestore.Timestamp.fromDate(new Date())
      // this create a date and transform it to isostring
      createdAt: new Date().toISOString(),
      likeCount: 0,
      commentCount: 0
    };

    const screamRef = await db.collection("screams").add(newScream);
    const resScream = {
      ...newScream,
      screamId: screamRef.id
    };
    return res.json(resScream);
  } catch (error) {
    console.log("error while creating the scream", error.message);
    return res.status(500).json({
      error: `something whent wrong while creating the scream, ${error.message}`
    });
  }
};

exports.getScream = async (req, res) => {
  try {
    const screamSnapshot = await db.doc(`screams/${req.params.screamId}`).get();
    if (!screamSnapshot.exists)
      return res.status(404).json({ error: "scream not found" });
    const screamCommentsObj = await db
      .collection("comments")
      // when we make a complex query (usually more than 1 condition) we need to create an index at firestore, using the firebase serve for testing will give you the link to create the index if you do not have it
      .orderBy("createdAt", "desc")
      .where("screamId", "==", req.params.screamId)
      .get();
    const screamData = {
      ...screamSnapshot.data(),
      screamId: screamSnapshot.id,
      comments: screamCommentsObj.docs.map(doc => doc.data())
    };
    return res.json(screamData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.code });
  }
};

exports.commentOnScream = async (req, res) => {
  if (req.body.body.trim() === "")
    return res.status(400).json({ comment: "Must not be empty" });
  try {
    const newComment = {
      body: req.body.body,
      createdAt: new Date().toISOString(),
      screamId: req.params.screamId,
      userHandle: req.user.handle,
      userImage: req.user.imageUrl
    };
    const screamSnapshot = await db.doc(`screams/${req.params.screamId}`).get();
    if (!screamSnapshot.exists)
      return res.status(404).json({ error: "scream not found" });
    // we can access the reference objecte from the snapashot object using .ref on the snapshot object so we can update it with the new commentCount
    await screamSnapshot.ref.update({
      commentCount: screamSnapshot.data().commentCount + 1
    });
    await db.collection("comments").add(newComment);
    res.json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `something went wrong ${error.code}` });
  }
};

exports.likeScream = async (req, res) => {
  try {
    const likeQueryObj = db
      .collection("likes")
      .where("userHandle", "==", req.user.handle)
      .where("screamId", "==", req.params.screamId)
      .limit(1);
    const screamRef = db.doc(`screams/${req.params.screamId}`);
    const screamSnapshot = await screamRef.get();
    if (screamSnapshot.exists) {
      const likeSnapshot = await likeQueryObj.get();
      if (likeSnapshot.empty) {
        await db.collection("likes").add({
          screamId: req.params.screamId,
          userHandle: req.user.handle
        });

        const screamData = {
          ...screamSnapshot.data(),
          screamId: screamSnapshot.id,
          likeCount: screamSnapshot.data().likeCount + 1
        };

        await screamRef.update({ likeCount: screamData.likeCount });
        return res.json(screamData);
      } else {
        return res.status(400).json({ error: "scream already liked" });
      }
    } else {
      return res.status(404).json({ error: "scream not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.code });
  }
};

exports.unlikeScream = async (req, res) => {
  try {
    const likeQueryObj = db
      .collection("likes")
      .where("userHandle", "==", req.user.handle)
      .where("screamId", "==", req.params.screamId)
      .limit(1);
    const screamRef = db.doc(`screams/${req.params.screamId}`);
    const screamSnapshot = await screamRef.get();
    if (screamSnapshot.exists) {
      const likeSnapshot = await likeQueryObj.get();
      if (likeSnapshot.empty) {
        return res.status(400).json({ error: "scream not liked" });
      } else {
        // we get the id of the like we queried on the likeQueryObj, remember that even if we limit the query to 1 result it returns a docs array with 1 item
        await db.doc(`likes/${likeSnapshot.docs[0].id}`).delete();

        const screamData = {
          ...screamSnapshot.data(),
          screamId: screamSnapshot.id,
          likeCount: screamSnapshot.data().likeCount - 1
        };

        await screamRef.update({ likeCount: screamData.likeCount });
        return res.json(screamData);
      }
    } else {
      return res.status(404).json({ error: "scream not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.code });
  }
};

exports.deleteScream = async (req, res) => {
  try {
    const screamRef = db.doc(`screams/${req.params.screamId}`);
    const screamSnapshot = await screamRef.get();
    if (!screamSnapshot.exists)
      return res.status(404).json({ error: "scream not found" });
    if (screamSnapshot.data().userHandle !== req.user.handle)
      return res.status(403).json({ error: "unauthorized" });
    // this is replaced by a firestore scream document deletion triggered function
    // //delete comments,likes and notifications associated to the scream
    // const commentsQuery = db
    //   .collection("comments")
    //   .where("screamId", "==", req.params.screamId);
    // // this get executes the query and returns the querySnapshot with the docs array
    // const commentsQuerySnapshot = await commentsQuery.get();
    // commentsQuerySnapshot.docs.forEach(async doc => {
    //   await doc.ref.delete();
    // });
    // const likesQuery = db
    //   .collection("likes")
    //   .where("screamId", "==", req.params.screamId);
    // const likesQuerySnapshot = await likesQuery.get();
    // likesQuerySnapshot.docs.forEach(async doc => {
    //   await doc.ref.delete();
    // });
    // const notificationsQuery = db
    //   .collection("notifications")
    //   .where("screamId", "==", req.params.screamId);
    // const notificationsQuerySnapshot = await notificationsQuery.get();
    // notificationsQuerySnapshot.docs.forEach(async doc => {
    //   await doc.ref.delete();
    // });
    // delete scream
    await screamRef.delete();
    return res.json({ message: "scream deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.code });
  }
};
