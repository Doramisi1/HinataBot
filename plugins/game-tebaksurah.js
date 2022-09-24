import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
let handler = async (m, { conn, command, usedPrefix }) => {
let imgr = flaaa.getRandom()

    conn.tebaksurah = conn.tebaksurah ? conn.tebaksurah : {}
    let id = m.chat
    if (id in conn.tebaksurah) {
        conn.sendButton(m.chat, 'Masih ada soal belum terjawab di chat ini', author, null, buttons, conn.tebaksurah[id][0])
        throw false
    }
    let ran = 114
    let src = await (await fetch('https://api.alquran.cloud/v1/surah/' + ran.getRandom() + '/ar.alafasy')).json()
    let ras = src.data
    let strs = src.data.ayahs
for (let i = 0; i < strs.length; i++) {
let v = strs[i].getRandom()
let str = `*${v.text}*
*audio:* ${v.audio}
*number:* ${v.number}
*numberInSurah:* ${v.numberInSurah}
*juz:* ${v.juz}
*manzil:* ${v.manzil}
*page:* ${v.page}
*ruku:* ${v.ruku}
*hizbQuarter:* ${v.hizbQuarter}`
    await conn.sendFile(m.chat, v.audio, 'coba-lagi.mp3', '', m)
  let caption = `
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hsur untuk bantuan
Bonus: ${poin} XP
    `.trim()
    
    conn.tebaksurah[id] = [
        await conn.sendButton(m.chat, caption, author, `${imgr + command}`, buttons, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebaksurah[id]) conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${ras.name + '\n' + str}*`, author, null, [
                ['tebaksurah', '/tebaksurah']
            ], conn.tebaksurah[id][0])
            delete conn.tebaksurah[id]
        }, timeout)
    ]
    }
}
handler.help = ['tebaksurah']
handler.tags = ['game']
handler.command = /^tebaksurah/i

export default handler

const buttons = [
    ['Hint', '/hsur'],
    ['Nyerah', 'menyerah']
]