import { ApplicationCommandData, ChatInputCommandInteraction } from "discord.js";

const data : ApplicationCommandData = {
    name : "ping",
    description : "Replies with Pong!"
};

const func = async function(interaction : ChatInputCommandInteraction) {
    await interaction.reply('Pong!');
};

module.exports = { data, func };