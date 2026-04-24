import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare enum AudioOutput {
    Mono = "mono",
    Stereo = "stereo",
    Left = "left",
    Right = "right"
}
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.Guild;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.Enum;
    enum: typeof AudioOutput;
    required: true;
    rest: false;
}], true>;
export default _default;
