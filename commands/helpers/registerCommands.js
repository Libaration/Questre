import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
const clientId = '884209973972848722';
const guildId = '883190924606332999';

const registerCommands = () => {
  const commands = [
    new SlashCommandBuilder()
      .setName('play')
      .setDescription('Play a song!')
      .addStringOption((option) =>
        option
          .setName('song')
          .setDescription('Format: Song Title - Song Artist')
          .setRequired(true)
      ),
    new SlashCommandBuilder()
      .setName('info')
      .setDescription('Information about your bot'),
  ].map((command) => command.toJSON());
  //using SlashCommandBuilder to create a command
  //outputting each one by mapping then converting to JSON to send to discords rest api
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
