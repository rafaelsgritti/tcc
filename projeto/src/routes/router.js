const {express} = require('../utils')

const router = express.Router()

router.use('/senha', require('./senha'))
router.use('/guiche', require('./guiche'))
router.use('/painel', require('./painel'))
router.use('/impressora', require('./impressora'))
router.use('/relatorio', require('./relatorio'))

module.exports = router
