async function assignRoles(member) {
    const MANAGED_ROLES = ["Supervisor", "Administrator", "New Member", "PPL", "IR", "CMEL", "ATPL"];
    const discordCidResponse = await fetch(`https://apiv2-dev.vatsim.net/v2/members/discord/${member.user.id}`).catch(error => console.trace(error));
    if (discordCidResponse.status !== 200) {
        console.log(`The discordCidResponse could not be completed as dialed due to a status of ${discordCidResponse.status}`)
    }
    let discordCidBody = await discordCidResponse.json().catch(error => console.trace((error)));
    let cid = discordCidBody.user_id;
    if (discordCidBody.detail === 'Not Found') {
        return;
    }
    const ratingsResponse = await fetch(`https://api.vatsim.net/api/ratings/${cid}`).catch(error => console.trace(error));
    if (ratingsResponse.status !== 200) {
        console.log(`The ratingsResponse could not be completed as dialed due to a status of ${ratingsResponse.status}`)
    }
    const ratingsBody = await ratingsResponse.json().catch(error => console.trace((error)));
    let rating = ratingsBody.rating;
    let pilotrating = ratingsBody.pilotrating;
    let roles = [];

    if (rating === 11) {  //SUP
        roles.push("Supervisor");
    } else if (rating === 12) {  //ADM
        roles.push("Administrator");
    }
    if (pilotrating === 0) {
        roles.push("New Member");
    } else if (pilotrating === 1) {
        roles.push("PPL");
    } else if (pilotrating === 3) {
        roles.push("IR");
    } else if (pilotrating === 7) {
        roles.push("CMEL");
    } else if (pilotrating === 15) {
        roles.push("ATPL");
    }
    for (const role of MANAGED_ROLES) {
        const discordRole = member.guild.roles.cache.find(r => r.name === role);
        if (roles.includes(role)) {
            if (!member.roles.cache.some(r => r.name === role)) {
                member.roles.add(discordRole).catch(e => console.log(e));
            }
        } else {
            if (member.roles.cache.some(r => r.name === role)) {
                member.roles.remove(discordRole).catch(e => console.log(e));
            }
        }
    };
    return roles.join(", ");
}

module.exports = {
    assignRoles: assignRoles
}