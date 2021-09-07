import {
  bold,
  italic,
  strikethrough,
  underscore,
  spoiler,
  quote,
  blockQuote,
} from '@discordjs/builders';
import ytdl from 'ytdl-core';
import {
  AudioPlayerStatus,
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from '@discordjs/voice';
import { fetchSearchResults } from './api.js';
let player;
let connection;
export const interactionListener = async (interaction, client) => {
  if (!interaction.isCommand()) return; //if the interaction isn't a registered command do nothing
  const { commandName } = interaction; //ES6 Destructuring to grab commandName property from interaction
  if (commandName === 'play') {
    let user = await interaction.member.fetch();
    let channel = await user.voice.channel;
    if (!channel) {
      interaction.reply('you are not in a voice channel');
    } else {
      try {
        const song = interaction.options.getString('song').toLowerCase();
        const titled = song
          .split(' ')
          .map((s) => {
            return s.charAt(0).toUpperCase() + s.slice(1);
          })
          .join(' ');
        interaction.reply(`Searching for ${italic(titled)}`);
        connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
          selfDeafen: false,
        });
        const searchResults = await fetchSearchResults(song);
        const stream = ytdl(`${searchResults[0].id.videoId}`, {
          filter: 'audioonly',
        });
        const resource = createAudioResource(stream, {
          inputType: StreamType.Arbitrary,
        });
        player = createAudioPlayer();
        player.play(resource);
        connection.subscribe(player);
        player.on(AudioPlayerStatus.Playing, () =>
          interaction.channel.send(
            `Now Playing ${bold(searchResults[0].snippet.title)}`
          )
        );

        player.on('idle', () => connection.destroy());
      } catch (e) {
        console.log(e);
      }
    }
  } else if (commandName === 'stop') {
    if (!interaction.guild.me.voice.channel) {
      interaction.reply("I'm not in a voice channel");
    } else {
      player.stop();
      connection.destroy();
      interaction.reply('Questre has left the voice channel');
      interaction.guild.me.voice.disconnect();
    }
  }
};
