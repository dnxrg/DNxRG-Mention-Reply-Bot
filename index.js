import { Client, GatewayIntentBits, REST, Routes, ActivityType, PermissionsBitField } from 'discord.js';
import dnxrgai from 'dnxrgai';
import config from './config.json' assert { type: 'json' };

// Initialize DNxRGAI
const dnxrg = new dnxrgai(config.dnxrgApiKey);

// Initialize Discord Bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Current bot state
let isBotActive = config.botState === 'on';

// Set up REST API for Slash Commands
const rest = new REST({ version: '10' }).setToken(config.discordToken);

// Slash Commands
const commands = [
    {
        name: 'togglemention',
        description: 'Toggle the bot’s ability to respond to mentions',
    },
];

// Register Slash Commands
(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: commands }
        );
        console.log('Slash commands registered successfully.');
    } catch (error) {
        console.error('Error registering slash commands:', error);
    }
})();

// Bot Ready Event
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('with DNxRG AI', { type: ActivityType.Playing });
});

// Handle Slash Commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'togglemention') {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply('You do not have permission to use this command.');
        }

        // Toggle the bot state
        isBotActive = !isBotActive;

        if (isBotActive) {
            await interaction.reply('Bot is now active and will respond to mentions.');
        } else {
            await interaction.reply('Bot is now inactive and will not respond to mentions.');
        }
    }
});

// Handle Message Mentions
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const isAllowedChannel = config.allowedChannels.includes(message.channel.id);

    if (!isBotActive || !isAllowedChannel) return;

    if (message.mentions.has(client.user)) {
        const question = message.content.replace(`<@${client.user.id}>`, '').trim();

        if (!question) {
            return message.reply('Please provide a question after mentioning me!');
        }

        try {
            console.log('Sending question to DNxRGAI API:', question); // Log the question being sent
            const response = await dnxrg.question({
                model: config.model,
                content: question,
            });

            // Log the response from DNxRGAI
            console.log('Received response from DNxRGAI:', response);

            // Ensure response contains the reply and send it
            if (response && response.interaction && response.interaction.reply) {
                await message.reply(response.interaction.reply);
            } else {
                await message.reply('Sorry, I could not generate a response. Please try again.');
            }
        } catch (error) {
            console.error('Error processing question:', error);
            await message.reply('An error occurred while processing your question. Please try again.');
        }
    }
});

// Log in the bot
client.login(config.discordToken);
