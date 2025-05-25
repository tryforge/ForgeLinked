import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'

type NodeEventNames = 
  | 'connect'
  | 'disconnect'
  | 'reconnecting'
  | 'create'
  | 'destroy'
  | 'error'
  | 'resumed'
  ;

export class NodeEventHandler<T extends NodeEventNames = NodeEventNames> extends BaseEventHandler<any, T> {
    register(client: ForgeClient): void {
        const forgeLink = client.getExtension(ForgeLink, true);
        if (forgeLink.lavalink.nodeManager) {
            forgeLink.lavalink.nodeManager.on(this.name as any, (...args: any[]) => {
                this.listener.apply(client, args);
            });
        } else { 
            console.warn(`[ForgeLink] Attempted to register event "${this.name}" but Node manager is not initialized.`);
        }
    }
}