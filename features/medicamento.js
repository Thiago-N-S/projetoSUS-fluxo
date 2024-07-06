const agendamento = require("./agendamento");

module.exports = function (controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("medicamento", controller);
    // const nlu = require('../scripts/nlu.js');
  
    flow.addAction("medicamento")  
    
    flow.addMessage(JSON.stringify({
        "type":"message",
        "section":"medicamento",
        "body":"Eu sou uma inteligencia artificial, e não posso receitar porem podemos ajudar caso ja tenha passado por uma cosulta"
    }))

    flow.addQuestion(JSON.stringify({
        "type":"question",
        "section":"medicamento",
        "body":"Já passou pela avaliação médica ?"
    }),
      async(response, flow, bot) =>{
        if(response == "sim"){
            //ir para a url
            await bot.redirectToUrl("https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2016/lista-de-medicamento-sem-receita-esta-disponivel");
        }else if(response == "não"){
            bot.say("Para ter acesso a medicamentos é necessario passar por uma consulta, vamos iniciar a sua com o agendamento!")
            await bot.cancelAllDialogs();
            await bot.beginDialog("agendamento")
        }
      },"resp_medicamento", "medicamento"
    )

    
    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
      });
      controller.addDialog(flow);
};