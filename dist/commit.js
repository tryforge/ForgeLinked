"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const prompt_js_1 = __importDefault(require("./prompt.js"));
const path = './metadata';
if (!(0, fs_1.existsSync)(path))
    (0, fs_1.mkdirSync)(path);
const pkg = JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), 'package.json'), 'utf-8'));
const version = pkg.version;
async function main() {
    let skip = false;
    const msg = (await (0, prompt_js_1.default)('Commit message: '))
        .replace(/(--?(\w+))/gim, (match) => {
        const name = match.match(/\w+/)?.[0]?.toLowerCase();
        if (name === 'hide')
            skip = true;
        else
            throw new Error(`--${name} is not a valid flag.`);
        return '';
    })
        .trim();
    const fileName = (0, path_1.join)(path, 'changelogs.json');
    const json = (0, fs_1.existsSync)(fileName)
        ? JSON.parse((0, fs_1.readFileSync)(fileName, 'utf-8'))
        : {};
    json[version] ??= [];
    if (!skip) {
        json[version].unshift({
            message: msg,
            timestamp: new Date(),
            author: (0, child_process_1.execSync)('git config user.name').toString().trim(),
        });
        (0, fs_1.writeFileSync)(fileName, JSON.stringify(json, null, 2));
    }
    // Step 1: list changes
    const changes = (0, child_process_1.execSync)('git status -s').toString().trim().split('\n').filter(Boolean);
    if (changes.length === 0) {
        console.log('No changes detected.');
        return;
    }
    console.log('\nChanged files:');
    changes.forEach((line, i) => console.log(`${i + 1}. ${line}`));
    const selected = await (0, prompt_js_1.default)('\nSelect files to commit (comma separated or "all"): ');
    let filesToAdd = '';
    if (selected.toLowerCase() !== 'all') {
        const indexes = selected.split(',').map((n) => parseInt(n.trim()) - 1);
        filesToAdd = indexes.map((i) => changes[i].split(' ').pop()).join(' ');
    }
    (0, child_process_1.execSync)(`git add ${filesToAdd || '.'}`);
    // Step 2: commit
    const escapedMsg = msg.replace(/\$/g, '\\$');
    (0, child_process_1.execSync)(`git commit -m "${escapedMsg}"`, { stdio: 'inherit' });
    // Step 3: ask to push
    const shouldPush = (await (0, prompt_js_1.default)('Push to GitHub? (y/N): ')).toLowerCase() === 'y';
    if (!shouldPush)
        return;
    const branch = (await (0, prompt_js_1.default)('Branch to push to (default: dev): ')) || 'dev';
    (0, child_process_1.execSync)(`git push -u origin ${branch}`, { stdio: 'inherit' });
    // Step 4: optional stable release
    const release = (await (0, prompt_js_1.default)('Create stable release? (y/N): ')).toLowerCase() === 'y';
    if (release) {
        const tag = `v${version}`;
        (0, child_process_1.execSync)(`git tag ${tag} && git push origin ${tag}`, { stdio: 'inherit' });
        console.log(`✅ Tagged and pushed stable release ${tag}`);
    }
}
main().catch(console.error);
//# sourceMappingURL=commit.js.map