import * as command from './commands.js';
export const Commands = (message) => {
  switch (message.content) {
    case 'test':
      command.testCommand(message);
  }
};
