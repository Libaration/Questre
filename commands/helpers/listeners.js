export const interactionListener = async (interaction) => {
  if (!interaction.isCommand()) return; //if the interaction isn't a registered command do nothing
  const { commandName } = interaction; //ES6 Destructuring to "rename" interaction to commandName for cleaner code
  switch (commandName) {
    case 'user':
      try {
        interaction.reply('pong');
        console.log(interaction.options.getUser('user'));
      } catch {
        console.log('failed to reply to interaction');
      }
  }
};
