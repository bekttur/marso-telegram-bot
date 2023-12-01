const { Telegraf } = require("telegraf");
const TOKEN = "6418207132:AAGXIk34bTGyoBzif6FGYgusAR7TZGr6gxc";
const bot = new Telegraf(TOKEN);


console.log("start");
bot.start((ctx) => {

  // console.log(ctx.from.id);

  ctx.reply(`Добро пожаловать, ${ctx.from.first_name}. В этот чат отправляются заказы от пользователей marso.kz.
  
  Нажмите на кнопку ниже, чтобы открыть сайт!`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🗂️ Открыть", web_app: { url: "https://marso.kz/" } }],
      ]
    }}
  );
});


bot.launch();