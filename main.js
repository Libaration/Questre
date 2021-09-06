import dotenv from 'dotenv';
import { Client, Intents } from 'discord.js';
import registerCommands from './commands/helpers/registerCommands';
import { interactionListener } from './commands/helpers/listeners';
dotenv.config();
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  //registerCommands(); //this only needs to be done once. Change to global commands once they are working
});

client.on('interactionCreate', async (interaction) => {
  interactionListener(interaction, client);
});

client.login(process.env.TOKEN);
