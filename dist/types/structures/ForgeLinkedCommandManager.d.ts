import { BaseCommandManager } from '@tryforge/forgescript';
import type { LavalinkManagerEvents } from 'lavalink-client';
export declare const handlerName = "ForgeLinked";
export declare class ForgeLinkedCommandManager extends BaseCommandManager<keyof LavalinkManagerEvents> {
    handlerName: string;
}
