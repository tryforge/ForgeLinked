const { ForgeClient } = require('@tryforge/forgescript')
const { ForgeLinked } = require('../dist')


const lavalink = new ForgeLinked({
nodes: [
    {
        id: "My Lavalink v4",
        host: "localhost",          // or your VPS IP/domain
        port: 2333,
        authorization: "yourverystrongpassword",  // ✅ must be 'authorization'
        secure: false
    }    
],
    playerOptions: {
        defaultSearchPlatform: "scsearch"
    },
    events: ['linkedPlayerCreate', 'linkedPlayerDestroy']
})

const client = new ForgeClient({
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent',
        'GuildVoiceStates'
    ],
    events: [
        'messageCreate'
    ],
    extensions: [lavalink],
    prefixes: ['.']
})

client.commands.add({
    name: 'e',
    type: 'messageCreate',
    code: '$onlyForUsers[Not for you!;$botOwnerID] $eval[$message]'
})
