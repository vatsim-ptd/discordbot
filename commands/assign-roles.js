const {assignRoles} = require("../assign_roles.js");
const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('assign-roles')
        .setDescription('Assigns your VATSIM Rating Roles!'), async execute(interaction) {
        const roleStr = await assignRoles(interaction.member);
        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${interaction.member.displayName}`, iconURL: `${interaction.user.displayAvatarURL()}`
            })
            .setTitle('Your Roles have been assigned!')
            .setDescription(`${roleStr}`)
            .setColor('#2483c5')
            .setTimestamp()
        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        }).catch(error => (console.trace(`I failed at the edit reply stage`)))
    }
};