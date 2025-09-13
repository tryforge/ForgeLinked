import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript'

import { ForgeLinked } from '../index.js'

/* -------------------------------------------------------------------------- */
/*                                Event Types                                 */
/* -------------------------------------------------------------------------- */

export type NodeEventNames =
  | 'connect'
  | 'disconnect'
  | 'reconnecting'
  | 'create'
  | 'destroy'
  | 'error'
  | 'resumed'

export type LavalinkEventNames =
  | 'trackStart'
  | 'trackEnd'
  | 'trackStuck'
  | 'trackError'
  | 'queueEnd'
  | 'playerCreate'
  | 'playerDestroy'
  | 'playerMove'
  | 'playerDisconnect'
  | 'playerUpdate'
  | 'playerVoiceJoin'
  | 'playerVoiceLeave'
  | 'debug'
  | 'LyricsLine'
  | 'LyricsFound'
  | 'LyricsNotFound'
  | 'SegmentsLoaded'
  | 'SegmentSkipped'
  | 'ChapterStarted'
  | 'ChaptersLoaded'

export type ForgeLinkEventNames = NodeEventNames | LavalinkEventNames

/* -------------------------------------------------------------------------- */
/*                              Unified Handler                               */
/* -------------------------------------------------------------------------- */

export class ForgeLinkEventHandler<
  T extends ForgeLinkEventNames = ForgeLinkEventNames,
> extends BaseEventHandler<any, T> {
  register(client: ForgeClient): void {
    const forgeLink = client.getExtension(ForgeLinked, true)

    // Node events
    if (this.isNodeEvent(this.name)) {
      if (forgeLink.lavalink.nodeManager) {
        forgeLink.lavalink.nodeManager.on(this.name as any, (...args: any[]) => {
          this.listener.apply(client, args)
        })
      } else {
        console.warn(
          `[ForgeLink] Attempted to register node event "${this.name}" but node manager is not initialized.`,
        )
      }
      return
    }

    // Lavalink events
    if (forgeLink.lavalink) {
      forgeLink.lavalink.on(this.name as any, (...args: any[]) => {
        this.listener.apply(client, args)
      })
    } else {
      console.warn(
        `[ForgeLink] Attempted to register lavalink event "${this.name}" but manager is not initialized.`,
      )
    }
  }

  private isNodeEvent(event: string): event is NodeEventNames {
    return (
      ['connect', 'disconnect', 'reconnecting', 'create', 'destroy', 'error', 'resumed'] as string[]
    ).includes(event)
  }
}
