import inquirer from 'inquirer';
import chalk from 'chalk';

import questions from './questions.js';

async function runThaiOnboard() {
  console.log(chalk.cyan('🌫️ ตั้งค่าน้องกุ้ง - ผู้ช่วย AI ภาษาไทย\n'));
  
  const answers = await inquirer.prompt(questions);
  
  // Transform answers to config
  const config = {
    personality: answers.personality,
    channel: answers.channel,
    model: answers.model,
    thinking: answers.thinking,
    workspace: answers.workspace || `~/.openclaw/workspace-${answers.personality}`,
    apiKey: answers.apiKey
  };
  
  // Channel-specific config
  if (answers.channel === 'line') {
    config.lineConfig = {
      channelAccessToken: answers.lineChannelToken,
      channelSecret: answers.lineChannelSecret
    };
  }
  
  if (answers.channel === 'telegram') {
    config.telegramConfig = {
      token: answers.telegramToken
    };
  }
  
  return config;
}

export { runThaiOnboard };
