const { bot, isPrivate } = require("../lib");


bot(
  {
name: "jid",
fromMe: "info",
desc: "Gives the JID",
async mbb({ msg }) {
if(!msg.quoted){
return msg.reply(msg.from)
}else{return msg.reply(msg.quoted.sender)}
}):
