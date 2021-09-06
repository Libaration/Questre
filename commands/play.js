import { SlashCommandBuilder } from '@discordjs/builders';

export default new SlashCommandBuilder()
  .setName('play')
  .setDescription('Play a song!')
  .addStringOption((option) =>
    option
      .setName('song')
      .setDescription('Format: Song Title - Song Artist')
      .setRequired(true)
  );
