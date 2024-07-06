module.exports = function (controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("cadastro", controller);
    // const nlu = require('../scripts/nlu.js');
  
    flow.addAction("cadastro")  
    
    flow.addMessage(JSON.stringify({
        "type":"message",
        "section":"cadastro",
        "body":"informações para o cadastro" //esperar conversa com o pessoal da upa 
    }))
    
    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
      });
      controller.addDialog(flow);
};