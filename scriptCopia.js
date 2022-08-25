
/*
&nbsp - significa o tab (html entities)
*/

buscarMsgs();
function buscarMsgs() {
    // console.log('setInterval funcionando')
    const promessa = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
     console.log(promessa)
     promessa.then(processarResposta)
}


setInterval(buscarMsgs,3000);

function processarResposta(resposta) {
    console.log(resposta.data);
    popularTela(resposta.data);
}

function popularTela(mensagens) {
   
    for(let i=0; i < mensagens.length ; i ++) {
        switch(mensagens[i].type) {
            case 'status' : msgstatus(mensagens[i])
            // break;
            case 'message' : msgNormal(mensagens[i])
            // break;
            default: msgReservada(mensagens[i])
        }
        console.log(mensagens[i])
    }
}
const html = document.querySelector('.painel-msgs');
// html.innerHTML='';

function msgstatus(mensagem){
    
    
     const texto = `(${mensagem.time}) &nbsp <span class="negrito">${mensagem.from}</span> &nbsp ${mensagem.text} `
    // const texto = `(${mensagem.time}) ${" "}  <span class="negrito">${mensagem.from}</span> ${mensagem.text} `
    console.log(texto)
    html.innerHTML +=  `
                            <div class="msg-status"> ${texto}
                            </div>
                            `
}

function msgNormal(mensagem){
    const texto = `(${mensagem.time}) &nbsp <span class="negrito">${mensagem.from}</span> &nbsp ${mensagem.text} `
    console.log(texto)
    html.innerHTML +=  `
                            <div class="msg-normal"> ${texto}
                            </div>
                            `

}

function msgReservada(mensagem){
    const texto = `(${mensagem.time}) &nbsp <span class="negrito">${mensagem.from}</span> reservadamente para <span class="negrito">${mensagem.to}</span>: &nbsp ${mensagem.text} `
    console.log(texto)
    html.innerHTML +=  `
                            <div class="msg-reservada"> ${texto}
                            </div>
                            `

}