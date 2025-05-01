const { SlashCommandBuilder } = require("discord.js");
const { getEmbed, getButtons } = require("../../backend/services/embedConfig");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Send the verification embed."),
  async execute(interaction) {
    const embed = await getEmbed(interaction.guild.id);
    const buttons = await getButtons(interaction.guild.id);

    await interaction.reply({
      embeds: [embed],
      components: [{ type: 1, components: buttons }],
      ephemeral: true
    });
  }
};
