const {express,prisma} = require('../utils')

const router = express.Router()

router.get('/fila', async (req, res) => {
    let senhas = await prisma.senha.findMany(
    {
        where:{
            chamada: false,
        },
        orderBy:[
        {
            prioritario: 'desc'
        },    
        {
            id: 'asc'
        }] 
    })
    res.send(senhas)
})

router.post('/chamar', async (req, res) => {
    let idSenha = req.body.id
    let guiche = req.body.guiche
    console.log(idSenha, guiche)
    try {
        await prisma.senha.update({
            where:{
                id: idSenha
            },
            data:{
                chamada: true,
                time_chamada: new Date()
            },

        })

        await prisma.painel_chamar.create({
            data:{
                senha_id: parseInt(idSenha),
                guiche_id: guiche
            }
        })
        res.send('Senha chamada')
    } catch (error) {
        console.log(error)
        res.send("Erro ao chamar senha")
    }
    
})

router.get('/chamadas/:limite', async (req, res) => {
    try {
        let senhas = await prisma.senha.findMany({
            where:{
                chamada: true
            },
            orderBy:{
                time_chamada: 'desc'
            },
            take: parseInt(req.params.limite)
        })
        res.send(senhas)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router