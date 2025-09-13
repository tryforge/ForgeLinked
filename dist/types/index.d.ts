import { ForgeClient, ForgeExtension } from '@tryforge/forgescript';
import { Kazagumo, KazagumoEvents, KazagumoPlayer } from 'kazagumo';
import { NodeOption } from 'shoukaku';
import { ForgeLinkedCommandManager } from './structures/ForgeLinkedCommandManager.js';
export interface ForgeLinkSetupOptions {
    nodes: NodeOption[];
    defaultVolume?: number;
    events?: {
        player?: (keyof KazagumoEvents)[];
    };
}
export declare class ForgeLinked extends ForgeExtension {
    private readonly options;
    name: string;
    description: string;
    version: string;
    client: ForgeClient;
    kazagumo: Kazagumo;
    commands: ForgeLinkedCommandManager;
    constructor(options: ForgeLinkSetupOptions);
    init(client: ForgeClient): Promise<void>;
}
export { KazagumoPlayer };
export type { KazagumoEvents };
