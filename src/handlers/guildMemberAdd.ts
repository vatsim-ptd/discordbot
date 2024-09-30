import {GuildMember} from "discord.js";
import {assignRoles} from "../functions/assignRoles";


export async function handleGuildMemberAdd(member: GuildMember) {
    await assignRoles(member);
}