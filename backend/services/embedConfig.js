const { getConfig } = require("../db/queries");
const defaultEmbed = require("../config.json").embed;

function parseColor(hex) {
  try {
    return parseInt(hex.replace("#", ""), 16);
  } catch (_) {
    return parseInt(defaultEmbed.color.replace("#", ""), 16);
  }
}

async function getEmbed(serverId) {
  const config = await getConfig(serverId);

  return {
    title: config.embed_title || defaultEmbed.title,
    description: config.embed_desc || defaultEmbed.description,
    color: parseColor(config.embed_color || defaultEmbed.color),
    footer: {
      text: config.embed_footer || defaultEmbed.footer
    },
    image: config.embed_image ? { url: config.embed_image } :
           defaultEmbed.image ? { url: defaultEmbed.image } : undefined
  };
}

async function getButtons(serverId) {
  const config = await getConfig(serverId);
  return [
    {
      type: 2,
      label: config.button1_label || defaultEmbed.button1_label,
      style: 5,
      url: config.button1_url || defaultEmbed.button1_url
    },
    {
      type: 2,
      label: config.button2_label || defaultEmbed.button2_label,
      style: 5,
      url: config.button2_url || defaultEmbed.button2_url
    }
  ];
}

module.exports = { getEmbed, getButtons };
