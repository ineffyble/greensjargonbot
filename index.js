import 'dotenv/config'
import { Client, Intents } from 'discord.js';
import { getExplanationsForTerm } from './explanations.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;


  if (interaction.commandName === 'explain') {
    const thing = interaction.options.getString('thing');
    const explanations = await getExplanationsForTerm(thing);
    if (explanations) {
        await interaction.reply(`${explanations.matched}: ${explanations.values.join(`\n${explanations.matched}: `)}`);
    } else {
        await interaction.reply(`No explanations for ${thing} found 😢. Someone should add one here: https://docs.google.com/spreadsheets/d/1_xrf21XrTbxfr2PPFmZm9VKtVAnw4fMaf86pn2cK8DM/edit`);
    }
  }
});

client.login(process.env.BOT_TOKEN);