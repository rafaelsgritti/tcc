const {express} = require('../utils')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('painel')
})

module.exports = router