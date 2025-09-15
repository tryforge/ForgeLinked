import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript';
import { Player } from 'lavalink-client';
export interface IForgeLinkedEvents {
    error: [Error];
    linkedPlayerCreate: [Player];
    linkedPlayerDestroy: [Player, string?];
    linkedPlayerDisconnect: [Player, string];
    linkedPlayerMove: [Player, string, string];
}
export declare class ForgeLinkedEventHandler<T extends keyof IForgeLinkedEvents> extends BaseEventHandler<IForgeLinkedEvents, T> {
    register(client: ForgeClient): void;
}
