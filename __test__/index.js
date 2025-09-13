const { ForgeClient } = require('@tryforge/forgescript')
const { ForgeLinked } = require('../dist')


const lavalink = new ForgeLinked({
nodes: [
        {
            id: "Public Lavalink v4",
            authorization: "https://dsc.gg/ajidevserver",
            host: "lava-v4.ajieblogs.eu.org",
            port: 443,
            secure: true
          }
    ],
    playerOptions: {
        defaultSearchPlatform: "ytsearch"
        }
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


client.login("")