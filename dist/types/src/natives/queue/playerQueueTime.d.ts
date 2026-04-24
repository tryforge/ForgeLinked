import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    type: ArgType.Guild;
    required: false;
    rest: false;
}, {
    name: string;
    description: string;
    type: ArgType.String;
    required: false;
    rest: true;
}], true>;
export default _default;
