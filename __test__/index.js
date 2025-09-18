const { ForgeClient } = require('@tryforge/forgescript')
const { ForgeLinked } = require('../dist')
import * as dotenv from 'dotenv'
dotenv.config()

const lavalink = new ForgeLinked({
nodes: [
    {
        id: "Public Lavalink Server",
        host: "lavalink.zack911.xyz",          // or your VPS IP/domain
        port: 443,
        authorization: "ZackIsSoCool",  // ✅ must be 'authorization'
        secure: true
    }    
],
    playerOptions: {
        defaultSearchPlatform: "youtube"
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


client.login(process.env.BOT_TOKEN)
