const { SlashCommandBuilder } = require("discord.js");
const { updateConfig } = require("../../backend/db/queries");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("conf")
    .setDescription("Set a verification config option.")
    .addStringOption(opt =>
      opt.setName("option").setDescription("Option name").setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("value").setDescription("Option value").setRequired(true)
    ),
  async execute(interaction) {
    const option = interaction.options.getString("option");
    let value = interaction.options.getString("value");

    const boolOptions = ["email", "phone", "saveip", "savephone", "flags", "blockflags", "vpnblock", "browserblock", "mailblock"];
    const intOptions = ["attempts", "blocktime"];

    const configKey = {
      email: "email_required",
      phone: "phone_required",
      saveip: "save_ip",
      savephone: "save_phone",
      flags: "flagslog",
      blockflags: "flagsblock",
      vpnblock: "vpnblock",
      browserblock: "browserblock",
      mailblock: "mailblock",
      attempts: "attempts",
      blocktime: "blocktime"
    }[option];

    if (!configKey) return interaction.reply({ content: "Invalid option.", ephemeral: true });

    if (boolOptions.includes(option)) value = value === "true" ? 1 : 0;
    if (intOptions.includes(option)) value = parseInt(value);

    await updateConfig(interaction.guild.id, { [configKey]: value });
    await interaction.reply({ content: `Config \`${option}\` updated.`, ephemeral: true });
  }
};
