import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript';
import { ForgeLinked } from '..';
import { Player } from 'lavalink-client';

export interface IForgeLinkedEvents {
  error: [Error];
  linkedPlayerCreate: [Player];
  linkedPlayerDestroy: [Player, string?]
  linkedPlayerDisconnect: [Player, string]
  linkedPlayerMove: [Player, string, string]
}

export class ForgeLinkedEventHandler<T extends keyof IForgeLinkedEvents>
  extends BaseEventHandler<IForgeLinkedEvents, T> 
{
  register(client: ForgeClient): void {
    client.getExtension(ForgeLinked, true)['emitter']
      // @ts-ignore
      .on(this.name, this.listener.bind(client));
  }
}
