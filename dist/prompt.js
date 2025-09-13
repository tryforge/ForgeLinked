import { stdin, stdout } from 'process';
import { createInterface } from 'readline';
export default async function (q) {
    const itf = createInterface(stdin, stdout);
    return new Promise((r) => {
        itf.question(q, (input) => {
            itf.close();
            r(input);
        });
    });
}
//# sourceMappingURL=prompt.js.map