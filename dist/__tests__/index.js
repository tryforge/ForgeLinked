import { ForgeClient } from '@tryforge/forgescript';
import { ForgeLinked } from '../index.js';
const lavalink = new ForgeLinked({
    nodes: [
        {
            name: 'Public Lavalink v4',
            url: 'lava-v4.ajieblogs.eu.org:443',
            auth: 'https://dsc.gg/ajidevserver',
            secure: true,
        },
    ],
    defaultVolume: 80,
    events: {
        player: ['playerStart', 'playerEnd', 'playerDestroy'],
    },
});
const client = new ForgeClient({
    intents: ['Guilds', 'GuildMessages', 'MessageContent', 'GuildVoiceStates'],
    events: ['messageCreate', 'voiceStateUpdate'],
    extensions: [lavalink],
    prefixes: ['.'],
});
client.commands.add({
    name: 'e',
    type: 'messageCreate',
    code: '$onlyForUsers[Not for you!;$botOwnerID] $eval[$message]',
});
client.login('');
//# sourceMappingURL=index.js.map