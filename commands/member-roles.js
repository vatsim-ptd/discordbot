const {assignRoles} = require("../assign_roles.js");
const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
    data: new SlashCommandBuilder()
        .setName('member-roles')
        .setDescription('Assigns a members VATSIM Rating Roles!')
        .addUserOption(option => option
            .setName('member-name')
            .setDescription("The User you would like to assign roles to.")
            .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('member-name')
        const member = interaction.guild.members.cache.get(user.id)
        interaction.deferReply()
        const roleStr = await assignRoles(member);
        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${member.displayName}`,
                iconURL: `${user.displayAvatarURL()}`
            })
            .setTitle('Your Roles have been assigned!')
            .setDescription(`${roleStr}`)
            .setColor('#2483c5')
            .setTimestamp()
        await wait(1000)
        await interaction.editReply({embeds: [embed]}).catch(error =>
            console.error`I failed at the edit reply stage`)
    }
};