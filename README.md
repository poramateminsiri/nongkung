# 🦞 Nongkung (น้องกุ้ง)

**Thai-localized OpenClaw CLI** — Making AI agents accessible for Thai users

[![npm version](https://img.shields.io/npm/v/@thailand/openclaw.svg)](https://www.npmjs.com/package/@thailand/openclaw)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🇹🇭 ภาษาไทย

**น้องกุ้ง** คือ Thai Onboard CLI สำหรับ OpenClaw — ช่วยให้คนไทยติดตั้งและใช้งาน AI Agent ได้ง่ายขึ้น

### ✨ ฟีเจอร์เด่น

- 🗣️ **ภาษาไทยทั้งหมด** — ติดตั้งผ่าน onboarding ภาษาไทย
- 🦐 **น้องกุ้ง Preset** — บุคลิก AI แบบไทยๆ พร้อมใช้
- 💬 **รองรับหลายช่องทาง** — WhatsApp, Telegram, Discord, Slack และเตรียมเพิ่มช่องทางอื่นๆ ในอนาคต

### 🚀 เริ่มต้นใช้งาน

```bash
# ติดตั้ง
npm install -g @thailand/openclaw

# เริ่มต้นใช้งาน (Thai Onboard)
nongkung start
```

### 📋 คำสั่งที่ใช้บ่อย

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `nongkung start` | ติดตั้งและตั้งค่าน้องกุ้งครั้งแรก |
| `nongkung fix` | แก้ไขปัญหาและรีเซ็ตการตั้งค่า |
| `nongkung update` | อัปเดต OpenClaw และ Thai templates |
| `nongkung version` | เช็คเวอร์ชัน |

### 🔧 หลังจากติดตั้ง

เมื่อตั้งค่าเสร็จแล้ว ใช้ `openclaw` ได้เลย:

```bash
openclaw dashboard    # เปิด Web Dashboard
openclaw gateway status    # เช็คสถานะ Gateway
```

### 📝 ตัวอย่างการตั้งค่า

```bash
$ nongkung start
🦞 ยินดีต้อนรับสู่น้องกุ้ง (Nongkung)!

📋 เริ่มต้นการตั้งค่าน้องกุ้ง...
? ตั้งชื่อผู้ช่วยของคุณ: น้องกุ้ง
? เลือกแอพแชทหลัก: WhatsApp
? เลือก AI Model: Claude Sonnet
? ใส่ API Key: sk-...

✅ น้องกุ้งพร้อมใช้งานแล้ว!
📱 เปิด Dashboard: http://localhost:18789/
```

---

## 🇺🇸 English

**Nongkung** is a Thai-localized CLI wrapper for OpenClaw — making AI agent setup accessible for Thai users who may not be comfortable with English terminal commands.

### ✨ Features

- 🗣️ **Full Thai Language** — Thai onboarding experience
- 🦐 **Nongkung Preset** — Thai personality and communication style
- 💬 **Multi-Channel Support** — WhatsApp, Telegram, Discord, Slack, with more channels coming

### 🚀 Quick Start

```bash
# Install
npm install -g @thailand/openclaw

# Start Thai Onboard
nongkung start
```

### 📋 Available Commands

| Command | Description |
|---------|-------------|
| `nongkung start` | First-time setup and Thai Onboard |
| `nongkung fix` | Troubleshoot and reset configuration |
| `nongkung update` | Update OpenClaw and Thai templates |
| `nongkung version` | Check versions |

### 🔧 After Installation

Once setup is complete, use `openclaw` directly:

```bash
openclaw dashboard          # Open Web Dashboard
openclaw gateway status     # Check Gateway status
```

### 📝 Configuration Example

```bash
$ nongkung start
🦞 Welcome to Nongkung!

? Name your assistant: Nongkung
? Choose primary chat app: WhatsApp
? Choose AI Model: Claude Sonnet
? Enter API Key: sk-...

✅ Nongkung is ready!
📱 Open Dashboard: http://localhost:18789/
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐
│  nongkung                           │  ← Thai CLI (this package)
│  - Thai Onboard Wizard              │
│  - LINE/Thai presets                │
│  - Thai templates (SOUL.md, etc.)   │
└─────────────────────────────────────┘
              ↓ wraps
┌─────────────────────────────────────┐
│  openclaw                           │  ← Core OpenClaw
│  - Gateway, Agents, Channels        │
│  - All platform features            │
└─────────────────────────────────────┘
```

This is a **wrapper package** — we don't fork OpenClaw. We:
- Add Thai language onboarding
- Provide Thai personality presets
- Include Thai-localized templates
- Simplify setup for Thai users

---

## 📦 Project Structure

```
nongkung/
├── bin/
│   └── nongkung.js          # CLI entry point
├── src/
│   ├── commands/            # CLI commands (start, fix, update, version)
│   ├── wizard/              # Thai Onboard wizard
│   └── utils/               # Utilities
└── package.json
```

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 👥 Contributors

- **Poramate Minsiri** ([@poramateminsiri](https://www.linkedin.com/in/poramateminsiri/)) — Lead Developer
- **Mok (หมอก)** 🌫️ — AI Research Partner

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

## 🔗 Links

- 📚 OpenClaw Docs: [docs.openclaw.ai](https://docs.openclaw.ai)
- 🐙 GitHub: [poramateminsiri/nongkung](https://github.com/poramateminsiri/nongkung)
- 💬 Community: [Facebook Group - น้องกุ้ง Openclaw Thai](https://facebook.com/groups/nongkung)

---

<p align="center">
  Made with 🦞 for Thai AI community
</p>
