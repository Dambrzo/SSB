import { SlashCommandBuilder } from '@discordjs/builders'

const helpCommand = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Returns a list of commands and examples.')

export default helpCommand.toJSON();
