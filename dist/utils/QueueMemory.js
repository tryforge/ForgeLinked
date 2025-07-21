"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setOriginalQueue = setOriginalQueue;
exports.getOriginalQueue = getOriginalQueue;
exports.clearOriginalQueue = clearOriginalQueue;
exports.hasOriginalQueue = hasOriginalQueue;
const originalQueues = new Map();
function setOriginalQueue(guildId, tracks) {
    if (!originalQueues.has(guildId)) {
        originalQueues.set(guildId, [...tracks]);
    }
}
function getOriginalQueue(guildId) {
    return originalQueues.get(guildId) ?? null;
}
function clearOriginalQueue(guildId) {
    originalQueues.delete(guildId);
}
function hasOriginalQueue(guildId) {
    return originalQueues.has(guildId);
}
