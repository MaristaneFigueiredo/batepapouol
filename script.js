

let nomeUsuario, idAtivarConexao,idRecarregarMsgsBatePapo;


do {
    nomeUsuario = prompt("Bem vindo ao bate papo! Para participar informe o seu nome:");
} while (nomeUsuario == "" || nomeUsuario == null)



console.log('nomeUsuario', nomeUsuario);

inserirDadosBatePapo(nomeUsuario);
buscarDadosBatePapo();
ativarSetInterval() ;



function buscarDadosBatePapo() {
    console.log('entrou no buscar dados bate papo')
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promessa.then(renderizarBatePapo); //Agenda para tratar o sucesso, ou seja, trazer os dados
    promessa.catch(buscaDadosErro); // Agenda para tratar algum erro;

    

}

function buscaDadosErro() {
    alert("ocorreu um erro, tente novamente mais tarde")
    console.log (err.response) 
}





//
let responsavel, destindestinatario, texto, tempo, tipo;
innerHTML = '';

function renderizarBatePapo(resposta) {
    const objetoDadosUol = resposta.data;


    for (let i = 0; i < objetoDadosUol.length; i++) {
        responsavel = objetoDadosUol[i].from;
        destinatario = objetoDadosUol[i].to;
        texto = objetoDadosUol[i].text;
        tempo = objetoDadosUol[i].time;
        tipo = objetoDadosUol[i].type;



        switch (tipo) {
            case 'status':
                msgStatus();
                break;
            case 'private_message':
                if (nomeUsuario === destinatario || destinatario === 'Todos') {
                    msgReservada();
                }

                break;
            case 'message':
                msgnormal();
                break;

        }

    }

    rolagemAutomatica();

}

const lista = document.querySelector('.listaPapos')


function msgStatus() {
    lista.innerHTML += `
                           <li class="msg-status">
                                (${tempo})&nbsp<span>${responsavel}</span>&nbsp${texto}                                                                     
                           </li>   
                           `;

}

function msgReservada() {
    lista.innerHTML += `
           <li class="msg-reservada">
               (${tempo})&nbsp<span>${responsavel}</span>&nbspreservadamente para&nbsp<span>${destinatario}</span>:&nbsp${texto}                                                                     
           </li>   
           `;
}

function msgnormal() {

    lista.innerHTML += `
          <li class="msg-normal">
               (${tempo})&nbsp<span>${responsavel}</span>&nbsppara&nbsp<span>${destinatario}</span>:&nbsp${texto}                                                                     
          </li>   
          `;
}


function rolagemAutomatica() {
    const ultimaMsg = document.querySelector('.listaPapos>:last-child');
    ultimaMsg.scrollIntoView();

}



function inserirDadosBatePapo(usuario) {
    
    const nome = {
        name: usuario
    }

    console.log('nome', nome)
    // const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",nome);    
    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', { name: usuario })
    console.log('promessa', promessa)
    promessa.then(tratarSucessoInsercao); //Agenda para tratar o sucesso  
    promessa.catch(tratarErroInsercao); // Agenda para tratar algum erro;     

}
function tratarSucessoInsercao() {
    console.log('usuário foi inserido no bate papo com sucesso!')

}
// function tratarErroInsercao(erro) {
//     console.log('erro na inserção de dados', erro.response.status)

//     if (erro.response.status === 400) {
//         nomeUsuario = prompt("Já existe um usuário com este nome! Por genteleza, informar um novo nome:");
//         if (nomeUsuario !== null) {
//             console.log('nomeUsuario', nomeUsuario)
//             inserirDadosBatePapo(nomeUsuario);
//         }
//     }
// }


function tratarErroInsercao(erro) {
    console.log('erro na inserção de dados', erro.response.status)

    if (erro.response.status === 400) {
       
        do {
            nomeUsuario = prompt("Já existe um usuário com este nome! Por genteleza, informar um novo nome:");
        } while (nomeUsuario == "" || nomeUsuario == null)  
       
        
        if (nomeUsuario !== null) {
            // console.log('nomeUsuario', nomeUsuario)
            inserirDadosBatePapo(nomeUsuario);
        }
    }
}



function pararSetInterval() {
    console.log('Entrou no pararSetInterval');
    clearInterval(idRecarregarMsgsBatePapo);
    clearInterval(idAtivarConexao);
    
}
function ativarSetInterval() {
    console.log('Entrou no ativarSetInterval');
    idRecarregarMsgsBatePapo = setInterval(buscarDadosBatePapo, 3000); 
    idAtivarConexao = setInterval(salvarNovamenteUsuario, 5000);

}

function salvarNovamenteUsuario() {    
    const nome = {

        name: nomeUsuario
    }

    console.log('salvarNovamenteUsuario - nome', nome)
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nome);
    promessa.then(tratarSucessoConexao); //Agenda para tratar o sucesso
    promessa.catch(tratarErroConexao); // Agenda para tratar algum erro;  

}


function tratarSucessoConexao() {
    console.log('Ativando a conexão - o usuário foi inserido novamente no bate papo com sucesso!')

}
function tratarErroConexao(erro) {
    console.log('erro na conexão - inserção de dados Status do erro: ', erro.response.status);
    // if (erro.response.status === 400) {
    //     axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', { name: usuario })
    //     promessa.then(console.log('salvou de novo o mesmo usuário tirado forçadamente')); //Agenda para tratar o sucesso
    // }
}


let mensagemenviada;
function enviarMsg() {
    // console.log('entrei aqui');    
    mensagemenviada = document.querySelector('.rodape .texto').value;
    console.log('mensagemenviada', mensagemenviada);


    if (mensagemenviada !== '') {
        pararSetInterval(); // desativar o Interval enquanto a msg está sendo enviada
        
        const mensagem = {
            from: nomeUsuario,
            to: "Todos",
            text: mensagemenviada,
            type: "message"
        }
        document.querySelector('.rodape .texto').value = '';
        const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", mensagem);
        promessa.then(mensagemSucesso);
        promessa.catch(tratarErroEnvio); // Agenda para tratar algum erro;
    }



}


function mensagemSucesso() {
    // document.querySelector('.rodape .texto').value = '';
    // enviandoMsg = true;
    buscarDadosBatePapo();
    ativarSetInterval(); // ativa pq a msg já foi enviada
}

function tratarErroEnvio() {
    // enviandoMsg = false;
    window.location.reload();

}




