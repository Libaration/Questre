import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';
import registerCommands from './commands/helpers/registerCommands';
import { interactionListener } from './commands/helpers/listeners';
dotenv.config();
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //registerCommands(); //this only needs to be done once. Change to global commands once they are working
});

client.on('interactionCreate', async (interaction) => {
  interactionListener(interaction);
});

client.login(process.env.TOKEN);
