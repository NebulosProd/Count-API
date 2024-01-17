const cors = require('cors');
const express = require('express');
const { Client } = require("discord.js");
const client = new Client({ intents: 123 });
const app = express();
const https = require('https');
const fs = require ('fs');
const enforceHttps = require('express-http-to-https').redirectToHTTPS;
const botToken = 'Your Token';
const server = https.createServer({
    cert: fs.readFileSync('fullchain.pem'),
    key: fs.readFileSync('privkey.pem')
  }, app);

server.listen(3000, () => {
    console.log(`Website is working securely on port 3000`);
  });

app.use(enforceHttps({
    statusCode: 301
  }));
app.use(cors());

client.login(botToken);

app.get('/counts', (req, res) => {
  const guildCount = client.guilds.cache.size;
  const memberCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
  res.json({ guildCount, memberCount });
});

