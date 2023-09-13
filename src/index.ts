import auth from './auth/auth.json';

const express = require('express');
const app = express();

const cors = require('cors');

import { BaseInteraction, Events } from "discord.js";
const discordclient = require("./discordclient");

discordclient.client.on(Events.InteractionCreate, async function(interaction : BaseInteraction) {
	if (!interaction.isChatInputCommand()) return;

	const command = discordclient.commands.get(interaction.commandName);

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

//console.log(client);

var listener = app.listen(3000, function(){
    console.log('Listening on port ' + listener.address().port); //Listening on port 3000
});

app.use(cors({
    origin: '*'
}));
app.use(express.static('./'))