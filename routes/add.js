const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        isAdd: true,
    })
})

module.exports = router