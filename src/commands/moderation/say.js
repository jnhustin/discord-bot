module.exports = {
  name        :  'say',
  aliases     :  ['bc', 'broadcast'],
  category    :  'moderation',
  description :  'Says your input via the bot',
  usage       :  '<input>',
  run         :  async (client, message, args) => {
    // delete user supplied message
    if (message.deletable) {
      message.delete();
    }
    if (args.length === 0) {
      return message.reply('Nothing to say?').then( (msg) => msg.delete(5000))
    }

    //  bot will say this embeded message
    // discord.js.org/#/docs/main/stable/class/GuildMember, "me" being the current user
    if (args[0].toLowerCase() === 'embed') {
      const roleColor = message.guild.me.displayHexColor === '#000' ? '#fff' : message.guild.me.displayHexColor;
      const embed = new MessageEmbed()
      .setColor(roleColor)
      .setDescription(args.slice(1).join(' '))
      .setTimestamp()
      .setAuthor(`author: ${message.author.username}`, message.author.displayAvatarURL())
      .setFooter(client.user.username, client.user.displayAvatarURL());

      message.channel.send(embed);
    }
  }
}


