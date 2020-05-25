const {readdirSync}  = require('fs');
const ascii = require('ascii-table')
const path = require('path');
const table = new ascii().setHeading('Command', 'Load status');

module.exports = (client) => {
  readdirSync(path.join(__dirname, '..', 'commands/')).forEach(dir => {
    const commands = readdirSync(path.join(__dirname, '..', `commands/${dir}/`)).filter( file => file.endsWith('.js'));

    for (let file of commands) {
      let command = require(path.join(__dirname, '..',`commands/${dir}/${file}`));
      if (command.name) {
        client.commands.set(command.name, command);
        table.addRow(file, '✅  Loaded');
      } else {
        table.addRow(file, '❌  -> missing something??');
      }

      if (command.aliases && Array.isArray(command.aliases)) {
        command.aliases.forEach(alias => client.aliases.set(alias, command.name))
      }
    }
  })

  console.log(table.toString());
}
