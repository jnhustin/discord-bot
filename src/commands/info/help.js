import  { MessageEmbed } from 'discord.js';


module.exports = {
  name        :  'help',
  aliases     :  ['h'],
  category    :  'info',
  description :  'returns all commands, or one specific command info',
  run         :  async (client, message, args) =>  {
    if (message.deletable) {
      message.delete();
    }
    return args[0] ? getCommand(client, message, args[0]) : getAll(client, message);
  },

};

const getCommand = (client, message, input) => {
  const embed = new MessageEmbed();
  const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
  if (!cmd) {
    embed
      .setColor('RED')
      .setDescription(`No info found for command **${input.toLowerCase()}**`)
    return message.channel.send(embed);
  }

  let info = ''
  if (cmd.name)         { info += `**Command name**: ${cmd.name}`; }
  if (cmd.aliases)      { info += `\n**Aliases**: ${cmd.aliases.map( (a) => a).join(', ') }`; }
  if (cmd.description)  { info += `\n**Description**: ${cmd.description}`; }
  if (cmd.usage)        {
    info += `\n**Usage**: ${cmd.usage}`;
    embed.setFooter('Syntax: <> = required, [] = optional')
  }

  return message.channel.send(embed.setColor('GREEN').setDescription(info));
}


const getAll = (client, message) => {
  let info = 'Run `senpai help [command name]` to learn more about one of the commands below.\n\n';

  const commandDescriptions = client.categories
    .map( (cat) => {
      let msg = ''
      msg += `**${cat[0].toUpperCase() + cat.slice(1)}**\n`;  // add category header
      msg += `${formatCommands(client.commands, cat)}\n`      // add category commands
      return msg;
    })
    .reduce( (info, sentence) => info + sentence, info);
  const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription(commandDescriptions);
  return message.channel.send(embed);
}


const formatCommands = (commands, category) => {
  return commands
    .filter( (cmd) => cmd.category.toLowerCase() === category.toLowerCase())
    .map(    (cmd) => `- **${cmd.name}**: ${cmd.description}`)
    .join('\n');
}

