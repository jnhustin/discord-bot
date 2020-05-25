module.exports = {
  name        :  'ping',
  category    :  'info',
  description :  'returns latency and API ping',
  run         :  async (client, message, args) => {
    const msg         =  await message.channel.send('pinging...');
    const pongLatency =  `Latency is ${Math.floor(msg.createdAt - message.createdAt)}`;
    const apiLatency  =  `API Latency ${Math.round(client.ping)}ms`;
    msg.edit(`Pong\n${pongLatency}\n${apiLatency}`);
  }
};

