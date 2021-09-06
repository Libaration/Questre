import {
  bold,
  italic,
  strikethrough,
  underscore,
  spoiler,
  quote,
  blockQuote,
} from '@discordjs/builders';
const ytdl = require('ytdl-core');
const {
  AudioPlayerStatus,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} = require('@discordjs/voice');
export const interactionListener = async (interaction, client) => {
  if (!interaction.isCommand()) return; //if the interaction isn't a registered command do nothing
  const { commandName } = interaction; //ES6 Destructuring to grab commandName property from interaction
  switch (commandName) {
    case 'play':
      let user = await interaction.member.fetch();
      let channel = await user.voice.channel;
      if (!channel) {
        interaction.reply('you are not in a voice channel');
      } else {
        const song = interaction.options.getString('song').toLowerCase();
        const titled = song
          .split(' ')
          .map((s) => {
            return s.charAt(0).toUpperCase() + s.slice(1);
          })
          .join(' ');
        interaction.reply(`Searching for ${italic(titled)}`);
        joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
        });
      }
  }
};
