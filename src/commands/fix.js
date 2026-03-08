import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import inquirer from 'inquirer';

import { runThaiOnboard } from '../wizard/onboard.js';
import { writeOpenClawConfig } from './start.js';

async function fix() {
  console.log(chalk.cyan('🔧 โหมดแก้ไขปัญหาน้องกุ้ง\n'));
  
  // Check 1: OpenClaw installed?
  const spinner1 = ora('ตรวจสอบ OpenClaw...').start();
  try {
    execSync('which openclaw', { stdio: 'ignore' });
    spinner1.succeed('OpenClaw ติดตั้งแล้ว');
  } catch {
    spinner1.fail('OpenClaw ยังไม่ได้ติดตั้ง');
    console.log(chalk.yellow('💡 รัน: nongkung start'));
    return;
  }
  
  // Check 2: Doctor
  const spinner2 = ora('กำลังตรวจสอบระบบ (openclaw doctor)...').start();
  try {
    execSync('openclaw doctor --non-interactive', { stdio: 'pipe' });
    spinner2.succeed('ระบบปกติ');
  } catch (error) {
    spinner2.warn('พบปัญหาในระบบ');
    console.log(chalk.yellow(error.stdout?.toString() || error.message));
  }
  
  // Ask what to do
  const { action } = await inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'ต้องการทำอะไร?',
    choices: [
      { name: '🔥 รีเซ็ตการตั้งค่าใหม่ (Thai Onboard)', value: 'reset' },
      { name: 'รีสตาร์ท Gateway', value: 'restart' },
      { name: 'แก้ไข PATH', value: 'path' },
      { name: 'ไม่ทำอะไร', value: 'cancel' }
    ]
  }]);
  
  if (action === 'reset') {
    console.log(chalk.yellow('\n🔄 เริ่มต้น Thai Onboard ใหม่...\n'));
    const config = await runThaiOnboard();
    await writeOpenClawConfig(config);
    console.log(chalk.green('\n✅ รีเซ็ตเสร็จแล้ว'));
  } else if (action === 'restart') {
    const spinner = ora('กำลังรีสตาร์ท Gateway...').start();
    try {
      execSync('openclaw gateway restart', { stdio: 'ignore' });
      spinner.succeed('รีสตาร์ทเสร็จแล้ว');
    } catch {
      spinner.fail('รีสตาร์ทไม่สำเร็จ');
    }
  } else if (action === 'path') {
    console.log(chalk.cyan('\n📋 วิธีแก้ไข PATH:\n'));
    console.log('1. เปิดไฟล์ ~/.zshrc หรือ ~/.bashrc');
    console.log('2. เพิ่มบรรทัดนี้:');
    console.log(chalk.green(`   export PATH="$(npm prefix -g)/bin:$PATH"`));
    console.log('3. รัน: source ~/.zshrc (หรือ ~/.bashrc)\n');
  }
}

export default fix;
