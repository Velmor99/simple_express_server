const { Router } = require("express");
const router = Router();
const coursesModel = require("../models/courses");
const cartModel = require("../models/cart");

router.get("/", (req, res) => {
  res.render("cart", {
    isCart: true,
  });
});

router.post("/add", async (req, res) => {
  const course = await coursesModel.findById(req.body.id);
  await cartModel.add(course);
  res.redirect("/cart");
});

module.exports = router;
