
module.exports = function (controller) {

  const { BotkitConversation } = require("botkit");
  const flow = new BotkitConversation("agendamento", controller);
  // const nlu = require('../scripts/nlu.js');

  flow.addAction("agendamento")

  flow.addMessage(JSON.stringify({
    "type": "message",
    "section": "Agendamento",
    "body": "Ok, vamos começar seu agendamento "
  }),
    "agendamento")

  flow.addQuestion(JSON.stringify({
    "type": "question",
    "section": "Agendamento",
    "body": "Que tipo de agendamento quer fazer hoje?"
    //verificar as especialidades disponiveis na unidade 
  }),
    async (response, flow, bot) => {
      if(response == "pediatra"){
        bot.say("ok, vamos iniciar o agendamento para Pediatria" )
        //acessar o banco de dados e fazer a integração com os horarios disponiveis
      }
     },
    "agendamentoTipo",
    "agendamento")


  flow.after(async (response, bot) => {
    await bot.cancelAllDialogs();
  });
  controller.addDialog(flow);
};