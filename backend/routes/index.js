const router = require("express").Router();
const { addUser, getAllUsers, updateUser, deleteUser, getById} = require("../controllers/userController")

const asyncHandler = require("../utils/asyncHandler");
const upload = require("../utils/multer");

router
  .post("/", upload.single("image"), asyncHandler(addUser))
  .get("/", asyncHandler(getAllUsers))
  .put("/:id", upload.single("image"), asyncHandler(updateUser))
  .delete("/:id", asyncHandler(deleteUser))
  .get("/:id", asyncHandler(getById));

module.exports = router;
