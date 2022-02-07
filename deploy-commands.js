const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Risponde con Pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Risponde con le info del server!'),
	new SlashCommandBuilder().setName('user').setDescription('Risponde con le info del utente!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log("L'applicazione e registato con sucesso gli ShashCommand! ;D");
	} catch (error) {
		console.error(error);
	}
})();


//per registrare gli slach command crivi
//node deploy-commands.js


//nome file deploy-commands.js