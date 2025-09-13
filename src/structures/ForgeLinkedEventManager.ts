import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript'
import { ForgeLinked, KazagumoEvents } from '../index.js'

/* -------------------------------------------------------------------------- */
/*                               Event Name Types                              */
/* -------------------------------------------------------------------------- */

type KazagumoEventNames = keyof KazagumoEvents

/** Union of all supported events */
export type ForgeLinkedEventNames = KazagumoEventNames

/* -------------------------------------------------------------------------- */
/*                             Unified Event Handler                          */
/* -------------------------------------------------------------------------- */

export class ForgeLinkedEventHandler<
  T extends ForgeLinkedEventNames = ForgeLinkedEventNames,
> extends BaseEventHandler<any, T> {
  register(client: ForgeClient): void {
    const forgeLink = client.getExtension(ForgeLinked, true)

    if (!forgeLink.kazagumo) {
      console.warn(
        `[ForgeLinked] Attempted to register event "${this.name}" but Kazagumo is not initialized.`,
      )
      return
    }

    forgeLink.kazagumo.on(this.name as any, (...args: unknown[]) => {
      this.listener.apply(client, args)
    })
  }
}
