import Config from "./classes/Config";
const config = Config;
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import { guildCommandsList, globalCommandsList } from './commands';

const guildCommands = [];
const globalCommands = [];

for (const command of guildCommandsList) {
    for (const cmds of command) {
        guildCommands.push(cmds.data);
    }
}

for (const command of globalCommandsList) {
    for (const cmds of command) {
        globalCommands.push(cmds.data);
    }
}

const rest = new REST({ version: '10' }).setToken(config.token());

rest
    .put(Routes.applicationCommands(config.clientId()), { body: globalCommands })
    .then(() => console.log('Successfully registered global commands.'))
    .catch(console.error);
rest
    .put(Routes.applicationGuildCommands(config.clientId(), config.guild()), {
        body: guildCommands,
    })
    .then(() => console.log('Successfully registered guild commands.'))
    .catch(console.error);
