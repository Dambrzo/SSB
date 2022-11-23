import { Client, Routes } from "discord.js";
import { REST } from '@discordjs/rest';
import { queryGameServerInfo, queryGameServerPlayer } from 'steam-server-query';
import scanCommand from './commands/scan.js';
import helpCommand from './commands/help.js';

let smallsServerList = [
  '85.190.156.5:27015', // PLACE HOLDER
  '85.190.156.5:27015', // small tribes server 1
  '85.190.156.5:27017', // small tribes server 2
  '85.190.156.5:27019', // small tribes server 3
  '85.190.148.211:27015', // small tribes server 4
  '85.190.148.211:27017', // small tribes server 5
  '85.190.148.211:27019', // small tribes server 6
  '85.190.156.33:27015', // small tribes server 7
  '85.190.156.33:27017', // small tribes server 8
  '85.190.156.33:27019', // small tribes server 9
  '5.101.166.54:27015', // small tribes server 10

]



async function getGameServerInfo(server) {
  let helperString = server.substring(1);
  let helperInput = smallsServerList[helperString];
  try {
  const queryGameServer = await queryGameServerInfo(helperInput);
  const queryPlayerServer = await queryGameServerPlayer(helperInput);
  let helperArray = new Array();
  let {name} = queryGameServer;
  let {players, playerCount} = queryPlayerServer;
  let returnValue = "Server name: " + name + "\nPlayer Amount: " + playerCount;
  for (let i = 0; i < playerCount; i++) {
    if (players[i].name == "") {
      helperArray.push("\nPlayer " + (i + 1) + ": EPIC PLAYER\tDuration on server: " + Math.round(players[i].duration / 60) + " minutes.");
    } else {
      helperArray.push("\nPlayer " + (i + 1) + ": " + players[i].name + "\tDuration on server: " + Math.round(players[i].duration / 60) + " minutes.");
    }
    returnValue += helperArray[i];
  }
  return returnValue;
} catch {
  console.log("getGameServerInfo function error.");
  return "Invalid request.";
}
}

const TOKEN = "";
const CLIENT_ID = "";
const GUILD_ID = "";
const rest = new REST({ version: '10'}).setToken(TOKEN);
const client = new Client({
  intents: [
    "Guilds",
    "GuildMessages",
    "MessageContent",
  ]
});
client.login(TOKEN);
client.on('ready', () => console.log(`${client.user.tag} online!`));


async function main() {
  const commands = [
    scanCommand,
    helpCommand,
  ];
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });
  } catch(err) {
    console.log(err);
  }
}

main();








client.on('interactionCreate', (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  if (interaction.commandName == 'scan') {
      try {
        const string = interaction.options.get('server_number').value;
        getGameServerInfo(string).then((reply) => {
        console.log("Scan command was sent.");
        console.log(string);
        interaction.reply({ content: reply });
        });
        } catch (err) {
          interaction.reply({ content: 'Invalid Command. Please try again.'})
          console.log("Scan command was sent incorrectly.");
        }
  }


  if (interaction.commandName == 'help') {
    console.log("Help command was sent.");
    let reply = "hello";
    interaction.reply({ content: reply })
  }
});
