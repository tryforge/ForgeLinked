import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript'
import { Player } from 'lavalink-client'

import { ForgeLinked } from '..'

export interface IForgeLinkedEvents {
  error: [Error]
  linkedPlayerCreate: [Player]
  linkedPlayerDestroy: [Player, string?]
  linkedPlayerDisconnect: [Player, string]
  linkedPlayerMove: [Player, string, string]
  linkedPlayerSocketClosed: [Player, string]
  linkedPlayerUpdate: [Player]
  linkedPlayerMuteChange: [Player, boolean, boolean]
  linkedPlayerDeafChange: [Player, boolean, boolean]
  linkedPlayerSuppressChange: [Player, boolean]
  linkedPlayerQueueEmptyStart: [Player, number]
  linkedPlayerQueueEmptyEnd: [Player]
  linkedPlayerQueueEmptyCancel: [Player]
  linkedPlayerVoiceJoin: [Player, string]
  linkedPlayerVoiceLeave: [Player, string]
  linkedTrackStart: [Player, any, any]
  linkedTrackStuck: [Player, any, any]
  linkedTrackError: [Player, any, any]
  linkedTrackEnd: [Player, any, any]
  linkedQueueEnd: [Player, any, any]
  linkedSegmentsLoaded: [Player, any, any]
  linkedSegmentSkipped: [Player, any, any]
  linkedChapterStarted: [Player, any, any]
  linkedChaptersLoaded: [Player, any, any]
  linkedLyricsLine: [Player, any, any]
  linkedLyricsFound: [Player, any, any]
  linkedLyricsNotFound: [Player, any, any]
  linkedDebug: [string, any]
}

export class ForgeLinkedEventHandler<T extends keyof IForgeLinkedEvents> extends BaseEventHandler<
  IForgeLinkedEvents,
  T
> {
  register(client: ForgeClient): void {
    client
      .getExtension(ForgeLinked, true)
      ['emitter']// @ts-ignore
      .on(this.name, this.listener.bind(client))
  }
}
