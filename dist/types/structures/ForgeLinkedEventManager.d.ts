import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript';
import { KazagumoEvents } from '../index.js';
type KazagumoEventNames = keyof KazagumoEvents;
/** Union of all supported events */
export type ForgeLinkedEventNames = KazagumoEventNames;
export declare class ForgeLinkedEventHandler<T extends ForgeLinkedEventNames = ForgeLinkedEventNames> extends BaseEventHandler<any, T> {
    register(client: ForgeClient): void;
}
export {};
