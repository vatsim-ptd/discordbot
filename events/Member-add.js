const {assignRoles} = require("../assign_roles.js");
module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member) {
        await assignRoles(member);
    }
};