const axios = require("axios");
const { getConfig } = require("../db/queries");

async function checkSecurity(user, ip) {
  const issues = [];
  const config = await getConfig(user.server_id);

  // VPN detection
  if (config.vpnblock) {
    const data = await axios.get(`https://ipapi.co/${ip}/json/`);
    if (data.data.security?.vpn === true || data.data.proxy === true) {
      issues.push("VPN or proxy detected.");
    }
  }

  // Email domain check
  if (config.mailblock) {
    const tempDomains = ["tempmail.com", "mailinator.com", "10minutemail.com"];
    const domain = user.email.split("@")[1];
    if (tempDomains.includes(domain)) {
      issues.push("Email is not allowed.");
    }
  }

  // Phone check
  if (config.phoneblock) {
    const blocked = config.phoneblock.split(",");
    const code = user.phone_number?.slice(1, 3);
    if (blocked.includes(code)) {
      issues.push("Phone number is blocked.");
    }
  }

  // Flag blocking
  if (config.flagsblock && user.flags?.length > 0) {
    issues.push("Your account is not eligible.");
  }

  // Browser spoofing check
  if (config.browserblock && user.browser?.toLowerCase().includes("tor")) {
    issues.push("Unsupported browser detected.");
  }

  return issues;
}

module.exports = { checkSecurity };
