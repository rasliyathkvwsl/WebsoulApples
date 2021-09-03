const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const {addCategory, getCategories,updateCategories, deleteCategories} = require("../../controller/user/category");
const multer =require('multer');
const router = express.Router();
const shortid = require("shortid");
const path = require("path");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
// upload.single('categoryImage')
const upload = multer({storage});

router.post("/category/create", requireSignin, adminMiddleware ,upload.single('categoryImage'),addCategory);
router.get("/category/getcategory", getCategories);
router.post("/category/update", upload.array('categoryImage'),updateCategories);
router.post("/category/delete/:id",deleteCategories);

module.exports = router;