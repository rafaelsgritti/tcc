function gerar(){
    let prioridade = document.getElementById('prioridade').checked ? 1 : 0
    fetch(`/api/impressora/gerar/${prioridade}`)
    console.log(prioridade)
}