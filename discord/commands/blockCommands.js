const { SlashCommandBuilder } = require("discord.js");
const { addToBlacklist, removeFromBlacklist, getConfig } = require("../../backend/db/queries");

module.exports = {
  data: [
    new SlashCommandBuilder()
      .setName("block-add")
      .setDescription("Add user data to the blacklist")
      .addStringOption(opt =>
        opt.setName("type")
          .setDescription("Type of data")
          .setRequired(true)
          .addChoices(
            { name: "id", value: "user_id" },
            { name: "email", value: "email" },
            { name: "ip", value: "ip" },
            { name: "phone", value: "phone_number" }
          ))
      .addStringOption(opt =>
        opt.setName("value")
          .setDescription("Value to block")
          .setRequired(true)),

    new SlashCommandBuilder()
      .setName("block-remove")
      .setDescription("Remove a user from the blacklist")
      .addStringOption(opt =>
        opt.setName("user_id")
          .setDescription("User ID")
          .setRequired(true)),

    new SlashCommandBuilder()
      .setName("block-ban")
      .setDescription("Ban a user and block all their data")
      .addStringOption(opt =>
        opt.setName("user_id")
          .setDescription("User ID")
          .setRequired(true))
      .addStringOption(opt =>
        opt.setName("email")
          .setDescription("Email")
          .setRequired(true))
      .addStringOption(opt =>
        opt.setName("phone")
          .setDescription("Phone number")
          .setRequired(true))
      .addStringOption(opt =>
        opt.setName("ip")
          .setDescription("IP address")
          .setRequired(true)),

    new SlashCommandBuilder()
      .setName("block-unban")
      .setDescription("Unban a user and remove from blacklist")
      .addStringOption(opt =>
        opt.setName("user_id")
          .setDescription("User ID")
          .setRequired(true))
  ],

  async execute(interaction) {
    const name = interaction.commandName;

    if (name === "block-add") {
      const type = interaction.options.getString("type");
      const value = interaction.options.getString("value");

      const data = {
        user_id: type === "user_id" ? value : null,
        email: type === "email" ? value : null,
        phone_number: type === "phone_number" ? value : null,
        ip: type === "ip" ? value : null,
        server_id: interaction.guild.id
      };

      await addToBlacklist(data);
      return interaction.reply({ content: `Blocked ${type}: \`${value}\`.`, ephemeral: true });
    }

    if (name === "block-remove") {
      const userId = interaction.options.getString("user_id");
      await removeFromBlacklist(userId);
      return interaction.reply({ content: `Removed user ID \`${userId}\` from blacklist.`, ephemeral: true });
    }

    if (name === "block-ban") {
      const data = {
        user_id: interaction.options.getString("user_id"),
        email: interaction.options.getString("email"),
        phone_number: interaction.options.getString("phone"),
        ip: interaction.options.getString("ip"),
        server_id: interaction.guild.id
      };

      await addToBlacklist(data);
      return interaction.reply({ content: `User \`${data.user_id}\` banned and data blacklisted.`, ephemeral: true });
    }

    if (name === "block-unban") {
      const userId = interaction.options.getString("user_id");
      await removeFromBlacklist(userId);
      return interaction.reply({ content: `User \`${userId}\` unbanned and data cleared.`, ephemeral: true });
    }
  }
};
