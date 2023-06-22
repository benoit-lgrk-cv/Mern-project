const express = require("express");
const {
  createAlert,
  getAlerts,
  getUserAlerts,
  getAlert,
  updateAlert,
  deleteAlert,
  commentPost,
  editComment,
  deleteComment,
} = require("../controllers/alert.controller");
const router = express.Router();
const Upload = require("../middleware/multer");

router.post("/post", Upload.upload.single("imageUrl"), createAlert);
router.get("/all", getAlerts);
router.get("/:id", getUserAlerts);
router.get("/update/:id", getAlert);
router.put("/update/:id", Upload.upload.single("imageUrl"), updateAlert);
router.delete("/:id", deleteAlert);

//commentaires
router.patch("/comment-alert/:id", commentPost);
router.patch("/edit-comment/:id", editComment);
router.patch("/delete-comment/:id", deleteComment);

module.exports = router;
