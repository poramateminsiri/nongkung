import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

import { runThaiOnboard } from '../wizard/onboard.js';
import { checkOpenClawInstalled, installOpenClaw } from '../utils/installer.js';
import { copyThaiTemplates } from '../utils/templates.js';

async function start() {
  console.log(chalk.cyan('🦞 ยินดีต้อนรับสู่น้องกุ้ง (Nongkung)!\n'));
  
  // Step 1: Check/install OpenClaw
  const spinner1 = ora('กำลังตรวจสอบ OpenClaw...').start();
  
  if (!checkOpenClawInstalled()) {
    spinner1.text = 'กำลังติดตั้ง OpenClaw...';
    try {
      await installOpenClaw();
      spinner1.succeed('ติดตั้ง OpenClaw เสร็จแล้ว');
    } catch (error) {
      spinner1.fail('ติดตั้ง OpenClaw ไม่สำเร็จ');
      console.error(chalk.red(error.message));
      process.exit(1);
    }
  } else {
    spinner1.succeed('OpenClaw ติดตั้งแล้ว');
  }
  
  // Step 2: Thai Onboard
  console.log(chalk.yellow('\n📋 เริ่มต้นการตั้งค่าน้องกุ้ง...\n'));
  const config = await runThaiOnboard();
  
  // Step 3: Write config
  const spinner2 = ora('กำลังบันทึกการตั้งค่า...').start();
  try {
    await writeOpenClawConfig(config);
    spinner2.succeed('บันทึกการตั้งค่าเสร็จแล้ว');
  } catch (error) {
    spinner2.fail('บันทึกการตั้งค่าไม่สำเร็จ');
    console.error(chalk.red(error.message));
    process.exit(1);
  }
  
  // Step 4: Copy Thai templates
  const spinner3 = ora('กำลังติดตั้ง templates ภาษาไทย...').start();
  try {
    await copyThaiTemplates(config.workspace);
    spinner3.succeed('ติดตั้ง templates เสร็จแล้ว');
  } catch (error) {
    spinner3.fail('ติดตั้ง templates ไม่สำเร็จ');
    console.error(chalk.yellow('คำเตือน: ' + error.message));
  }
  
  // Step 5: Start gateway
  const spinner4 = ora('กำลังเริ่ม Gateway...').start();
  try {
    execSync('openclaw gateway start', { stdio: 'ignore' });
    spinner4.succeed('Gateway ทำงานแล้ว');
  } catch (error) {
    spinner4.warn('ไม่สามารถเริ่ม Gateway อัตโนมัติได้');
    console.log(chalk.yellow('💡 รันด้วยตนเอง: openclaw gateway start'));
  }
  
  // Success message
  console.log(chalk.green('\n✅ น้องกุ้งพร้อมใช้งานแล้ว!\n'));
  console.log(chalk.white('📱 เปิด Dashboard:'), chalk.cyan('http://localhost:18789/'));
  console.log(chalk.white('💬 ทดสอบแชท:'), chalk.cyan('ส่งข้อความไปยังช่องทางที่ตั้งค่าไว้\n'));
  console.log(chalk.gray('สำหรับคำสั่งเพิ่มเติม: nongkung --help\n'));
}

// Determine provider from model string
function getProviderFromModel(model) {
  if (model.startsWith('openrouter/')) return 'openrouter';
  if (model.startsWith('openai/')) return 'openai';
  if (model.includes('anthropic') || model.includes('claude')) return 'anthropic';
  return 'openrouter'; // default to openrouter for flexibility
}

export async function writeOpenClawConfig(config) {
  const configDir = path.join(os.homedir(), '.openclaw');
  const configPath = path.join(configDir, 'openclaw.json');

  await fs.ensureDir(configDir);

  // Determine provider and set up API keys
  const provider = getProviderFromModel(config.model);

  const openclawConfig = {
    agents: {
      defaults: {
        model: config.model,
        thinkingDefault: config.thinking || 'medium',
        language: 'th',
        personality: config.personality || 'น้องกุ้ง'
      },
      list: [{
        name: config.personality || 'น้องกุ้ง',
        workspace: config.workspace,
        model: config.model
      }]
    },
    channels: {
      entries: {}
    },
    plugins: {
      entries: {
        '@thailand/thai-nlp': { enabled: true },
        '@thailand/line-channel': { enabled: config.channel === 'line' }
      }
    },
    apiKeys: {
      // Store API key based on provider
      openrouter: provider === 'openrouter' ? config.apiKey : undefined,
      openai: provider === 'openai' ? config.apiKey : undefined,
      anthropic: provider === 'anthropic' ? config.apiKey : undefined
    },
    nongkung: {
      version: '0.1.0',
      installedAt: new Date().toISOString(),
      channel: config.channel,
      provider: provider
    }
  };
  
  // Add channel-specific config
  if (config.channel === 'line' && config.lineConfig) {
    openclawConfig.channels.entries.line = {
      enabled: true,
      ...config.lineConfig
    };
  }
  
  if (config.channel === 'telegram' && config.telegramConfig) {
    openclawConfig.channels.entries.telegram = {
      enabled: true,
      ...config.telegramConfig
    };
  }
  
  await fs.writeJson(configPath, openclawConfig, { spaces: 2 });
}

export default start;
