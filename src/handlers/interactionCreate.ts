export default async function handleInteractionCreate(
    interaction: any,
): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        return await command.execute(interaction);
    } catch (error) {
        console.trace(error);
        return await interaction
            .reply({
                content:
                    'There was an error while executing this command! Our Dev Team has been notified and will try and fix the command as soon as possible.' +
                    'If you would like further assistance, please open a ticket on the VATSIM Support Portal. ',
                ephemeral: true,
            })
            .catch((err: any) => console.trace(err, 'Interaction Failure Message'));
    }
}