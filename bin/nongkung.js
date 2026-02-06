#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));

import start from '../src/commands/start.js';
import fix from '../src/commands/fix.js';
import update from '../src/commands/update.js';
import version from '../src/commands/version.js';

program
  .name('nongkung')
  .description('Thai-localized OpenClaw CLI - น้องกุ้ง ผู้ช่วย AI ภาษาไทย')
  .version(pkg.version);

program
  .command('start')
  .description('ติดตั้งและเริ่มต้นใช้งานน้องกุ้ง (Thai Onboard)')
  .action(start);

program
  .command('fix')
  .description('แก้ไขปัญหาและรีเซ็ตการตั้งค่า')
  .action(fix);

program
  .command('update')
  .description('อัปเดต OpenClaw และ Thai templates')
  .action(update);

program
  .command('version')
  .description('แสดงเวอร์ชันของน้องกุ้งและ OpenClaw')
  .action(version);

// Default action ถ้าไม่ใส่คำสั่ง
if (process.argv.length === 2) {
  console.log(chalk.cyan('🦞 น้องกุ้ง (Nongkung) - Thai OpenClaw CLI'));
  console.log(chalk.gray('ใช้ "nongkung --help" เพื่อดูคำสั่งทั้งหมด\n'));
  program.help();
}

program.parse();
