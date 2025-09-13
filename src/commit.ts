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

  const msg = (await prompt('Please write the commit message: '))
    .replace(/(--?(\w+))/gim, (match) => {
      const rawName = match.match(/\w+/)?.[0]
      if (!rawName) throw new Error(`Invalid flag format: ${match}`)
      const name = rawName.toLowerCase()

      switch (name) {
        case 'hide': {
          skip = true
          break
        }

        default: {
          throw new Error(`--${name} is not a valid flag.`)
        }
      }

      return ''
    })
    .trim()

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
    writeFileSync(fileName, JSON.stringify(json), 'utf-8')
  }

  const branch = (await prompt('Write the branch name to push to (defaults to dev): ')) || 'dev'
  const escapedMsg = msg.replace(/\$/g, '\\$')

  execSync(
    'git branch -M ' +
      branch +
      ' && git add . && git commit -m "' +
      escapedMsg +
      '" && git push -u origin ' +
      branch,
    {
      stdio: 'inherit',
    },
  )
}

// Nothing
main()
