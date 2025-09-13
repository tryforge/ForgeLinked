import { BaseCommandManager } from '@tryforge/forgescript'

import type { ForgeLinkedEventNames } from './ForgeLinkedEventManager.js'

export const handlerName = 'ForgeLinked'

export class ForgeLinkedCommandManager extends BaseCommandManager<ForgeLinkedEventNames> {
  handlerName = 'forgeLinkedCommands'
}
