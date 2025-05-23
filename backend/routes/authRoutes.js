const express = require("express");
const { register, login, getUserDetails, logout, changePassword, forgotPassword,  resetPassword } = require("../controllers/authController");
const { verifyTokenAndFetchUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", register);

router.post("/login", login);

router.get("/me", verifyTokenAndFetchUser, getUserDetails);

router.post("/logout", logout);

router.post("/change-password", changePassword);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


module.exports = router;
