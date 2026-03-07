import chalk from 'chalk';

const questions = [
  {
    type: 'input',
    name: 'personality',
    message: 'ตั้งชื่อผู้ช่วยของคุณ:',
    default: 'น้องกุ้ง',
    validate: (input) => input.length > 0 || 'กรุณาใส่ชื่อ'
  },
  {
    type: 'list',
    name: 'channel',
    message: 'เลือกแอพแชทหลัก:',
    choices: [
      { name: 'WhatsApp', value: 'whatsapp' },
      { name: 'Telegram', value: 'telegram' },
      { name: 'Discord', value: 'discord' }
    ]
  },
  {
    type: 'list',
    name: 'model',
    message: 'เลือก AI Model:',
    choices: [
      { name: 'Claude Sonnet - คุณภาพดี', value: 'openrouter/anthropic/claude-sonnet-4' },
      { name: 'GPT-4o - เร็ว', value: 'openai/gpt-4o' },
      { name: 'GPT-4o Mini - ประหยัด', value: 'openai/gpt-4o-mini' },
      { name: 'Step 3.5 Flash - ฟรี, ภาษาไทยดีเยี่ยม', value: 'openrouter/stepfun-ai/step-3.5-flash-lite:free' },
      { name: 'Gemma 3 27B - ฟรี, เก่งรอบด้าน', value: 'openrouter/google/gemma-3-27b-it:free' }
    ]
  },
  {
    type: 'list',
    name: 'thinking',
    message: 'ระดับการคิด (thinking):',
    choices: [
      { name: 'low - ตอบเร็ว', value: 'low' },
      { name: 'medium - สมดุล (แนะนำ)', value: 'medium' },
      { name: 'high - คิดลึก (ช้าแต่ดี)', value: 'high' }
    ],
    default: 'medium'
  },
  {
    type: 'input',
    name: 'apiKey',
    message: 'ใส่ API Key (Anthropic/OpenAI/OpenRouter):',
    validate: (input) => input.length > 0 || 'กรุณาใส่ API Key'
  },
  // WhatsApp-specific questions
  {
    type: 'confirm',
    name: 'whatsappQR',
    message: 'คุณจะต้องสแกน QR Code เพื่อเชื่อมต่อ WhatsApp ต่อไป ยืนยันหรือไม่?',
    when: (answers) => answers.channel === 'whatsapp',
    default: true
  },
  // Telegram-specific questions
  {
    type: 'input',
    name: 'telegramToken',
    message: 'Telegram Bot Token (จาก @BotFather):',
    when: (answers) => answers.channel === 'telegram',
    validate: (input) => input.length > 0 || 'กรุณาใส่ Bot Token'
  }
];

export default questions;
