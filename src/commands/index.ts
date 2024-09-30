
import { Collection, Command } from 'discord.js';
import ping from "./fun/ping";
import assignRole from "./member-management/assignRoles";
import getCid from "./member-management/getCid";
import memberRoles from "./member-management/memberRoles";

export const commands: { [s: string]: Command } = {
    ping,
    assignRole,
    getCid,
    memberRoles
};
const guildCommands: { [s: string]: Command } = {
    assignRole,
    getCid,
    memberRoles
};
const gloablCommands: { [s: string]: Command } = {
    ping
};
export const allCommands = new Collection(
    Object.keys(commands).map((key) => [commands[key].data.name, commands[key]]),
);
export const guildCommandsList = Object.keys(guildCommands).map((key) => [
    guildCommands[key],
]);
export const globalCommandsList = Object.keys(gloablCommands).map((key) => [
    gloablCommands[key],
]);
