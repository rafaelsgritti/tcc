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
    fetch('/api/senha/fila').then(res => res.json()).then(data => {
        let tabelaSenhas = document.getElementById('tabelaSenhas')
        data.forEach(senha => {
            let criada = moment(senha.criada.replace('Z',''))
            let html = `<tr>
            <td>${senha.id}</td>
            <td>${criada.format('LT')}</td>
            <td>${moment().diff(criada,'minutes')} minutos</td>
        </tr>`
        tabelaSenhas.tBodies[0].innerHTML += html
        });
    })
}

function limparguiche(){
    let chosen = window.confirm('Tem certeza que deseja limpar o guichê?')
    if(chosen){
    localStorage.removeItem('guiche')
    window.location.reload()
    }
}