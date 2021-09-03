const express = require("express");
const { addItemTofavorite } = require("../../controller/user/favorite");
const { requireSignin, userMiddleware } = require("../../common-middleware/index");
const router = express.Router();

router.post("/user/favorite/addtofavorite",
  requireSignin,
  userMiddleware,
  addItemTofavorite
);
// router.post('/user/cart/addToCartByLogin', requireSignin, userMiddleware, addToCart);
// router.post("/user/getCartItems", requireSignin, userMiddleware, getCartItems);
// //new update
// router.post("/user/cart/removeItem",
//   requireSignin,
//   userMiddleware,
//   removeCartItems
// );

module.exports = router;
