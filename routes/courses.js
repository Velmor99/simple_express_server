const { Router } = require("express");
const router = Router();
const coursesModel = require("../models/courses");

router.get("/", async (req, res) => {
  const courses = await coursesModel.getAll();
  res.render("courses", {
    isCourses: true,
    title: "Курсы",
    courses: courses,
  });
});

router.get("/:id", async (req, res) => {
  const course = await coursesModel.findById(req.params.id);
  res.render("course", {
    layout: "empty",
    course: course,
  });
});

router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    res.redirect("/");
  }
  const course = await coursesModel.findById(req.params.id);
  res.render("courses-edit", {
    title: `Редактировать курс ${course.title}`,
    course: course,
  });
});

router.post("/edit", async (req, res) => {
    await coursesModel.changeCourse(req.body)
    res.redirect('/courses')
})

module.exports = router;
