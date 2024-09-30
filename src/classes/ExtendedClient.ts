import {
    ActivityType,
    Client,
    GatewayIntentBits,
    Routes,
} from 'discord.js';

import {
    allCommands,
    globalCommandsList,
    guildCommandsList,
} from '../commands';
import { REST } from '@discordjs/rest';
import Config from "./Config";
// import { createClient, RedisClientType } from 'redis';

export class ExtendedClient extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildScheduledEvents,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.AutoModerationExecution,
            ],
            presence: {
                activities: [
                    {
                        type: ActivityType.Watching,
                        name: 'The VATSIM Network',
                    },
                ],
                status: 'online',
            },
        });
    }

    public async load() {
        this.commands = allCommands;

        if (Config.env() === 'prod') {
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

            const rest = new REST({ version: '10' }).setToken(Config.token());

            rest
                .put(Routes.applicationCommands(Config.clientId()), {
                    body: globalCommands,
                })
                .then(() => console.log('Successfully registered global commands.'))
                .catch(console.error);
            rest
                .put(
                    Routes.applicationGuildCommands(Config.clientId(), Config.guild()),
                    { body: guildCommands },
                )
                .then(() => console.log('Successfully registered global commands.'))
                .catch(console.error);
        }
    }

    public async start() {
        await this.load();
        await this.login(Config.token());
    }
}

//This is commented out in case we need to start using cache in the future

// export const redis = createClient({
//     socket : {
//         host: '127.0.0.1',
//         port: 6379
//     },
//     database: 0
// })
//
// redis.on('connect', redis => {
//     console.log(`Connected to Redis!`);
// })
// async function redisConnect(redis: any) {
//     await redis.connect()
// }
//
// redisConnect(redis)