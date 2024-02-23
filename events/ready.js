const {assignRoles} = require("../assign_roles.js");
const { ActivityType } = require('discord.js');
module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}`);
        client.user.setActivity('The VATSIM Network', { type: ActivityType.Watching })
    setInterval(async function() {
        const guild = client.guilds.cache.get("901078003482783765");
        const members = await guild.members.fetch();
        members.forEach(member =>
           setInterval(function (){
               assignRoles(member)
           },500)
        )
        console.log("I have assigned everyone's roles");
    },2*12*60*60*1000)
    },
};
