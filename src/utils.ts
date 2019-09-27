/**
 * Idea to cleanly use properly indented tempalte strings
 */

export const niceString = (input: TemplateStringsArray, ...values: any[]) => {
  // interweave the strings with the substitution vars first.
  let result = ''

  for (let i = 0; i < values.length; i++) {
    result += input[i] + values[i]
  }
  result += input[values.length]

  // to avoid matching last and for nice result
  result = result.trimEnd()

  // get indent from first line
  const [all, group] = result.match(/^(?:\n*)( +)/m) || ['', '']
  const indent = group.length

  // trim indents
  result = result.replace(new RegExp(`^[ ]{${indent}}`, 'gm'), '')

  // remove leading newline
  if (all.length !== group.length) {
    result = result.replace(/^\n/, '')
  }

  return result
}

export const indent = (input: string, level = 1) =>
  input.replace(/^/gm, '  '.repeat(level)).trimEnd()
