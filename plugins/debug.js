async function handler(m, { conn }) {
    // بيطبع شكل الرسالة كامل في الـ console (اللوج بتاع السيرفر/الاستضافة)
    // عشان نعرف بالظبط فين الفريموورك حاطط الـ lid والـ jid
    console.log('---- DEBUG MSG ----');
    console.log(JSON.stringify(m, null, 2));
    console.log('--------------------');

    await conn.sendMessage(
        m.chat,
        { text: `sender: ${m.sender}\nkey.participant: ${m.key?.participant}\npushName: ${m.pushName}` },
        { quoted: m }
    );
}

handler.command = ['ديبج', 'debug'];
handler.category = 'owner';

export default handler;
