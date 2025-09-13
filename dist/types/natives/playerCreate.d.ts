import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    rest: false;
    type: ArgType.Guild;
    required: true;
}, {
    name: string;
    description: string;
    type: ArgType.Channel;
    rest: false;
    required: true;
}, {
    name: string;
    description: string;
    type: ArgType.Channel;
    rest: false;
    required: false;
}], true>;
export default _default;
