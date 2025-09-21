import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare enum LoopMode {
    OFF = "off",
    TRACK = "track",
    QUEUE = "queue"
}
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.Guild;
    required: true;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Enum;
    enum: typeof LoopMode;
    required: true;
    rest: false;
}], true>;
export default _default;
