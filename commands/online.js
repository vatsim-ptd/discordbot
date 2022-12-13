const {SlashCommandBuilder} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-online-members')
        .setDescription('Gets the members who are online'),
    async execute(interaction) {
        const livemembersResponse = await fetch(`https://data.vatsim.net/v3/vatsim-data.json`);
        let liveMembers = await livemembersResponse.json()
        let tpcPilots = liveMembers.pilots
        // let callsignFiltered = tpcPilots.filter(tpcPilots => tpcPilots.callsign.indexOf("TPC") > -1)
        // //callsign's of members using TPC Callsign
        // for(let i = 0; i < callsignFiltered.length; i++) {
        //     let callsignObj = callsignFiltered[i];
        //
        //     console.log(callsignObj.callsign);}

        //getting remarks with TPC
        const remakrsFiltered = tpcPilots.filter(tpcPilots => tpcPilots.flight_plan?.remarks.toUpperCase().indexOf("THEPILOTCLUB") > -1 )
        //callsign's of members using TPC Callsign
        for(let i = 0; i < remakrsFiltered.length; i++) {
            let remarkObj = remakrsFiltered[i];

            console.log(remarkObj.callsign);
        }
        await interaction.reply({content: `Done`, ephemeral: true}).catch(error =>
            console.error`I failed at the edit reply stage`)
    }
};