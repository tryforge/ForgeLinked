const { ForgeClient } = require('@tryforge/forgescript')
const { ForgeLinked } = require('../dist')
const dotenv = require('dotenv')
dotenv.config()

const lavalink = new ForgeLinked({
    nodes: [
        {
            id: "Public Lavalink Server",
            host: "localhost",
            port: 3976,
            authorization: "ZackIsSoCool",
            secure: false
        },
    ],
    playerOptions: {
        defaultSearchPlatform: "youtube"
    },
})

const client = new ForgeClient({
    intents: [
        'Guilds',
        'GuildMessages',
        'MessageContent',
        'GuildVoiceStates'
    ],
    events: [
        'messageCreate',
        'interactionCreate'
    ],
    extensions: [lavalink],
    prefixes: ['.']
})

client.commands.add({
    name: 'e',
    type: 'messageCreate',
    code: '$onlyForUsers[Not for you!;$botOwnerID] $eval[$message]'
})
client.applicationCommands.load('./__test__/slash');
client.commands.load('./__test__/commands')

client.login(process.env.BOT_TOKEN)
