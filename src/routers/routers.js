const { Router } = require('express')
const controllerOnlineUser = require('../controllers/online-user')

const router = Router()

router.get('/online-users', controllerOnlineUser)

module.exports = router