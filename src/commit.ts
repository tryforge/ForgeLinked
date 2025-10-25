import { execSync } from 'child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import prompt from './prompt.js'

const path = './metadata'
if (!existsSync(path)) mkdirSync(path)

const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))
const version = pkg.version

async function main() {
  let skip = false

  const msg = (await prompt('Commit message: ')).replace(/(--?(\w+))/gim, (match) => {
    const name = match.match(/\w+/)?.[0]?.toLowerCase()
    if (name === 'hide') skip = true
    else throw new Error(`--${name} is not a valid flag.`)
    return ''
  }).trim()

  const fileName = join(path, 'changelogs.json')
  const json: Record<string, object[]> = existsSync(fileName)
    ? JSON.parse(readFileSync(fileName, 'utf-8'))
    : {}
  json[version] ??= []

  if (!skip) {
    json[version].unshift({
      message: msg,
      timestamp: new Date(),
      author: execSync('git config user.name').toString().trim(),
    })
    writeFileSync(fileName, JSON.stringify(json, null, 2))
  }

  // Step 1: list changes
  const changes = execSync('git status -s').toString().trim().split('\n').filter(Boolean)
  if (changes.length === 0) {
    console.log('No changes detected.')
    return
  }

  console.log('\nChanged files:')
  changes.forEach((line, i) => console.log(`${i + 1}. ${line}`))

  const selected = await prompt('\nSelect files to commit (comma separated or "all"): ')
  let filesToAdd = ''
  if (selected.toLowerCase() !== 'all') {
    const indexes = selected.split(',').map((n) => parseInt(n.trim()) - 1)
    filesToAdd = indexes.map((i) => changes[i].split(' ').pop()).join(' ')
  }

  execSync(`git add ${filesToAdd || '.'}`)

  // Step 2: commit
  const escapedMsg = msg.replace(/\$/g, '\\$')
  execSync(`git commit -m "${escapedMsg}"`, { stdio: 'inherit' })

  // Step 3: ask to push
  const shouldPush = (await prompt('Push to GitHub? (y/N): ')).toLowerCase() === 'y'
  if (!shouldPush) return

  const branch = (await prompt('Branch to push to (default: dev): ')) || 'dev'
  execSync(`git push -u origin ${branch}`, { stdio: 'inherit' })

  // Step 4: optional stable release
  const release = (await prompt('Create stable release? (y/N): ')).toLowerCase() === 'y'
  if (release) {
    const tag = `v${version}`
    execSync(`git tag ${tag} && git push origin ${tag}`, { stdio: 'inherit' })
    console.log(`✅ Tagged and pushed stable release ${tag}`)
  }
}

main().catch(console.error)
