const {express,prisma} = require("../utils");
const router = express.Router();

router.post('/',async (req,res)=>{
    let {inicial, final} = req.body;
    console.log(req.body)
    console.log(inicial,final)
    let senhas = await prisma.senha.findMany({
        where:{
            AND:[
                {
                    time_chamada:{
                        gte:new Date(inicial)
                    }
                },
                {
                    time_chamada:{
                        lte:new Date(final)
                    }
                },
                {chamada:true}
            ]
        },
        include:{
            guiche:{
                select:{
                    numero:true
                }
            }
        }
    });
    res.json(senhas).status(200);
    
})

module.exports = router;