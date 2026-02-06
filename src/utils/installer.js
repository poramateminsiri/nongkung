import { execSync } from 'child_process';

function checkOpenClawInstalled() {
  try {
    execSync('which openclaw', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function installOpenClaw() {
  return new Promise((resolve, reject) => {
    try {
      execSync('npm install -g openclaw@latest', { 
        stdio: 'inherit',
        timeout: 120000 
      });
      resolve();
    } catch (error) {
      reject(new Error('ติดตั้ง OpenClaw ไม่สำเร็จ: ' + error.message));
    }
  });
}

export { checkOpenClawInstalled, installOpenClaw };
