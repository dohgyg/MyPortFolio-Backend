import express from "express";
import userCtrl from "../controllers/user.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// /api/users (do server.js đã mount: app.use('/api/users', router))
router
  .route("/")
  .post(userCtrl.create)   // Signup
  .get(userCtrl.list);     // List all users

router
  .route("/:userId")
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.param("userId", userCtrl.userByID);

export default router;
