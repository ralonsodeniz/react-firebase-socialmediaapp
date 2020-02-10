const firebase = require("firebase");
const BusBoy = require("busboy");
const path = require("path");
const os = require("os");
const fs = require("fs");

const { db, storage } = require("../helpers/admin");
const {
  validateSingupData,
  validateLoginData,
  reduceUserDetails
} = require("../helpers/helpers");
const { firebaseConfig } = require("../helpers/config");

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

exports.signUp = async (req, res) => {
  // create user object from request
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  // validate data
  const { errors, valid } = validateSingupData(newUser);
  if (!valid) return res.status(400).json(errors);

  const noImg = "no-image.webp";

  try {
    const userSnapshot = await db.doc(`users/${newUser.handle}`).get();
    if (userSnapshot.exists) {
      return res.status(400).json({ handle: `this handle is already taken` });
    } else {
      const user = await auth.createUserWithEmailAndPassword(
        newUser.email,
        newUser.password
      );

      // we create a JWT for the user used to identify the user to a Firebase service
      // we will use it to access protected routes
      const userIdToken = await user.user.getIdToken();
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${noImg}?alt=media`,
        userId: user.user.uid
      };
      const userRef = db.doc(`users/${newUser.handle}`);
      await userRef.set(userCredentials);
      return res.status(201).json({ token: userIdToken });
    }
  } catch (error) {
    console.log("error while creating the user", error.message);
    if (error.code === "auth/email-already-in-use")
      return res.status(400).json({ email: "email is already in use" });
    return res
      .status(500)
      .json({ general: "something went wrong, plesae try again" });
  }
};

exports.login = async (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  };

  const { errors, valid } = validateLoginData(userData);
  if (!valid) return res.status(400).json(errors);

  try {
    const user = await auth.signInWithEmailAndPassword(
      userData.email,
      userData.password
    );
    const userIdToken = await user.user.getIdToken();
    return res.json({ token: userIdToken });
  } catch (error) {
    console.error(error);
    // auth/wrong-password
    // auth/user-not-found
    return res
      .status(403)
      .json({ general: "wrong credentials, please try again" });
  }
};

exports.uploadImage = async (req, res) => {
  const busboy = new BusBoy({
    headers: req.headers
  });

  let imageFileName = "";
  let imageToBeUploaded = {};

  try {
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      if (
        mimetype !== "image/jpeg" &&
        mimetype !== "image/png" &&
        mimetype !== "image/webp"
      )
        return res.status(400).json({ error: "wrong file type submitted" });
      // this gets us the image extension
      const imageExtension = filename.split(".")[
        filename.split(".").length - 1
      ];
      imageFileName = `${Math.round(
        Math.random() * 1000000000
      )}.${imageExtension}`;
      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = {
        filepath,
        mimetype
      };
      file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on("finish", async () => {
      await storage.bucket().upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype
          }
        }
      });
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;
      const userRef = db.doc(`users/${req.user.handle}`);
      await userRef.update({
        imageUrl
      });
      return res.json({ message: "image uploaded successfully" });
    });
    busboy.end(req.rawBody);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.code });
  }
};

exports.addUserDetails = async (req, res) => {
  try {
    const userDetails = reduceUserDetails(req.body);
    const userRef = db.doc(`users/${req.user.handle}`);
    await userRef.update(userDetails);
    return res.json({ message: "details added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.code });
  }
};

exports.getAuthentitcatedUser = async (req, res) => {
  try {
    const userRef = db.doc(`users/${req.user.handle}`);
    const userSnapshot = await userRef.get();
    if (userSnapshot.exists) {
      const likesQueryObj = await db
        .collection("likes")
        .where("userHandle", "==", req.user.handle)
        .get();
      const likes = likesQueryObj.docs.map(doc => doc.data());
      const notificationsQueryObj = await db
        .collection("notifications")
        .where("recipient", "==", req.user.handle)
        .orderBy("createdAt", "desc")
        // .limit(10)
        .get();
      const notifications = notificationsQueryObj.docs.map(doc => ({
        ...doc.data(),
        notificationId: doc.id
      }));
      const userData = {
        credentials: userSnapshot.data(),
        likes,
        notifications
      };
      return res.json(userData);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.code });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const userSnapshot = await db.doc(`users/${req.params.handle}`).get();
    if (userSnapshot.exists) {
      const user = userSnapshot.data();
      const userScreamsQueryObj = await db
        .collection("screams")
        .where("userHandle", "==", req.params.handle)
        .orderBy("createdAt", "desc")
        .get();
      const screams = userScreamsQueryObj.docs.map(doc => ({
        ...doc.data(),
        screamId: doc.id
      }));
      const userData = {
        user,
        screams
      };
      return res.json(userData);
    } else {
      return res.status(404).json({ error: "user not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.code });
  }
};

exports.markNotificationsRead = async (req, res) => {
  // this will work as follows
  // when we open the notification dropdown we will send to the server an array of notifications id that have been just seen so the sever mark them as read
  // since we want to update all the notifications in the array as a group, if one fails all fails, we use a batch
  try {
    const batch = db.batch();
    req.body.forEach(notificationId => {
      const notificationRef = db.doc(`notifications/${notificationId}`);
      batch.update(notificationRef, { read: true });
    });
    await batch.commit();
    return res.json({ message: "notifications marked read" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.code });
  }
};
