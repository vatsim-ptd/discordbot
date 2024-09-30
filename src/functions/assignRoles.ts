const pLimit = require('p-limit');

const limit = pLimit(10);

export async function assignRoles(member) {
    const MANAGED_ROLES = ["Supervisor", "Administrator", "New Member", "PPL", "IR", "CMEL", "ATPL", "Flight Instructor", "Flight Examiner", "No Military Rating", "M1", "M2","M3","M4"];
    const discordCidResponse = await fetch(`https://api.vatsim.net/v2/members/discord/${member.user.id}`, {
        headers : {
            "User-Agent" : 'PTDDiscordBot'
        }
    }).catch(error => console.trace(error));
    if (!discordCidResponse || discordCidResponse.status !== 200) {
        console.log(`The discordCidResponse could not be completed as dialed for ${member.displayName}`)
        return
    }
    let discordCidBody = await discordCidResponse.json().catch(error => console.trace(error));
    let cid = discordCidBody?.user_id;
    if (cid === undefined) {
        return
    }
    if (discordCidBody.detail) {
        return;
    }
    const ratingsResponse = await fetch(`https://api.vatsim.net/v2/members/${cid}`, {
        headers : {
            "User-Agent" : 'PTDDiscordBot'
        }}).catch(error => console.trace(error));
    //@ts-ignore
    if (ratingsResponse.status !== 200) {
        //@ts-ignore
        console.log(`The ratingsResponse could not be completed as dialed due to a status of ${ratingsResponse.status}`)
    }
    //@ts-ignore
    const ratingsBody = await ratingsResponse.json().catch(error => console.trace((error)));
    if (ratingsBody === undefined) {
        return
    }
    let rating = ratingsBody.rating;
    let pilotrating = ratingsBody.pilotrating;
    let milrating = ratingsBody.militaryrating
    let roles = [];

    if (rating === 11) {  //SUP
        roles.push("Supervisor");
    }
    if (rating === 12) {  //ADM
        roles.push("Administrator");
    }

    switch (pilotrating){
        case 0 :
            roles.push("New Member");
            break
        case 1:
            roles.push("PPL");
            break;
        case 3:
            roles.push("IR");
            break;
        case 7:
            roles.push("CMEL");
            break;
        case 15:
            roles.push("ATPL");
            break;
        case 31:
            roles.push("Flight Instructor");
            break;
        case 63:
            roles.push("Flight Examiner");
            break;
    }

    switch (milrating){
        case 0:
            roles.push("No Military Rating")
            break;
        case 1:
            roles.push("M1")
            break;
        case 3:
            roles.push("M2")
            break;
        case 7:
            roles.push("M3")
            break;
        case 15:
            roles.push("M4")
            break;
    }
    for (const role of MANAGED_ROLES) {
        const discordRole = member.guild.roles.cache.find(r => r.name === role);
        if (roles.includes(role)) {
            if (!member.roles.cache.some(r => r.name === role)) {
                member.roles.add(discordRole).catch(e => console.log(e));
            }
        } else {
            if (member.roles.cache.some(r => r.name !== role)) {
                member.roles.remove(discordRole).catch(e => console.log(e));
            }
        }
    }
    return roles.join(", ");
}

module.exports = {
    assignRoles: (member) => limit(() => assignRoles(member))
}
