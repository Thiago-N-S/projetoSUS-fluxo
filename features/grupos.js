module.exports = function (controller){

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("grupo", controller);

        flow.addAction("grupo")

        flow.addMessage(JSON.stringify({
            "type":"message",
          "section": "grupo",
          "body": "esse são os grupos que estão sendo realizados nesse momento"
        }), "grupo")

    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
      });
      controller.addDialog(flow);
};
