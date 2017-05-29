const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'MzE4MTM1NTUyMTQ0NTcyNDE4.DA2-9w.EKYEOJ9EfGyBC35l1rPCEh_nMeM'

client.on('ready', () => {
  console.log('I am ready!');
});

looking_for_games = [];

client.on('message', message => {
  if (message.content === '!lfg' && message.channel.name === 'ladder') {
    console.log('received lfg message')
    if (looking_for_games.length >= 1) {
      var chosen = looking_for_games.splice(0, 1);
      message.channel.send(message.member + ', ' + chosen + ' : You have been matched!');
    } else {
      looking_for_games.push(message.member) 
      message.channel.send(message.member + ': You have been added to the matchmaking queue.')
    }
  }

  if (message.content === '!joinladder' || message.content === ':ladder:') {
    if (message.channel.name === 'race_signups') {
      role = message.guild.roles.find('name', 'FBW Ladder')
      message.member.addRole(role)
      message.member.send('You have been added to the #ladder channel. Please read the rules and refer to the "about" page on http://fbwladder.com for more information.')
    }
  }

  if (message.channel.name === 'race_signups') {
    console.log('received race msg')
    if (message.content === '!race terran' ) {
      role = message.guild.roles.find('name', 'Terran Main')
      message.member.addRole(role)
    } else if (message.content === '!race zerg') {
      role = message.guild.roles.find('name', 'Zerg Main')
      message.member.addRole(role)
    } else if (message.content === '!race protoss') {
      role = message.guild.roles.find('name', 'Protoss Main')
      message.member.addRole(role)
    }
  }
  
  if (message.channel.name === 'race_signups' && message.content === '!help') {
    message.member.send('Here are the following commands: \n !race zerg \n !race terran \n !race protoss \n !joinladder')
    message.member.send('Thanks, and good luck!')
  }
});

client.login(token);
