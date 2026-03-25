import { BaseCommandManager } from '@tryforge/forgescript'

import type { IForgeLinkedEvents } from './ForgeLinkedEventManager'

export const handlerName = 'ForgeLinked'

export class ForgeLinkedCommandManager extends BaseCommandManager<keyof IForgeLinkedEvents> {
  handlerName = 'ForgeLinked'
}
