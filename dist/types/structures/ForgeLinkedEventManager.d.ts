import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript';
export type NodeEventNames = 'connect' | 'disconnect' | 'reconnecting' | 'create' | 'destroy' | 'error' | 'resumed';
export type LavalinkEventNames = 'trackStart' | 'trackEnd' | 'trackStuck' | 'trackError' | 'queueEnd' | 'playerCreate' | 'playerDestroy' | 'playerMove' | 'playerDisconnect' | 'playerUpdate' | 'playerVoiceJoin' | 'playerVoiceLeave' | 'debug' | 'LyricsLine' | 'LyricsFound' | 'LyricsNotFound' | 'SegmentsLoaded' | 'SegmentSkipped' | 'ChapterStarted' | 'ChaptersLoaded';
export type ForgeLinkEventNames = NodeEventNames | LavalinkEventNames;
export declare class ForgeLinkEventHandler<T extends ForgeLinkEventNames = ForgeLinkEventNames> extends BaseEventHandler<any, T> {
    register(client: ForgeClient): void;
    private isNodeEvent;
}
