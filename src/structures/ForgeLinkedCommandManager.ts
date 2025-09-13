import { BaseCommandManager } from '@tryforge/forgescript'
import type { LavalinkManagerEvents } from 'lavalink-client'

export const handlerName = 'ForgeLinked'

export class ForgeLinkedCommandManager extends BaseCommandManager<keyof LavalinkManagerEvents> {
  handlerName = 'ForgeLinkedCommands'
}
