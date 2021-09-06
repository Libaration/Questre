import {
  bold,
  italic,
  strikethrough,
  underscore,
  spoiler,
  quote,
  blockQuote,
} from '@discordjs/builders';
export const interactionListener = async (interaction) => {
  if (!interaction.isCommand()) return; //if the interaction isn't a registered command do nothing
  const { commandName } = interaction; //ES6 Destructuring to "rename" interaction to commandName for cleaner code
  switch (commandName) {
    case 'play':
      try {
        const song = interaction.options.getString('song').toLowerCase();
        const titled = song
          .split(' ')
          .map((s) => {
            return s.charAt(0).toUpperCase() + s.slice(1);
          })
          .join(' ');
        interaction.reply(`Searching for ${italic(titled)}`);
      } catch {
        console.log('failed to reply to interaction');
      }
  }
};
