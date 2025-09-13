import { BaseCommandManager } from '@tryforge/forgescript';
import type { ForgeLinkedEventNames } from './ForgeLinkedEventManager.js';
export declare const handlerName = "ForgeLinked";
export declare class ForgeLinkedCommandManager extends BaseCommandManager<ForgeLinkedEventNames> {
    handlerName: string;
}
