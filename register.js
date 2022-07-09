import 'dotenv/config'
import { REST } from '@discordjs/rest';
import { Routes, ApplicationCommandOptionType } from 'discord-api-types/v9'

const commands = [{
  name: 'explain',
  description: 'Explains an acronym/abbreviation',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: 'thing',
      description: 'The thing to explain',
      required: true,
    }
  ]
}]; 

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: [] },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
