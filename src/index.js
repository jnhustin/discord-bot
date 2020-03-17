// packages
import '@babel/polyfill'
import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import Discord  from 'discord.js'
import {
  config,
  users
} from './config.js'


const print =  console.log;
const app   =  express();
const bot   =  new Discord.Client();

// settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// app
bot.login(process.env.DISCORD_TOKEN);

/* bot logs in and grabs & sets up it's listners
  uses the message handler
  listens for specific triggers and has a generic response
*/
bot.on('ready', async() => {
  console.info(`Logged in as ${bot.user.tag}!`);
})


bot.on('message', msg => {
  if(msg.author.bot) return;

  if (msg.content.toLowerCase().includes('feefi')) {
    msg.channel.send('quit it');
  }

  config.interactions.forEach( interaction => {
    if (msg.content.toLowerCase().includes(interaction.trigger)) {
      msg.channel.send(interaction.response);
    }
  });
});



app.get('/', (req, res) => {
  // print('hello from /');
  res.send("hmm hello, I'm awake!");
});

app.get('/api/lifecheck', (req, res) => {
  print('hello from /');
  print('test_value: ', process.env.TEST_VALUE)
  res.send('new response');
});

// listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  print(`listening on port ${PORT}`);
});
