
let nomeUsuario = prompt("Qual é o seu nome?");

if (nomeUsuario !== null) {
     inserirDadosBatePapo(nomeUsuario);
     
}


// buscarDadosBatePapo();

function buscarDadosBatePapo() {
   console.log('entrou no buscar dados bate papo')
    const promessa = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");    
    promessa.then(renderizarBatePapo); //Agenda para tratar o sucesso, ou seja, trazer os dados
    promessa.catch(buscaDadosErro); // Agenda para tratar algum erro;

    
}

function buscaDadosErro() {
  console.log('deu ruim na busca dos dados')
}

 

  

//
  let responsavel, destindestinatario, texto, tempo, tipo;  
  innerHTML = '';  
  
  function renderizarBatePapo(resposta) {     
        const objetoDadosUol = resposta.data;
        // console.log('objetoDadosUol',objetoDadosUol);
            

        for(let i = 0; i < objetoDadosUol.length; i++){                
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
                    msgReservada();
                break;
                case 'message':
                    msgnormal();
                break;                 
       
          }

    }

    rolagemAutomatica();

  } 

  const lista = document.querySelector('.listaPapos')
//   console.log('lista', lista);

  function msgStatus(){        
        lista.innerHTML += `
                           <li class="msg-status">
                                (${tempo})&nbsp<span>${responsavel}</span>&nbsp${texto}                                                                     
                           </li>   
                           `;       

  } 

  function msgReservada(){
        //   console.log(tipo) //reservadamente
          
        //   console.log('nomeUsuario', nomeUsuario);
        //   console.log('destinatario', destinatario);
          if(nomeUsuario !== destinatario ) {
            lista.classList.add('.esconder');
          }

           lista.innerHTML += `
           <li class="msg-reservada">
               (${tempo})&nbsp<span>${responsavel}</span>&nbspreservadamente para&nbsp<span>${destinatario}</span>:&nbsp${texto}                                                                     
           </li>   
           `;  
  } 
   
  function msgnormal(){

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



function inserirDadosBatePapo(usuario){
  

    
    // try {
      const nome = {
         name: usuario
        }
      
      console.log('nome', nome)  
      // const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants",nome);    
      const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ', {name: usuario})
      console.log('promessa', promessa)  
      promessa.then(buscarDadosBatePapo); //Agenda para tratar o sucesso, ou seja, trazer os dados
      promessa.then(setInterval(buscarDadosBatePapo, 3000));
      // promessa.then(setInterval(ativarConexao, 5000));
      promessa.catch(tratarErro); // Agenda para tratar algum erro;
    // } catch (error) {
    //   console.log('erro no catch',error)
    //   // tratarErro(error);
    // }
      

  }

  function tratarErro(erro) {
      console.log('erro na inserção de dados', erro.response.status)
      window.location.reload();
      if (erro.response.status === 400) {
        nomeUsuario = prompt("Já existe um usuário com este nome! Por genteleza, informar um novo nome:");
        if (nomeUsuario !== null) {
          console.log('nomeUsuario', nomeUsuario)  
          inserirDadosBatePapo(nomeUsuario);
        }
      }      
  }




  
  function ativarConexao() {
      const nome = {
       
         name: nomeUsuario
      }
     const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/status",nome);  
   
   
  }

  let mensagemenviada;
  function enviarMsg() {
    console.log('entrei aqui');
     mensagemenviada = document.querySelector('.rodape .texto').value;
     console.log('mensagemenviada', mensagemenviada);
    
    const mensagem = {
        from: nomeUsuario,
        to: "Todos",
        text: mensagemenviada,
        type: "message" 
    }
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",mensagem);
    promessa.then(mensagemSucesso);
    promessa.catch(tratarErroEnvio); // Agenda para tratar algum erro;
    mensagemenviada = '';
  }

  /*parei aqui */
  function mensagemSucesso() {
    /*obter novamente as mensagens do servidor e atualizar o chat*/

    console.log('Sua msg foi enviada!')
    // mensagemenviada = document.querySelector('.rodape .texto').value;
    // console.log('mensagemenviada -depois que a msg deu certo', mensagemenviada)
    // mensagemenviada.value = "";
  }

  function tratarErroEnvio() {
    console.log('Sua msg deu erro!')    
    
    nomeUsuario = prompt("Qual é o seu nome?");

    if (nomeUsuario !== null) {
      inserirDadosBatePapo(nomeUsuario);    
    
    }

    /*página atualizada e pedir nome do usuário
        Dica: experimente usar window.location.reload()
    */
 }


// function tratarErro(erro) {
//       console.log("Status code: " + erro.response.status); // Ex: 404
// 	  console.log("Mensagem de erro: " + erro.response.data); // Ex: Not Found
// }

