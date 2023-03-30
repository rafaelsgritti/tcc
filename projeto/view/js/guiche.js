moment.locale('pt-br')

let escolhido = localStorage.getItem('guiche')

let btChamar = document.getElementById('btChamar')


if(escolhido == null){
    getGuiches()
}else{
    getSenhas()
}

function getGuiches(){
    document.body.innerHTML = '<select id="selGuiches"></select><button id="btSelGuiche">Selecionar</button>'
    btSelGuiche.addEventListener('click', () => {
        let selGuiches = document.getElementById('selGuiches')
        let guiche = selGuiches.options[selGuiches.selectedIndex].value
        localStorage.setItem('guiche', guiche)
        window.location.reload()
    })
    fetch('/api/guiche').then(res => res.json()).then(data => {
        let selGuiches = document.getElementById('selGuiches')
        data.forEach(guiche => {
            let option = document.createElement('option')
            option.value = guiche.id
            option.innerText = guiche.nome
            selGuiches.appendChild(option)
        });
    })
}


function getSenhas(){
    let htmlFinal = ''
    fetch('/api/senha/fila').then(res => res.json()).then(data => {
        let tabelaSenhas = document.getElementById('tabelaSenhas')
        data.forEach(senha => {
            let criada = moment(senha.criada)
            let diff = moment().diff(criada,'minutes')
            let html = `<tr data-id="${senha.id}" data-numero="${senha.numero}">
            <td>${senha.numero} ${senha.prioritario ? 'Prioritário' : 'Normal'}</td>
            <td>${criada.format('LT')}</td>
            <td>${diff} ${parseInt(diff)>1 ? 'minutos' : 'minuto'}</td>
        </tr>`
        htmlFinal += html
        });
        tabelaSenhas.tBodies[0].innerHTML = htmlFinal
    })
}

function limparguiche(){
    let chosen = window.confirm('Tem certeza que deseja limpar o guichê?')
    if(chosen){
    localStorage.removeItem('guiche')
    window.location.reload()
    }
}

window.setInterval(getSenhas, 1000)

btChamar.addEventListener('click', () => {
    let idSenha = tabelaSenhas.tBodies[0].rows[0].dataset.id
    let numeroSenha = tabelaSenhas.tBodies[0].rows[0].dataset.numero
    fetch('/api/senha/chamar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: parseInt(idSenha),
            guiche: parseInt(escolhido)
        })
    }).then(res => res.text()).then(data => {
        getSenhas()
    })
    document.getElementById('senhaAtual').innerText = numeroSenha
    tabelaSenhas.tBodies[0].removeChild(tabelaSenhas.tBodies[0].rows[0])
})