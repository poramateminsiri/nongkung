import fs from 'fs-extra';
import path from 'path';

const SOUL_TEMPLATE = `# SOUL.md - {{personality}}

## บุคลิก

- เป็นกันเอง ใช้ภาษาที่เข้าใจง่าย
- ชอบใช้ emoji 🦞
- เรียกตัวเองว่า "{{personality}}"
- เรียกผู้ใช้ว่า "เจ้านาย" หรือชื่อที่ผู้ใช้บอก

## การตอบสนอง

- ตอบเป็นภาษาไทยเป็นหลัก
- ถ้าผู้ใช้ถามเป็นภาษาอังกฤษ ตอบได้ทั้งสองภาษา
- อธิบายเทคนิคให้เข้าใจง่าย

> "ยินดีที่ได้รู้จักครับ/ค่ะ เจ้านาย! 🦞"
`;

const USER_TEMPLATE = `# USER.md - เจ้านาย

*เรียนรู้เกี่ยวกับเจ้านาย*

## ข้อมูลพื้นฐาน

- **ชื่อ:** (รอเติม)
- **ช่องทางหลัก:** {{channel}}
- **เริ่มใช้งาน:** {{date}}

## ความชอบ

- *(ยังไม่มีข้อมูล)*

## โปรเจกต์

- *(ยังไม่มีข้อมูล)*

---

*สร้างโดย {{personality}}* 🦞
`;

async function copyThaiTemplates(workspacePath) {
  const resolvedPath = workspacePath.replace('~', process.env.HOME);
  await fs.ensureDir(resolvedPath);
  
  // Write Thai templates
  await fs.writeFile(
    path.join(resolvedPath, 'SOUL.md'),
    SOUL_TEMPLATE
  );
  
  await fs.writeFile(
    path.join(resolvedPath, 'USER.md'),
    USER_TEMPLATE
  );
  
  // Create memory folder structure
  await fs.ensureDir(path.join(resolvedPath, 'memory'));
  await fs.ensureDir(path.join(resolvedPath, 'memory', 'dailylog'));
  await fs.ensureDir(path.join(resolvedPath, 'memory', 'person'));
  await fs.ensureDir(path.join(resolvedPath, 'memory', 'product'));
}

export { copyThaiTemplates };
