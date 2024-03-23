const {assignRoles} = require("../assign_roles.js");
const {ActivityType} = require('discord.js');
const cron = require('node-cron')
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setActivity('The VATSIM Network', {type: ActivityType.Watching})
        cron.schedule('30 02 * * *', async () => {
            const guild = client.guilds.cache.get("901078003482783765");
            const members = await guild.members.fetch();
            members.forEach(member =>
                assignRoles(member)
            )
        })
    }
};
