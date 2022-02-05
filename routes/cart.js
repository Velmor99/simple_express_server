const { Router } = require("express");
const router = Router();
const coursesModel = require("../models/courses");
const cartModel = require("../models/cart");

router.get("/", async (req, res) => {
  const data = await cartModel.getCart();
  res.render("cart", {
    isCart: true,
    courses: data.courses,
    price: data.price,
  });
});

router.post("/add", async (req, res) => {
  const course = await coursesModel.findById(req.body.id);
  await cartModel.add(course);
  res.redirect("/cart");
});

router.delete("/remove/:id", async (req, res) => {
  const cart = await cartModel.remove(req.params.id);
  res.status(200).json(cart);
});

module.exports = router;
