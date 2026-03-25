import { BaseCommandManager } from '@tryforge/forgescript';
import type { IForgeLinkedEvents } from './ForgeLinkedEventManager';
export declare const handlerName = "ForgeLinked";
export declare class ForgeLinkedCommandManager extends BaseCommandManager<keyof IForgeLinkedEvents> {
    handlerName: string;
}
