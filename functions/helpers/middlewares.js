const { db, admin } = require("../helpers/admin");

// middleware to check if the request comes from an authenticated source using JWT
// we use the middleware on the routes we want to have protected as the second parameter
// next is what makes the middleware to proceed to the next step, the handler or another middleware, we can chain as many middlewares as we need
exports.FBAuth = async (req, res, next) => {
  // we check if the headers has the authorization key and if it has the Bearer keyword before the token
  let idToken = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // we split the authorization string and we save the token part
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.error("no token found");
    return res.status(403).json({ error: "unauthorized" });
  }

  try {
    // we check if the token is a token from our app
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // if it is, decodedToken will contain the user data from the user that holds that token
    // we add to the request data from the token so the app gets the data from the token at the protected routes
    req.user = decodedToken;
    // we query our db to get the handler of the user we got from the token
    const userSnapshot = await db
      .collection("users")
      .where("userId", "==", req.user.uid)
      .limit(1)
      .get();
    // because we using a collection reference using where even is we limit to 1 the answer we still get a docs array property
    // we add the handle to the request
    req.user.handle = userSnapshot.docs[0].data().handle;
    req.user.imageUrl = userSnapshot.docs[0].data().imageUrl;
    // if everything is ok we proceed to the next middleware / app endpoint
    return next();
  } catch (error) {
    console.error("error while verifying token", error);
    return res.status(403).json(error);
  }
};
