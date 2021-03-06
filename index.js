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

  if (message.content === '!cancel' && message.channel.name === 'ladder') {
    current = looking_for_games.find( member => member.user.username === message.member.user.username)
    if (current) {
      looking_for_games.splice(looking_for_games.indexOf(current, 1))
      message.channel.send(message.member + ': you have been removed from the matchmaking queue.')
    }
  }

  if (message.content === '!joinladder' || message.content === ':ladder:') {
    if (message.channel.name === 'race_signups') {
      role = message.guild.roles.find('name', 'FBW Ladder')
      message.member.addRole(role)
      message.member.send('It\'s pretty simple. You can find a game by typing `!lfg` in the #ladder channel. When you are matched with somebody, you can play with them on any server or patch you agree to, and on any map in the iCCup map pool.')
      message.member.send('When you are finished, one person (most often the winner) should upload the replay at **http://fbwladder.com**. When they do, the other player **must** confirm the match on the website. Just go to the match and click the confirm link.')
      message.member.send('That\'s it! Rankings will automatically be updated. If you have a problem with a match (bad manner, uploaded a duplicate, potential cheating or other such issues) please report the match via the **Report** button on the match page on the website.')
      message.member.send('You have been added to the #ladder channel. Please read the rules and refer to the "about" page on http://fbwladder.com for more information. GL HF!')
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
