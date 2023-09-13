const fs = require('node:fs');
const path = require('node:path');

import auth from './auth/auth.json';
import { ApplicationCommandData, BaseInteraction, Client, Collection, Events, GatewayIntentBits, REST, Routes } from "discord.js";

const commands : Collection<string, Function> = new Collection();

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const registerCommand = async function (data : ApplicationCommandData, func : Function) {
    if (!client.application) {
        console.log(`Command registration for "${data.name}" failed`);
        return;
    }
    try {
        await client.application.commands.create(data);
        commands.set(data.name, func);
        console.log(`Command registration for "${data.name}" succeeded`);
    } catch (error) {
        console.log(`Command registration for "${data.name}" failed`);
		console.error(error);
	}
}

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        // Grab all the command files from the commands directory you created earlier
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(function (file : string) {
            return file.endsWith('.js');
        });
        // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'func' in command) {
                registerCommand(command.data, command.func);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "func" property.`);
            }
        }
    }
});
client.login(auth['discord-token']);

client.on(Events.InteractionCreate, async function(interaction : BaseInteraction) {
	if (!interaction.isChatInputCommand()) return;

	const command = commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

module.exports = {client, commands};