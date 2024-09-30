import {Client} from "discord.js";
import {assignRoles} from "../functions/assignRoles";
import {CronJob} from "cron";


export async function handleClientReady(client: Client) {
    console.log(`Logged in as ${client.user.tag}`);
    new CronJob('30 02 * * *', async () => {
        const guild = client.guilds.cache.get("901078003482783765");
        const members = await guild.members.fetch();
        members.forEach(member =>
            assignRoles(member)
        )
    }, null, true)
}