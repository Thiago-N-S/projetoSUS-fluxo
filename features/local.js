module.exports = function (controller){

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("local", controller);

        flow.addAction("local")
        
        flow.addQuestion(JSON.stringify({
            "type":"question",
            "section":"local",
            "body":"Me informe o que você esta sentido "
        }),
        async(response, flow, bot)=>{
            if(response == "queda"){
                bot.say("certo, recomendamos que procure a UPA")
            }if(response == "dor"){
                bot.say("ok, recomendo que va a uma UbS")
                bot.say("podemos agendar a sua consulta se assim quiser")
                
                flow.addQuestion(JSON.stringify({
                    "type":"question",
                    "section":"local",
                    "body":"quer fazer uma agendamento ?"
                }),
            async(response, flow, bot)=>{
                if(response == "sim"){
                    bot.say("ok, vamos iniciar seu atendimento")
                    await bot.cancelAllDialogs();
                    await bot.beginDialog("agendamento")
                }if(response == "não"){
                    bot.say("entendido, vamos encerrar a conversa")
                    bot.say("não hesite em me procurar se precisar")
                }
            },"res_agendamento", "local")
            }
        },"resp_local", "local")



        flow.after(async (response, bot) => {
            await bot.cancelAllDialogs();
          });
          controller.addDialog(flow);


};