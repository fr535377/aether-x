const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.commands = new Collection();

// 📁 Cargar todos los comandos desde /commands
const commandFiles = fs.readdirSync(path.join(__dirname, "commands"));
for (const file of commandFiles) {
  const commandPath = path.join(__dirname, "commands", file);
  const command = require(commandPath);

  if (Array.isArray(command.data)) {
    for (const sub of command.data) {
      client.commands.set(sub.name, command);
    }
  } else {
    client.commands.set(command.data.name, command);
  }
}

// 📁 Cargar eventos desde /events
const eventFiles = fs.readdirSync(path.join(__dirname, "events"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// 🤖 Login
client.login(process.env.TOKEN);
