import { Client } from 'meowsab';
import { group, access } from "./system/control.js";
import UltraDB from "./system/UltraDB.js";
import sub from './sub.js';

/* =========== Client ========== */
const client = new Client({
  phoneNumber: '380719142698', // Bot number
  prefix: [".", "/", "!"],
  fromMe: false,
  owners: [
    // Owner 1 - انت
    { name: "الدشاش", lid: "6360947232863@lid", jid: "201211347034@s.whatsapp.net" },
    // Owner 2
    { name: "alhwary", lid: "201556853817@lid", jid: "201556853817@s.whatsapp.net" },
  ],
  settings: { noWelcome: false },
  commandsPath: './plugins'
});

// ===== كود اجباري عشان meowsab يتعرف على المطور =====
client.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m) return;
    const sender = m.key.participant || m.key.remoteJid;
    const isOwner = client.config.owners.some(o => o.jid === sender || o.lid === sender);
    m.isOwner = isOwner; // هنا بنقوله ده مطور
});

client.onGroupEvent(group);
client.onCommandAccess(access);

/* =========== Database ========== */
if (!global.db) {
    global.db = new UltraDB();
}

/* =========== Config ========== */
const { config } = client;
config.info = {
  nameBot: "𓆩𓃵𓆩𓆣𝓚𝓷𝓲𝓰𝓱𝓽 𝓐𝓵𝓓𝓪𝓼𝓱𝓪𝓼𝓱𓆣𓆪𓂀𓆪",
  nameChannel: "𓆩𓃵𓆩𓆣𝓚𝓷𝓲𝓰𝓱𝓽 𝓐𝓵𝓓𝓪𝓼𝓱𝓪𝓼𝓱𓆣𓆪𓂀𓆪",
  idChannel: "120363419296439517@newsletter",
  urls: {
    repo: "هنا رابط الريبو",
    api: "https://emam-api.web.id",
    channel: "https://whatsapp.com/channel/0029Vb6VF4R3bbUwgCtJlC3U"
  },
  copyright: {
    pack: '𓆩𓃵𓆩𓆣𝓚𝓷𝓲𝓰𝓱𝓽 𝓐𝓵𝓓𝓪𝓼𝓱𝓪𝓼𝓱𓆣𓆪𓂀𓆪',
    author: '𓆩𓃵𓆩𓆣𝓚𝓷𝓲𝓰𝓱𝓽 𝓐𝓵𝓓𝓪𝓼𝓱𝓪𝓼𝓱𓆣𓆪𓂀𓆪'
  },
  images: [
    "هنا رابط صوره",
    "هنا الصوره",
    "هنا الصور "
  ]
};

/* =========== Start ========== */
client.start();

setTimeout(async () => {
if (client.commandSystem) {
sub(client)
  }
}, 2000);

/* =========== Catch Errors ========== */
process.on('uncaughtException', (e) => {
    if (e.message.includes('rate-overlimit')) {}
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
});