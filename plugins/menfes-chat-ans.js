export async function before(m, { match }) {
    // if (match) return !1
    if (!m.chat.endsWith('@s.whatsapp.net'))
        return !0
    this.menfes = this.menfes ? this.menfes : {}
    let room = Object.values(this.menfes).find(room => [room.a, room.b].includes(m.sender) && room.state === 'CHATTING')
    if (room) {
        if (/^.*(menfesnext|menfesleave|menfesstart)/.test(m.text))
            return
        let other = [room.a, room.b].find(user => user !== m.sender)
        //await m.copyNForward(other, true)
        await conn.copyNForward(other, m, false).catch(_ => _)
    }
    return !0
}