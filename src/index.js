// packages
import '@babel/polyfill'
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { Client, Collection } from 'discord.js'


import {
  visibleStatus,
  clientConfig,
  prefix,
} from './config.js'


const print  =  console.log;
const client =  new Client(clientConfig);


client.commands   =  new Collection();
client.aliases    =  new Collection();
client.categories =  fs.readdirSync(path.join(__dirname, 'commands/'));


['command'].forEach( (handler) => {
  require(path.join(__dirname, `handler/${handler}`))(client);
});


client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
  client.user.setPresence(visibleStatus);
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);  // cache-buster from: https://youtu.be/WwiNxva5RkM?list=PLdnyVeMcpY78Hz8fFD1vqhYliBmZKaa7N&t=482

  const args =  message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd  =  args.shift().toLowerCase();
  print('args:' , args)
  print('cmd :' , cmd)

  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
    command.run(client, message, args);
  }

  // config.interactions.forEach( interaction => {
  //   if (msg.content.toLowerCase().includes(interaction.trigger)) {
  //     msg.channel.send(interaction.response);
  //   }
  // });
});

client.login(process.env.DISCORD_TOKEN);




// import bodyParser from 'body-parser'
// import express from 'express'
// const app   =  express();
// // settings
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));


// app.get('/', (req, res) => {
//   // print('hello from /');
//   res.send("hmm hello, I'm awake!");
// });

// app.get('/api/lifecheck', (req, res) => {
//   print('hello from /');
//   print('test_value: ', process.env.TEST_VALUE)
//   res.send('new response');
// });

// // listener
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, function() {
//   print(`listening on port ${PORT}`);
// });
