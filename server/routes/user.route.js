const express = require("express");
const { signup, login, getUsers, userInfo, logout, deleteUser, updateUser } = require("../controllers/user.controller");
const router = express.Router();
const { auth } = require("../middleware/auth");
const Upload = require("../middleware/multer");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", auth, logout)
router.get("/users", auth, getUsers)
router.get("/profile/:id",auth, userInfo)
router.put("/updateprofile/:id",auth, Upload.upload.single("imageProfile"), updateUser)
router.delete("/profile/:id",auth, deleteUser)

module.exports = router;
