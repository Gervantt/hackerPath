const axios = require('axios');

// функция отправки
async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  try {
    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: text,
    });
  } catch (err) {
    console.log('Ошибка Telegram:', err?.response?.data || err);
  }
}
