const { getMember, formatDate } = require('../../utilityFunctions.js');
const { MessageEmbed } = require('discord.js');


module.exports = {
  name        :  'whois',
  aliases     :  ['userinfo', 'user', 'who'],
  category    :  'info',
  description :  'returns latency and API ping',
  run         :  async (client, message, args) => {
    const member =  getMember(message, args.join(' '));
    const user   =  member.user;
    // member vars
    const joined =  formatDate(member.joinedAt);
    const roles  =  member
      .roles
      .cache
      .filter (role => role.id !== message.guild.id)
      .map(role => role)
      .join(', ') || 'none';

    const created = formatDate(user.createdAt);
    const embed = new MessageEmbed()
      .setFooter(member.displayName, user.displayAvatarURL())
      .setThumbnail(user.displayAvatarURL())
      .setColor(member.displayHexColor == "#000" ? '#fff' : member.displayHexColor)
      .addField('Member information',
      ` > Display name: ${member.displayName}
        > Joined at: ${joined}
        > Roles: ${roles}`)
      .addField('User information', `
        > ID: ${user.id}
        > Username: ${user.username}
        > Discord Tag: ${member.user.tag}
        > Created at: ${created}`)
      .setTimestamp()

    const is_game = user.presence.game;
    if (is_game) {
      embed.addField('Currently playing', `**> Name ** ${is_game.name}`)
    }

    message.channel.send(embed);
  }
};

