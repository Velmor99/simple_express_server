const { Router } = require("express");
const router = Router();
const coursesModel = require("../models/courses");

router.get("/", (req, res) => {
  res.render("add", {
    isAdd: true,
    title: "Добавить курс",
  });
});

router.post("/", async (req, res) => {
  const courses = new coursesModel(req.body.title, req.body.price, req.body.img);
  await courses.Save()
  res.redirect('/courses')
});

module.exports = router;
