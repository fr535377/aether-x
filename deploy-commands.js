
const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

console.log('DEBUG - Loaded TOKEN:', process.env.TOKEN);
console.log('DEBUG - Loaded CLIENT_ID:', process.env.CLIENT_ID);

const commands = [];

// Cargar todos los comandos desde /discord/commands
const commandFiles = fs.readdirSync('./discord/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./discord/commands/${file}`);

  if (Array.isArray(command.data)) {
    for (const sub of command.data) {
      commands.push(sub.toJSON());
    }
  } else if (command.data && typeof command.data.toJSON === 'function') {
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('🔄 Refreshing application (/) commands...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('✅ Successfully registered application commands.');
  } catch (error) {
    console.error('❌ Error registering commands:', error);
  }
})();
