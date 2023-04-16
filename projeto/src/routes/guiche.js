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
router.post('/', async (req, res) => {
    try {
        let guiche = await prisma.guiche.upsert({
            where: {
                id: req.body.id ? parseInt(req.body.id) : 0
            },
            create: {
                numero: req.body.numero,
                nome: req.body.nome
            },
            update: {
                numero: req.body.numero,
                nome: req.body.nome
            }
        })
        console.log('criando')
        res.send(guiche)
    } catch (error) {
        console.log(error)
        res.send("Erro ao criar guiche")
    }
})
router.delete('/:id', async (req, res) => {
    try {
        let guiche = await prisma.guiche.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        res.send(guiche)
    } catch (error) {
        console.log(error)
        res.send("Erro ao deletar guiche")
    }
})

module.exports = router