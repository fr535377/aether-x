const { SlashCommandBuilder } = require("discord.js");
const { updateConfig } = require("../../backend/db/queries");
const { isValidHexColor, isValidURL } = require("../../backend/utils/validateInput");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Edit the verification embed")
    .addStringOption(opt =>
      opt.setName("field").setDescription("Embed field to update").setRequired(true)
        .addChoices(
          { name: "title", value: "embed_title" },
          { name: "description", value: "embed_desc" },
          { name: "footer", value: "embed_footer" },
          { name: "color", value: "embed_color" },
          { name: "image", value: "embed_image" },
          { name: "button1_label", value: "button1_label" },
          { name: "button1_url", value: "button1_url" },
          { name: "button2_label", value: "button2_label" },
          { name: "button2_url", value: "button2_url" }
        )
    )
    .addStringOption(opt =>
      opt.setName("value").setDescription("New value").setRequired(true)
    ),

  async execute(interaction) {
    const field = interaction.options.getString("field");
    const value = interaction.options.getString("value");

    // Validaciones
    if (field === "embed_color" && !isValidHexColor(value))
      return interaction.reply({ content: "Invalid color format. Use #RRGGBB.", ephemeral: true });

    if ((field.endsWith("_url") || field === "embed_image") && !isValidURL(value))
      return interaction.reply({ content: "Invalid URL format.", ephemeral: true });

    // Guardar configuración
    await updateConfig(interaction.guild.id, { [field]: value });
    await interaction.reply({ content: `Embed field \`${field}\` updated.`, ephemeral: true });
  }
};
