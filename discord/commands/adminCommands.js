const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

module.exports = {
  data: [
    new SlashCommandBuilder()
      .setName("logs")
      .setDescription("Export log file with encrypted user actions."),

    new SlashCommandBuilder()
      .setName("panel")
      .setDescription("Generate a temporary link to the admin panel.")
  ],

  async execute(interaction) {
    const name = interaction.commandName;

    if (name === "logs") {
      const logPath = path.join(__dirname, "../../logs.log");

      if (!fs.existsSync(logPath)) {
        return interaction.reply({ content: "No logs available.", ephemeral: true });
      }

      await interaction.reply({
        content: "Here is your log file:",
        files: [logPath],
        ephemeral: true
      });
    }

    if (name === "panel") {
      const token = generateShortToken(); // Implementalo como gustes
      const link = `https://your-domain.com/panel?auth=${token}`;
      // Opcional: guardar token temporal en cache o archivo

      await interaction.reply({
        content: `Access your panel here (valid 5 min):\n${link}`,
        ephemeral: true
      });
    }
  }
};

function generateShortToken(length = 24) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}
