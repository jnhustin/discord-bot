const { MessageEmbed } = require('discord.js');
import path from 'path'
const { addReaction } = require('../../utilityFunctions');


const USAGE = "`senpai poll <TRAILER_LINK> <EMOJI>=<NAME_OF_OPTION>, <EMOJI>=<NAME_OF_OPTION>, ...`\
    \n\nexample: senpai `https://www.youtube.com/watch?v=dQw4w9WgXcQ` :soccer: =she's the man,  \
    :alien:= Independence day, :star:=star wars: a new hope";

// module.exports = {
export default {
  name        :  'movie-poll',
  aliases     :  ['movie-vote', 'vote-movie', 'moviepoll','movie', 'mp'],
  category    :  'info',
  description :  'helpful tool to assist with making movie polls',
  usage       :  USAGE,
  run         :  async (client, message, args) => {

    if (args.length <= 3) {
      message.channel.send("I didn't understand your request\nRun `senpai help movie-poll` to learn more about this command\n\n" + USAGE);
      return;
    }

    if (message.deletable) { message.delete(); }

    // build message contents
    const trailersLink      =  args.shift();
    const stringedArguments =  stringifyArguments(args)
    const movieChoices      =  createChoiceList(stringedArguments);
    const description       =  buildDescription(trailersLink, movieChoices);

    // message
    const embed = new MessageEmbed()
      .setTitle('Movie Voting')
      .setColor('#ffffff')
      .setDescription(description)

    // add emoji reactions
    const response    =  await message.channel.send(embed);
    const reactEmojis =  movieChoices.map( (choice) => choice[0]);
    reactEmojis.forEach( (emoji) => addReaction(response, emoji) );
  }
}


/* ====== HELPERS ====== */
export const stringifyArguments = (args) => args.join(' ');


export const createChoiceList = (str) => str.split(',').map(formatChoice);

/* expects a string of comma-dilineated movie options in the form :emoji: = movie_title
  input  :  ':emoji:=movie-title', [':emoji2:', 'movie-title2']
  return :  List - [[':emoji:', 'movie-title'], [':emoji2:', 'movie-title2']]
*/

export const formatChoice = (choice) => choice.split('=').map(str => str.trim());
/* takes a paired movie choice str and returns a paired list
  input  :  ':emoji:=movie-title'
  return :  [':emoji:', 'movie-title']
*/

export const buildDescription = (trailers, choices) => {
  /* adds trailers and the voting options to the embed description field */

  let description = `Trailers: [Youtube Link](${trailers})\n`;

  choices.forEach(choice => {
    description += `${choice.join(' - ')}\n`
  });

  return description;
};
