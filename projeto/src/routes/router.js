const {express} = require('../utils')

const router = express.Router()

router.use('/senha', require('./senha'))
router.use('/guiche', require('./guiche'))
router.use('/painel', require('./painel'))
router.use('/impressora', require('./impressora'))

module.exports = router
