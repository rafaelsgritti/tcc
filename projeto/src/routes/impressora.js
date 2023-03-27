const {express} = require('../utils')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('impressora')
})

module.exports = router