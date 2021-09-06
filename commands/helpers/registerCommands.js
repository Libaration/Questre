import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import fs from 'fs';
const clientId = '884209973972848722';
const guildId = '883190924606332999';
const registerCommands = async () => {
  const commands = []; //init empty array
  const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith('.js')); // use FS to read every file ending in .js from commands folder. Returns an array
  for (const file of commandFiles) {
    const command = import(`../../commands/${file}`); //iterate through each file in commands ending in .js and import them
    const commandJSON = await command;
    commands.push(await commandJSON.default.toJSON()); // push file into commands array as JSON
  }
  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
  (async () => {
    try {
      console.log('Started refreshing application (/) commands.');
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      });
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  })();
};
export default registerCommands;
