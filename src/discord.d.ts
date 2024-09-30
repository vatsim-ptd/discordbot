import {
    Collection,
    PermissionsBitField,
    PermissionsString,
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
} from 'discord.js';

declare module 'discord.js' {
    export interface Client {
        commands: Collection<unknown, Command>;
        eventReminders: Collection<unknown>;
    }

    export interface Command {
        permissions?: PermissionsBitField<PermissionsString>;
        data: SlashCommandBuilder<SlashCommandSubcommandBuilder>;
        cooldown?: number;
        execute(...args: any): any;
    }
}