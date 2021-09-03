const express = require("express");
const { requireSignin, adminMiddleware } = require("../../common-middleware");
const { addSubcategory, getSubcategories } = require("../../controller/user/subcategory");
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

router.post("/subcategory/create", requireSignin, adminMiddleware ,upload.single('categoryImage'),addSubcategory);
router.get("/subcategory/getsubcategory/:parentId", getSubcategories);

module.exports = router;