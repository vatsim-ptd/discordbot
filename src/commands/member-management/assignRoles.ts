import {Command, EmbedBuilder, SlashCommandBuilder} from 'discord.js';
import {assignRoles} from "../../functions/assignRoles";

const assignRole: Command = {
    data: new SlashCommandBuilder()
        .setName('assign-roles')
        .setDescription('Assigns your VATSIM Rating Roles!'),
    async execute(interaction) {
        const roleStr =  await assignRoles(interaction.member);
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
        }).catch((error: any) => (console.trace(`Error found during the reply section of the member driven assigning roles functions`, error)))
    },
};

export default assignRole;