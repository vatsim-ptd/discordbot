
import { Events } from 'discord.js';
import Config from "./classes/Config";
import {ExtendedClient} from "./classes/ExtendedClient";
import {handleClientReady} from "./handlers/clientReady";
import {handleGuildMemberAdd} from "./handlers/guildMemberAdd";
import handleInteractionCreate from "./handlers/interactionCreate";
const config = Config;
const client: ExtendedClient = new ExtendedClient();
//Discord JS initializers
// this is to verify the env is set correctly on startup
config.env();
client.setMaxListeners(1);
client.on(Events.ClientReady, handleClientReady);
client.on(Events.GuildMemberAdd, handleGuildMemberAdd)
client.on(Events.InteractionCreate, handleInteractionCreate);

client.start().then(() => console.log('Bot Functions Initialized'));
