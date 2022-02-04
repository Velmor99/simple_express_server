const {Router} = require('express')
const router = Router()
const coursesModel = require('../models/courses')

router.get('/', async (req, res) => {
    const courses = await coursesModel.getAll()
    res.render('courses', {
        isCourses: true,
        title: "Курсы",
        courses: courses
    })
})

module.exports = router