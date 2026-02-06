import chalk from 'chalk';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkg = JSON.parse(readFileSync(join(__dirname, '../../package.json'), 'utf8'));

function version() {
  console.log(chalk.cyan('🦞 น้องกุ้ง (Nongkung)\n'));
  console.log(`  nongkung:     ${chalk.green(pkg.version)}`);
  
  try {
    const openclawVersion = execSync('openclaw --version', { encoding: 'utf-8', stdio: 'pipe' }).trim();
    console.log(`  openclaw:     ${chalk.green(openclawVersion)}`);
  } catch {
    console.log(`  openclaw:     ${chalk.red('ไม่พบ (ยังไม่ได้ติดตั้ง)')}`);
  }
  
  console.log(`  node:         ${chalk.green(process.version)}`);
  console.log(`  platform:     ${chalk.green(process.platform)}`);
  console.log();
}

export default version;
