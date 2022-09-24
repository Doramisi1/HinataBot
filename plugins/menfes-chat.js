async function handler(m, { conn, text, usedPrefix, command, args }) {
    command = command.toLowerCase()
    this.menfes = this.menfes ? this.menfes : {}

    
    switch (command) {
        case 'menfesnext':
        case 'menfesleave': {
            let room = Object.values(this.menfes).find(room => room.check(m.sender))
            if (!room) return this.sendButton(m.chat, '*Kamu tidak sedang berada di menfes chat*', author, null, [['Cari Partner', `.menfesstart`]], m)
            m.reply('Ok')
            let other = room.other(m.sender)
            if (other) await this.sendButton(other, '*Partner meninggalkan chat*', author, null, [['Cari Partner', `.menfesstart`]], m)
            delete this.menfes[room.id]
            if (command === 'menfesleave') break
        }
        case 'menfesstart': {
            if (Object.values(this.menfes).find(room => room.check(m.sender))) return this.sendButton(m.chat, '*Kamu masih berada di dalam menfes chat, menunggu partner*', author, null, [['Keluar', `.menfesleave`]], m)
            let room = Object.values(this.menfes).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendButton(room.a, '*Partner ditemukan!*', author, null, [['Next', `.menfesnext`]], m)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.sendButton(room.a, '*Partner ditemukan!*', author, null, [['Next', `.menfesnext`]], m)
                let mention = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[0] ? (args[0].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
    if (!mention) throw 'Tag salah satu lah'
	let txt = (args.length > 1 ? args.slice(1).join(' ') : '') || ''
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || ''
	let tujuan = `👋 Saya *${conn.user.name}*, Pesan Untuk Kamu
👥 Dari : *PENGIRIM RAHASIA*

${htki} 💌 Pesan ${htka}
${htjava} ${txt}
`
	let cap = `${htki} PESAN RAHASIA ${htka}
Anda Ingin Mengirimkan Pesan ke pacar/sahabat/teman/doi/
mantan?, tapi Tidak ingin tau siapa Pengirimnya?
Kamu bisa menggunakan Bot ini
Contoh Penggunaan: ${usedPrefix + command} ${nomorown} pesan untuknya

Contoh: ${usedPrefix + command} ${nomorown} hai`
	if (!m.quoted) {
		await conn.sendHydrated(mention, tujuan, cap, thumbnailUrl.getRandom(), 'https://wa.me/' + m.sender.split("@s.whatsapp.net")[0], 'KIRIM PESAN', null, null, [
			[null, null]
		], null)
	} else {
		await conn.sendHydrated(mention, tujuan, cap, thumbnailUrl.getRandom(), 'https://wa.me/' + m.sender.split("@s.whatsapp.net")[0], 'KIRIM PESAN', null, null, [
			[null, null]
		], null)
		let media = q ? await m.getQuotedObj() : false || m
		await conn.copyNForward(mention, media, false).catch(_ => _)
	}
	let suks = `Mengirim Pesan *${mime ? mime : 'Teks'}*
👥 Dari : @${m.sender.replace(/@.+/, '')}
👥 Untuk : @${mention.replace(/@.+/, '')}

${htki} 💌 Pesan ${htka}
${htjava} ${txt}
`
	await conn.sendButton(m.chat, suks, wm, null, [['Menu', '/menu']], m, { mentions: conn.parseMention(suks) })
	
            } else {
                let id = + new Date
                this.menfes[id] = {
                    id,
                    a: m.sender,
                    b: mention,
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                await this.sendButton(m.chat, '*Menunggu partner...*', author, null, [['Keluar', `.menfesleave`]], m)
            }
            break
        }
    }
}
handler.help = ['menfesstart', 'menfesleave', 'menfesnext']
handler.tags = ['menfes']
handler.command = ['menfesstart', 'menfesleave', 'menfesnext']

handler.private = true

export default handler