import { BaseEventHandler } from '@tryforge/forgescript';
import { ForgeLinked } from '../index.js';
/* -------------------------------------------------------------------------- */
/*                             Unified Event Handler                          */
/* -------------------------------------------------------------------------- */
export class ForgeLinkedEventHandler extends BaseEventHandler {
    register(client) {
        const forgeLink = client.getExtension(ForgeLinked, true);
        if (!forgeLink.kazagumo) {
            console.warn(`[ForgeLinked] Attempted to register event "${this.name}" but Kazagumo is not initialized.`);
            return;
        }
        forgeLink.kazagumo.on(this.name, (...args) => {
            this.listener.apply(client, args);
        });
    }
}
//# sourceMappingURL=ForgeLinkedEventManager.js.map