const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'MzE4MTM1NTUyMTQ0NTcyNDE4.DA2-9w.EKYEOJ9EfGyBC35l1rPCEh_nMeM'

client.on('ready', () => {
  console.log('I am ready!');
});

looking_for_games = [];

client.on('message', message => {
  if (message.content === '!lfg') {
    user = { user: message.author, rating: 1200 }
    if (looking_for_games.length >== 1) {
      lower_limit = user.rating - 200
      upper_limit = user.rating + 200
      for (let [index, player] of looking_for_games.entries()) {
        if (player.rating < upper_limit and player.rating > lower_limit) {
          // remove player from looking_for_games
          var chosen = looking_for_games.splice(index, 1)
          message.channel.send('${user.user}, ${chosen.user} : You have been matched!');
        }
      }
    } else {
      looking_for_games.push({ user: message.author, rating: 1200}) 
      message.channel.send('${user.user} - you have been added to the matchmaking queue.')
    }
  }
});
