
# Aether-X | Discord OAuth2 Verification Bot

**Aether-X** is a powerful and secure Discord bot for user verification via OAuth2.  
It supports email, phone, IP tracking, and blacklist management — all fully configurable via Discord.

---

## 🚀 Features

- ✅ Discord OAuth2 user verification
- ✅ Mandatory email & phone number check
- ✅ Real IP logging (no proxies/VPNs)
- ✅ Detect fake emails, phones, browsers (Tor)
- ✅ Discord flags logging
- ✅ Automatic + manual blacklist system
- ✅ 100% configurable via Discord Slash Commands
- ✅ Fully customizable verification embed
- ✅ Admin panel (React + Vite)
- ✅ Free hosting with Railway + Vercel
- ✅ Uses SQLite (no external DB needed)

---

## 📁 Project Structure

```
aether-x/
├── backend/        # Express API
├── discord/        # Discord bot
├── panel/          # React admin panel
├── .gitignore
├── package.json
```

---

## 🔧 Environment Variables

These are required in Railway or Vercel:

```env
TOKEN=your_discord_bot_token
CLIENT_ID=your_discord_client_id
REDIRECT_URI=https://your-project.up.railway.app/api/auth/redirect
```

> 🔐 Do **not** commit `.env` to GitHub. Use the Railway/Vercel interface to set them.

---

## ⚙️ Installation

### Backend + Bot (root)
```bash
npm install
npm start
```

> This starts both the Discord bot and the Express API.

### Panel (admin interface)
```bash
cd panel
npm install
npm run dev
```

> Accessible at: `http://localhost:5173` (for local testing)

---

## 🌐 Hosting

### ✅ Deploy Bot + API (Railway)

1. Push your code to GitHub
2. Go to [https://railway.app](https://railway.app)
3. Click **"New Project" → "Deploy from GitHub Repo"**
4. Set the environment variables (TOKEN, CLIENT_ID, REDIRECT_URI)
5. Railway will auto-start your bot and backend

### ✅ Deploy Panel (Vercel)

1. Deploy the `/panel` folder to [https://vercel.com](https://vercel.com)
2. Update `/panel/vite.config.js`:

```js
server: {
  proxy: {
    "/api": "https://your-railway-project.up.railway.app"
  }
}
```

---

## 💬 Slash Command Examples

- `/verify` – Sends verification embed
- `/conf option:email value:true` – Set email as required
- `/embed field:title value:Welcome to X` – Edit embed
- `/block-ban` – Ban and block a user’s ID, email, IP, phone
- `/block-unban` – Unban and remove from blacklist

---

## 🛡️ Security Highlights

- Detects and blocks:
  - VPNs, proxies
  - Tor browser users
  - Temp emails
  - Fake phone providers
- Discord account flags recorded
- Attempts + cooldown system (e.g. 3 tries/hour)
- Full data logging: user ID, email, phone, IP, flags

---

## 💡 Credits

Built with ❤️ by Aether-X Team  
Designed for high-level Discord communities who need real user verification.

---
