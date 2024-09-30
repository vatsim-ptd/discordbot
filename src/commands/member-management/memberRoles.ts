import {Command, EmbedBuilder, PermissionsBitField, SlashCommandBuilder} from 'discord.js';
import {setTimeout as wait} from "node:timers/promises";
import {assignRoles} from "../../functions/assignRoles";

const memberRoles: Command = {
    data: new SlashCommandBuilder()
        .setName('member-roles')
        .setDescription('Assigns a members VATSIM Rating Roles!')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers)
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
            console.trace(error))
    },
};

export default memberRoles;