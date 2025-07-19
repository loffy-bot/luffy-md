const { command, isPrivate } = require("../../lib/");

bot(
  {
  pattern: "alive",
  fromMe: isPrivate,
  desc: "Does bot work?",
  type: "user",
},
  async (message, match, client) => {
	await sendAlive(client, message, match);
});
