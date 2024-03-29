let senhaAtual = 0

async function gerar(prioridade){
    let senha = await fetch(`/api/impressora/gerar/${prioridade}`).then(res=>res.json())
    senhaAtual = senha.numero
    printPage('/impressao.html')
    console.log(prioridade)
}

function closePrint () {
    document.body.removeChild(this.__container__);
  }
  
  function setPrint () {
    this.contentWindow.document.getElementById('senha').innerText = senhaAtual
    this.contentWindow.__container__ = this;
    this.contentWindow.onbeforeunload = closePrint;
    this.contentWindow.onafterprint = closePrint;
    this.contentWindow.focus(); // Required for IE
    this.contentWindow.print();
  }
  
  function printPage (sURL) {
    var oHiddFrame = document.createElement("iframe");
    oHiddFrame.onload = setPrint;
    oHiddFrame.style.position = "fixed";
    oHiddFrame.style.right = "0";
    oHiddFrame.style.bottom = "0";
    oHiddFrame.style.width = "0";
    oHiddFrame.style.height = "0";
    oHiddFrame.style.border = "0";
    oHiddFrame.src = sURL;
    document.body.appendChild(oHiddFrame);
  }