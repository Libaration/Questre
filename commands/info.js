import { SlashCommandBuilder } from '@discordjs/builders';
const info = new SlashCommandBuilder()
  .setName('info')
  .setDescription('Information about your bot');
export default info;
