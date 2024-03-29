const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

// Routers:
router.get("/blogs/category/:slug", userController.blog_list);

router.get("/blogs/:slug", userController.blog_details);

router.get("/blogs", userController.blog_list);

router.get("/", userController.index);

module.exports = router;