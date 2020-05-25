const { MessageEmbed } = require('discord.js');

module.exports = {
  name        :  'report',
  category    :  'moderation',
  description :  'reports a member',
  usage: '<mention | id>',
  run         :  async (client, message, args) => {
    if (message.deletable) {
      message.delete();
    }
    let theAccused = message.mentions.users.first() || message.guild.members.get(args[0]);

    if (!theAccused) {
      return message.reply('Couldnt find that person').then(msg => msg.delete(5000));
    }
    if (theAccused.bot) {
      return message.reply("Can't report that member").then(msg => msg.delete(5000));
    }

    const channel      =  message.guild.channels.cache.find( (channel) => channel.name === 'bot-test');
    const reportReason =  args.slice(1).join(' ');

    if (!channel) {
      return message.channel.send('I could not find a \#reports\ channel').then(msg => msg.delete(5000));
    }

    const embed = new MessageEmbed ()
      .setColor('#fff')
      .setTimestamp()
      .setFooter(message.guild.name, message.guild.iconURL)
      .setAuthor('Reported member', theAccused.displayAvatarURL())
      .setDescription(`
        > Member: ${theAccused}
        > Reported by: ${message.member} ${message.member.id}
        > Reported in: ${message.channel}
        > Reason: ${reportReason}`);

    return channel.send(embed)
  }
}
