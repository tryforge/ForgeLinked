"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeLinked = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const lavalink_client_1 = require("lavalink-client");
const path_1 = __importDefault(require("path"));
const ForgeLinkedCommandManager_js_1 = require("./structures/ForgeLinkedCommandManager.js");
/* -------------------------------------------------------------------------- */
/*                               ForgeLink Class                              */
/* -------------------------------------------------------------------------- */
class ForgeLinked extends forgescript_1.ForgeExtension {
    options;
    name = 'ForgeLink';
    description = 'ForgeScript integration with lavalink-client';
    version = '1.0.0';
    client;
    lavalink;
    commands;
    constructor(options) {
        super();
        this.options = options;
    }
    async init(client) {
        const start = Date.now();
        this.client = client;
        this.lavalink = new lavalink_client_1.LavalinkManager({
            nodes: this.options.nodes,
            sendToShard: (guildId, payload) => {
                const guild = this.client.guilds.cache.get(guildId);
                if (guild)
                    guild.shard.send(payload);
                return Promise.resolve();
            },
            autoSkip: this.options.autoSkip ?? true,
            autoSkipOnResolveError: this.options.autoSkipOnResolveError ?? true,
            emitNewSongsOnly: this.options.emitNewSongsOnly ?? true,
            playerOptions: {
                applyVolumeAsFilter: this.options.playerOptions?.applyVolumeAsFilter ?? false,
                clientBasedPositionUpdateInterval: this.options.playerOptions?.clientBasedPositionUpdateInterval ?? 50,
                defaultSearchPlatform: this.options.playerOptions?.defaultSearchPlatform ?? 'ytsearch',
                volumeDecrementer: this.options.playerOptions?.volumeDecrementer ?? 0.75,
                useUnresolvedData: this.options.playerOptions?.useUnresolvedData ?? true,
                requesterTransformer: this.options.requesterTransformer,
                onDisconnect: {
                    autoReconnect: this.options.playerOptions?.onDisconnect?.autoReconnect ?? true,
                    destroyPlayer: this.options.playerOptions?.onDisconnect?.destroyPlayer ?? false,
                },
                onEmptyQueue: {
                    destroyAfterMs: this.options.playerOptions?.onEmptyQueue?.destroyAfterMs ?? 30000,
                    autoPlayFunction: this.options.autoPlayFunction,
                },
            },
            queueOptions: {
                maxPreviousTracks: this.options.queueOptions?.maxPreviousTracks ?? 10,
            },
            linksAllowed: this.options.linksAllowed ?? true,
            linksBlacklist: this.options.linksBlacklist ?? [],
            linksWhitelist: this.options.linksWhitelist ?? [],
        });
        this.commands = new ForgeLinkedCommandManager_js_1.ForgeLinkedCommandManager(this.client);
        client.on('raw', (packet) => {
            this.lavalink.sendRawData(packet).catch((err) => {
                console.error('Failed to send raw data to Lavalink:', err);
            });
        });
        this.load(path_1.default.join(__dirname, './natives'));
        if (this.options.events?.player?.length) {
            for (const event of this.options.events.player) {
                this.lavalink.on(event, (...args) => {
                    this.client.emit(`lavalink${String(event).charAt(0).toUpperCase() + String(event).slice(1)}`, ...args);
                });
            }
        }
        client.on('ready', () => {
            this.lavalink.init({
                id: client.user.id,
                username: client.user.username,
            });
        });
        console.debug(`ForgeLink: Initialized in ${Date.now() - start}ms`);
    }
}
exports.ForgeLinked = ForgeLinked;
//# sourceMappingURL=index.js.map