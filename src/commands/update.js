import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import { copyThaiTemplates } from '../utils/templates.js';

async function update() {
  console.log(chalk.cyan('🔄 อัปเดตน้องกุ้งและ OpenClaw\n'));
  
  // Update @thailand/openclaw
  const spinner1 = ora('กำลังอัปเดต nongkung...').start();
  try {
    execSync('npm update -g @thailand/openclaw', { stdio: 'ignore' });
    spinner1.succeed('อัปเดต nongkung เสร็จแล้ว');
  } catch (error) {
    spinner1.warn('ไม่สามารถอัปเดต nongkung ได้');
  }
  
  // Update openclaw
  const spinner2 = ora('กำลังอัปเดต OpenClaw...').start();
  try {
    execSync('npm update -g openclaw', { stdio: 'ignore' });
    spinner2.succeed('อัปเดต OpenClaw เสร็จแล้ว');
  } catch (error) {
    spinner2.fail('อัปเดต OpenClaw ไม่สำเร็จ');
    console.log(chalk.yellow('💡 ลองรันด้วยตนเอง: npm update -g openclaw'));
  }
  
  // Update Thai templates
  const spinner3 = ora('กำลังอัปเดต Thai templates...').start();
  try {
    const workspace = `${process.env.HOME}/.openclaw/workspace`;
    await copyThaiTemplates(workspace);
    spinner3.succeed('อัปเดต Thai templates เสร็จแล้ว');
  } catch (error) {
    spinner3.warn('ไม่สามารถอัปเดต templates ได้');
  }
  
  console.log(chalk.green('\n✅ อัปเดตเสร็จสิ้น'));
  console.log(chalk.gray('รันด้วย: openclaw doctor เพื่อตรวจสอบระบบ\n'));
}

export default update;
