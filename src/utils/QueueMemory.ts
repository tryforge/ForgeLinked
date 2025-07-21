import { KazagumoTrack } from 'kazagumo'

const originalQueues = new Map<string, KazagumoTrack[]>()

export function setOriginalQueue(guildId: string, tracks: KazagumoTrack[]) {
    if (!originalQueues.has(guildId)) {
        originalQueues.set(guildId, [...tracks])
    }
}

export function getOriginalQueue(guildId: string): KazagumoTrack[] | null {
    return originalQueues.get(guildId) ?? null
}

export function clearOriginalQueue(guildId: string) {
    originalQueues.delete(guildId)
}

export function hasOriginalQueue(guildId: string) {
    return originalQueues.has(guildId)
}
