import {Command, EmbedBuilder, PermissionsBitField, SlashCommandBuilder} from 'discord.js';

const getCid: Command = {
    data: new SlashCommandBuilder()
        .setName('get-cid')
        .setDescription('Gets the CID to a member in the server')
        .setDefaultMemberPermissions(PermissionsBitField.Flags.KickMembers)
        .addUserOption(option => option
            .setName('member-name')
            .setDescription("The User you would like to get the CID for.")
            .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('member-name')
        const member = interaction.guild.members.cache.get(user.id)
        const discordCidResponse = await fetch(`https://apiv2-dev.vatsim.net/v2/members/discord/${user.id}`);
        let discordCidBody = await discordCidResponse.json();
        let cid = discordCidBody.user_id;
        const embed = new EmbedBuilder()
            .setAuthor({
                name: `${member.displayName}`,
                iconURL: `${user.displayAvatarURL()}`
            })
            .setTitle(`${cid}`)
            .setColor('#2483c5')
            .setTimestamp()
        await interaction.reply({embeds: [embed], ephemeral: true}).catch(error =>
            console.trace(error))
    },
};

export default getCid;