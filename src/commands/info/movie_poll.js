const { MessageEmbed } = require('discord.js');
import path from 'path'
const { addReaction } = require('../../utilityFunctions');


const USAGE = "`senpai poll <TRAILER_LINK> <EMOJI>=<NAME_OF_OPTION>, <EMOJI>=<NAME_OF_OPTION>, ...`\
    \n\nexample: senpai `https://www.youtube.com/watch?v=dQw4w9WgXcQ` :soccer: =she's the man,  \
    :alien:= Independence day, :star:=star wars: a new hope";

module.exports = {
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

    const trailersLink =  args.shift();
    const movieChoices =  getMovieChoices(args);
    const description  =  buildDescription(trailersLink, movieChoices);
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

const buildDescription = (trailers, choices) => {
  let description = '';
  description += `trailers: ${trailers}\n`

  choices.forEach(choice => {
    description += `${choice.join(' - ')}\n`
  });

  return description;
}


const getMovieChoices = (args) => args
  .join(' ')
  .split(',')
  .map(choice => choice.split('='))
  .map(choice => choice.map(str => str.trim()))
  .concat([['⚔', 'Something else']]);
