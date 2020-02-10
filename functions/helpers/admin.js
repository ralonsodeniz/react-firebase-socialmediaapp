const admin = require("firebase-admin");

const serviceAccount = require("../config/fbintegration-7e5f6-firebase-adminsdk-6ad6j-172bf34a03.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fbintegration-7e5f6.firebaseio.com",
  storageBucket: "fbintegration-7e5f6.appspot.com"
});

const db = admin.firestore();
const storage = admin.storage();

module.exports = {
  admin,
  db,
  storage
};
