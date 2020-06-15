import { MessageEmbed } from 'discord.js';

export const getMember = (message, toFind='') => {
  toFind = toFind.toLowerCase();
  let target = message.guild.members.cache.get(toFind);

  if (!target && message.mentions.members) {
    target = message.mentions.members.first();
  }

  if (!target && toFind) {
    target = message.guild.members.cache.find( (member) => {
      return member.displayName.toLowerCase().includes(toFind) ||
        member.user.tag.toLowerCase().includes(toFind)
    });
  }

  if (!target) {
    target = message.member;
  }

  return target;
};

export const formatDate  =  (date) => Intl.DateTimeFormat('en-US').format(date);

export const addReaction =  async (message, emoji) => {
  try {
    if (isCustomEmoji(emoji)) {
      emoji = getCustomEmojiId(emoji);
    }

    await message.react(emoji);
  }
  catch (err) {
    reportError(message, err);
    await message.react('709806168943624263');
    message.channel.send("What? I didn't understand your request. I reported this incident in the `error logs` channel")
  }
};

// used in rock paper scissors
export const promptUser  =  async function (message, responder, time, validReactions) {
  // We put in the time as seconds, with this it's being transfered to MS
  time_as_ms = time * 1000;

  // For every emoji in the function parameters, react in the good order.
  for (const reaction of validReactions) {
    await message.react(reaction);
  }

  // Only allow reactions from the responder,
  // and the emoji must be in the array we provided.
  const filter = (reaction, user) => {
    return validReactions.includes(reaction.emoji.name) && user.id === responder.id
  };

  // And ofcourse, await the reactions
  return message
    .awaitReactions(filter, { max: 1, time: time_as_ms})
    .then(collected => collected.first() && collected.first().emoji.name);
};


export const reportError = async(message, error) => {
  const errorChannel =  'error-logs';
  const channel      =  message.guild.channels.cache.find( (channel) => channel.name === errorChannel);

  const embed = new MessageEmbed()
    .setColor('#fff')
    .setTimestamp()
    .setDescription(`
      > error message : ${error.message}
      > http status   : ${error.httpStatus}
      > error path    : ${error.path}`);

  channel.send(embed);
}

// const get_user_data = (msg) => {
//   const users     =  msg.channel.guild.members;
//   const user_data =  [];

//   for (let [k,v] of users.entries()) {
//     const user =  v.user;
//     user_data.push({
//       'user_id'       :  user.id,
//       'username'      :  user.username,
//       'discriminator' :  user.discriminator,
//     });
//   }
//   return user_data;
// }


export const isCustomEmoji = (emoji) => emoji.startsWith('<:');

export const getCustomEmojiId = (emoji) => {
  const start =  emoji.lastIndexOf(':') + 1;
  const end   =  emoji.indexOf('>');
  return emoji.substring(start, end);

}
