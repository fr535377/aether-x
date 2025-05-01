const { getEmbed, getButtons } = require("../../backend/services/embedConfig");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (
      message.author.bot ||
      message.content.toLowerCase() !== "$verify" ||
      !message.guild
    ) return;

    try {
      await message.delete().catch(() => {});

      const embed = await getEmbed(message.guild.id);
      const buttons = await getButtons(message.guild.id);

      await message.channel.send({
        embeds: [embed],
        components: [{ type: 1, components: buttons }]
      });
    } catch (err) {
      console.error("Error handling $verify:", err);
    }
  }
};
