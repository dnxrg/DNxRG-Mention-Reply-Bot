# 🤖 **DNxRG Mention Reply Bot**  

A Discord bot that uses DNxRG AI to reply to messages when mentioned. This bot also includes a `/togglemention` command to enable or disable its response to mentions.  

---

## 🛠️ **Features**  
- Toggles bot responses to mentions using the `/togglemention` command.  
- Integrates seamlessly with DNxRG AI for intelligent replies.  
- Easy setup and customization.  

---

## 🚀 **Getting Started**  

### 1️⃣ Prerequisites  
Before you begin, ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (v16.9.0 or later required for Discord.js v14+)  
- [Git](https://git-scm.com/)  
- A Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)  
- [DNxRG AI API key](https://ai.dnxrg.com)  

---

### 2️⃣ Installation  

#### Clone the Repository  
```bash  
git clone https://github.com/dnxrg/DNxRG-Mention-Reply-Bot.git  
cd DNxRG-Mention-Reply-Bot  
```  

#### Install Dependencies  
```bash  
npm install  
```  

---

### 3️⃣ Configuration  

1. Rename the `config.example.json` file to `config.json`.  
2. Open `config.json` and add your credentials:  

```json  
{  
    "discordToken": "YOUR_DISCORD_BOT_TOKEN",  
    "clientId": "YOUR_DISCORD_CLIENT_ID",  
    "dnxrgApiKey": "YOUR_DNXRG_API_KEY",  
    "model": "gemini-pro",  
    "botState": "on",  
    "allowedChannels": ["YOUR_ALLOWED_CHANNEL_IDS"]  
}  
```  

---

### 4️⃣ Running the Bot  

#### Start the Bot  
```bash  
node index.js  
```  

🎉 Your bot is now live and ready to use!  

---

## 📋 **Usage**  

### Command: `/togglemention`  
- Toggles the bot's ability to respond to mentions.  
- Responds with:  
  - "Bot is now active and will respond to mentions."  
  - "Bot is now inactive and will not respond to mentions."  

### Mention the Bot  
- Simply mention the bot with your question, and it will reply using DNxRG AI!  

Example:  
```  
@DNxRG Bot What’s the weather like today?  
```  
Bot Reply:  
```  
I’m not a weather expert, but I can still help you with something else! ☀️  
```  

---

## 📄 **License**  
This project is licensed under the [MIT License](LICENSE).  

---

## 💬 **Questions?**  
Feel free to open an issue or reach out to [DNxRG Discord Server ](https://discord.gg/dnxrg-hosting-service-884328091692986408) for support.  

--- 

## ✨ **Show Your Support**  
Give this project a ⭐️ if you found it helpful!  

--- 
