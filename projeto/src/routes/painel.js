const {express,prisma} = require('../utils')

const router = express.Router()

router.get('/:id', async (req, res) => {
    try {
        let senha = await prisma.painel_chamar.findFirst({orderBy:{id:'asc'},include:{senha:true,guiche:true}})
        if(senha){
            res.send(senha)
            await prisma.painel_chamar.delete({where:{id:senha.id}})
        }else{
            res.sendStatus(204)
        }
        
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
    
})

module.exports = router