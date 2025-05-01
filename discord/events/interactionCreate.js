module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      if (Array.isArray(command.data)) {
        await command.execute(interaction);
      } else {
        await command.execute(interaction);
      }
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "Something went wrong. Please retry.",
        ephemeral: true
      });
    }
  }
};
