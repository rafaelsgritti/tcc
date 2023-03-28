const {express, prisma} = require('../utils')

const router = express.Router()

router.get('/gerar/:prioridade?', async (req, res) => {
    let prioridade = req.params.prioridade
    !prioridade || prioridade == 0 ? prioridade = 0 : prioridade = 1

    try {
        let ultimaSenha = await prisma.senha.findFirst({
            orderBy: {
                id: 'desc'
            }
        })
        await prisma.senha.create({
            data: {
                numero: ultimaSenha.numero + 1,
                prioritario: prioridade
            }
        })
        res.send('Senha gerada')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

module.exports = router