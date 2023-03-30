const divSenha = document.getElementById('senha')
const spanSenha = document.getElementById('spanSenha')
const spanGuiche = document.getElementById('spanGuiche')
const spanJornal = document.getElementById('texto')
const spanHora = document.getElementById('hora')
const divTemperatura = document.getElementById('temperatura')
let duracao = 2



let painel = {id:1}

//getPainel()
buscarSenha()
//atualizarJornal()
//atualizarTemp()
//window.requestAnimationFrame(getHora)

async function buscarSenha(){
    try{
        if(!painel){
            window.setTimeout(buscarSenha,5000)
            return
        }
        let senha = await fetch(`/api/painel/${painel.id}`).then(res => res.json())
        if(!senha){
            window.setTimeout(buscarSenha,500)
            return
        }
        chamarSenha(senha.senha.numero,senha.guiche.numero)
        window.setTimeout(buscarSenha,5000)
        return
    }catch(e){
        console.log(e)
        window.setTimeout(buscarSenha,5000)
        return
    }
}

function chamarSenha(senha,guiche){
    try{
        spanSenha.innerText = senha.toString().padStart(3,'0')
        spanGuiche.innerText = guiche.toString().padStart(2,'0')
        tocarSom()
        piscar()
    }catch(e){
        console.log(e)
    }
    
}

async function piscar(){
    spanSenha.classList.toggle('escondido')
    spanGuiche.classList.toggle('escondido')
    await sleep(500)

    spanSenha.classList.toggle('escondido')
    spanGuiche.classList.toggle('escondido')
    await sleep(1000)

    spanSenha.classList.toggle('escondido')
    spanGuiche.classList.toggle('escondido')
    await sleep(500)

    spanSenha.classList.toggle('escondido')
    spanGuiche.classList.toggle('escondido')
    await sleep(1000)

    spanSenha.classList.toggle('escondido')
    spanGuiche.classList.toggle('escondido')
    await sleep(500)

    spanSenha.classList.toggle('escondido')
    spanGuiche.classList.toggle('escondido')

}


// async function atualizarJornal(){
//     try{
//         let noticias = await getNoticias()
//         if(noticias.length == 0) return
//         let completo = noticias.join(' / ')
//         spanJornal.innerText = completo
//         duracao = completo.length / 3
//         let animationKeyframes = [{"transform":"translateX(0%)","marginLeft":"100%"},{"transform":"translateX(-100%)","marginLeft":"0%"}]
//         spanJornal.animate(animationKeyframes,{duration:duracao*1000,iterations:Infinity,fill:'forwards'})
//     }catch(e){
//         console.log(e)
//         duracao = 2
//     }
//     window.setTimeout(atualizarJornal,(duracao*1000))
// }

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms))
}

function getHora(){
    spanHora.innerText = moment().format(`DD/MM - HH:mm`)
    window.requestAnimationFrame(getHora)
}

// async function atualizarTemp(){
//     let dados = await getTemp()
//     divTemperatura.innerHTML = `<img src="${dados.icon}"><span>${dados.temperatura}</span>`
//     window.setTimeout(atualizarTemp,(15*60*1000))
// }

function tocarSom(){
    const campainha = new Audio('./bell.wav')
    campainha.play()
}