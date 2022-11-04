module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member) {
    const members = member.user.id
        const response1 = await fetch(`https://apiv2-dev.vatsim.net/v2/members/discord/${member.user.id}`)
        let body1 = await response1.json()
        let cid = body1.user_id
        const response2 = await fetch(`https://api.vatsim.net/api/ratings/${cid}`)
        const body2 = await response2.json()
        let rating = body2.rating
        let pilotrating = body2.pilotrating
        let roles = []

        if (rating == "11") {  //SUP
            roles.push("Supervisor")
        }else if (rating == "12"){  //ADM
            roles.push("Administrator")
        }
        if (pilotrating == "0") {
            roles.push("New Member")
        }else if (pilotrating == "1") {
            roles.push("PPL")
        }else if (pilotrating == "3") {
            roles.push("IR")
        }else if (pilotrating == "7") {
            roles.push("CMEL")
        }else if (pilotrating == "15") {
            roles.push("ATPL")
        }
        let roleStr = "",
            excluded = ['VATSIM BoG','Leadership', 'Discord Manager', 'RW Licence Transfer Team', 'Support Ticket Members',
                'Pilot Feedback Team Lead', 'Pilot Training Manager'
                , 'Pilot Feedback Analyst','Pilot Feedback Team Member', 'POI Team Lead', 'Primary Operations Inspector', 'Europe POI (Excluding UK)','UK POI','North America POI','South America POI',
                'PTD Staff','Flight Examiner','Certification Standards','Training Standards','Development Group','Outreach Group','ATO CFI',
                'ATO Staff','Tech Team','VA Dept.','Marketing Dept.','Membership Dept.','Division Staff','Sub-Division Staff','ATO Members','VATSIM Member','Bots','Muted'
            ]
        member.roles.cache.forEach(role => {
            if (role.id !== member.guild.roles.everyone.id
                && excluded.indexOf(role.name) < 0
                && roles.indexOf(role.name) < 0)
                member.roles.remove(role).catch(e => console.error(e))
        })
        for (let i = 0; i < roles.length; i++) {
            const role = member.guild.roles.cache.find(role => role.name === roles[i])
            member.roles.add(role).catch(e => console.error(e))
            roleStr += `${role} `}
        console.log(`Done Assigning ${roleStr}`)
    },
};