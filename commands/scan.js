import { SlashCommandBuilder } from '@discordjs/builders'

const scanCommand = new SlashCommandBuilder()
    .setName('scan')
    .setDescription('Scan a server to see how many players are currently on, including their play time.')
    .addStringOption(option =>
        option.setName('server_number')
            .setDescription('Enter the server number you want to scan')
            .setRequired(true));

export default scanCommand.toJSON();
