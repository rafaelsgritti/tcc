const {express, prisma} = require('../utils')

const router = express.Router()

router.get('/', async (req, res) => {
    console.log(req.baseUrl)
    try {
        let guiches = await prisma.guiche.findMany()
        res.send(guiches)
    } catch (error) {
        console.log(error)
        res.send("Erro ao buscar guiches")
    }
})

module.exports = router